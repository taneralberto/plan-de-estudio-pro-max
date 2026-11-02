/**
 * browser.test.mjs — smoke test real con Chromium (CDP, sin dependencias).
 *
 * Sirve el repositorio con un servidor HTTP efímero de Node, abre
 * `/Especializacioes/AppSec/web/` en Chromium headless y comprueba la interfaz
 * tal y como la ve una persona.
 *
 * Requisitos: Node 22+ (WebSocket global) y `/usr/bin/chromium`.
 */

import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Los tests viven en `Especializacioes/AppSec/web/tests/`: cuatro niveles hasta
// la raíz del repositorio (tests -> web -> AppSec -> Especializacioes -> raíz).
const RAIZ = fileURLToPath(new URL('../../../../', import.meta.url));
const CHROMIUM = '/usr/bin/chromium';
const BASE_TMP = '/tmp/opencode';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const ctx = {
  server: null,
  puerto: 0,
  proc: null,
  perfil: null,
  cdp: null,
  sessionId: null,
  url: '',
  errores: [],
  red: [],
  fallItinerario: false,
};

/* ------------------------------ Cliente CDP ------------------------------- */

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    ws.addEventListener('message', (evento) => {
      let mensaje;
      try {
        mensaje = JSON.parse(evento.data);
      } catch {
        return;
      }
      if (mensaje.id && this.pending.has(mensaje.id)) {
        const { resolve, reject, timer } = this.pending.get(mensaje.id);
        this.pending.delete(mensaje.id);
        clearTimeout(timer);
        if (mensaje.error) reject(new Error(`${mensaje.error.message} (${mensaje.method || ''})`));
        else resolve(mensaje.result);
        return;
      }
      if (mensaje.method) {
        for (const fn of this.handlers.get(mensaje.method) || []) fn(mensaje.params);
      }
    });
  }

  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      const fallo = () => reject(new Error('No se pudo conectar con el WebSocket de DevTools'));
      ws.addEventListener('error', fallo, { once: true });
      ws.addEventListener('open', () => resolve(), { once: true });
    });
    return new CDP(ws);
  }

  on(metodo, fn) {
    if (!this.handlers.has(metodo)) this.handlers.set(metodo, []);
    this.handlers.get(metodo).push(fn);
  }

  send(metodo, params = {}, sessionId) {
    const id = ++this.id;
    const mensaje = { id, method: metodo, params };
    if (sessionId) mensaje.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Tiempo agotado en ${metodo}`));
      }, 30000);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify(mensaje));
    });
  }

  close() {
    try {
      this.ws.close();
    } catch {
      /* ignorado */
    }
  }
}

/* ------------------------------ Servidor HTTP ----------------------------- */

function servir() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let ruta;
      try {
        ruta = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
      } catch {
        res.writeHead(400).end('ruta inválida');
        return;
      }
      if (ruta === '/favicon.ico') {
        res.writeHead(204).end();
        return;
      }
      if (ruta.endsWith('/')) ruta += 'index.html';
      // Fallo controlado para probar el arranque sin itinerario.
      if (ctx.fallItinerario && ruta.endsWith('/ITINERARIO.md')) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('fallo controlado del itinerario');
        return;
      }
      const destino = join(RAIZ, ruta);
      if (!destino.startsWith(RAIZ)) {
        res.writeHead(403).end('fuera del repositorio');
        return;
      }
      readFile(destino)
        .then((buffer) => {
          res.writeHead(200, {
            'Content-Type': MIME[extname(destino)] || 'application/octet-stream',
            'Cache-Control': 'no-store',
          });
          res.end(buffer);
        })
        .catch(() => {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('no encontrado');
        });
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

/* -------------------------------- Utilidades ------------------------------ */

async function evaluate(expresion) {
  const respuesta = await ctx.cdp.send(
    'Runtime.evaluate',
    { expression: expresion, awaitPromise: true, returnByValue: true },
    ctx.sessionId,
  );
  if (respuesta.exceptionDetails) {
    const detalle = respuesta.exceptionDetails;
    throw new Error(
      `Error al evaluar: ${detalle.text} ${detalle.exception ? detalle.exception.description || '' : ''}`,
    );
  }
  return respuesta.result.value;
}

async function esperarPor(expresion, { timeout = 20000, etiqueta = expresion } = {}) {
  const limite = Date.now() + timeout;
  for (;;) {
    let valor = false;
    try {
      valor = await evaluate(expresion);
    } catch {
      // Durante una navegación el documento puede no tener <body>: reintenta.
      valor = false;
    }
    if (valor) return valor;
    if (Date.now() > limite) throw new Error(`Tiempo agotado esperando: ${etiqueta}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

/** Espera un evento de CDP (con límite de tiempo). */
function esperarEvento(metodo, { timeout = 20000 } = {}) {
  return new Promise((resolve, reject) => {
    const cronometro = setTimeout(() => reject(new Error(`Tiempo agotado esperando ${metodo}`)), timeout);
    ctx.cdp.on(metodo, (params) => {
      clearTimeout(cronometro);
      resolve(params);
    });
  });
}

const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* --------------------------------- Arranque -------------------------------- */

before(async () => {
  if (!existsSync(CHROMIUM)) {
    throw new Error(`No se encuentra Chromium en ${CHROMIUM}: el smoke test necesita un navegador real.`);
  }

  ctx.server = await servir();
  ctx.puerto = ctx.server.address().port;
  ctx.url = `http://127.0.0.1:${ctx.puerto}/Especializacioes/AppSec/web/`;

  ctx.perfil = await mkdtemp(join(BASE_TMP, 'appsec-chromium-'));

  ctx.proc = spawn(
    CHROMIUM,
    [
      '--headless',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--remote-debugging-port=0',
      `--user-data-dir=${ctx.perfil}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-sync',
      '--disable-default-apps',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  const wsUrl = await new Promise((resolve, reject) => {
    let buffer = '';
    const cronometro = setTimeout(() => reject(new Error('Chromium no anunció el puerto de DevTools.')), 30000);
    ctx.proc.stderr.on('data', (trozo) => {
      buffer += trozo.toString();
      const encontrado = /DevTools listening on (ws:\/\/\S+)/.exec(buffer);
      if (encontrado) {
        clearTimeout(cronometro);
        resolve(encontrado[1]);
      }
    });
    ctx.proc.on('exit', (codigo) => {
      clearTimeout(cronometro);
      reject(new Error(`Chromium terminó antes de tiempo (código ${codigo}): ${buffer}`));
    });
  });

  ctx.cdp = await CDP.connect(wsUrl);

  const { targetId } = await ctx.cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await ctx.cdp.send('Target.attachToTarget', { targetId, flatten: true });
  ctx.sessionId = sessionId;

  await ctx.cdp.send('Page.enable', {}, sessionId);
  await ctx.cdp.send('Runtime.enable', {}, sessionId);
  await ctx.cdp.send('Log.enable', {}, sessionId);
  await ctx.cdp.send('DOM.enable', {}, sessionId);
  await ctx.cdp.send('Network.enable', {}, sessionId);

  ctx.cdp.on('Runtime.exceptionThrown', (params) => {
    const detalle = params.exceptionDetails;
    ctx.errores.push(`excepción: ${detalle.text} ${detalle.exception ? detalle.exception.description || '' : ''}`);
  });
  ctx.cdp.on('Runtime.consoleAPICalled', (params) => {
    if (params.type !== 'error') return;
    const texto = params.args.map((a) => a.value ?? a.description ?? '').join(' ');
    ctx.errores.push(`consola: ${texto}`);
  });
  ctx.cdp.on('Log.entryAdded', (params) => {
    const entrada = params.entry;
    if (entrada.level !== 'error') return;
    if (entrada.source === 'network') {
      ctx.red.push(entrada.text);
      return;
    }
    ctx.errores.push(`log: ${entrada.text}`);
  });

  await ctx.cdp.send(
    'Browser.grantPermissions',
    {
      origin: `http://127.0.0.1:${ctx.puerto}`,
      permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
    },
  );

  const cargado = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.navigate', { url: ctx.url }, sessionId);
  await cargado;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista' });
});

after(async () => {
  try {
    if (ctx.cdp) await ctx.cdp.send('Browser.close');
  } catch {
    /* el navegador puede estar ya cerrado */
  }
  if (ctx.cdp) ctx.cdp.close();

  if (ctx.proc && ctx.proc.exitCode === null) {
    await Promise.race([
      new Promise((resolve) => ctx.proc.once('exit', resolve)),
      dormir(5000).then(() => ctx.proc.kill('SIGKILL')),
    ]);
  }

  if (ctx.server) await new Promise((resolve) => ctx.server.close(resolve));
  if (ctx.perfil) await rm(ctx.perfil, { recursive: true, force: true });
});

/* --------------------------------- Pruebas -------------------------------- */

test('la web carga 20 semanas y 140 casillas sin errores de consola', async () => {
  const estado = await evaluate(`(() => ({
    semanas: document.querySelectorAll('#semanas details.semana').length,
    casillas: document.querySelectorAll('#semanas input[type=checkbox][data-sesion]').length,
    titulo: document.getElementById('titulo-itinerario').textContent.trim(),
    horario: document.getElementById('horario').textContent.trim(),
    prompts: document.querySelectorAll('#cuerpo-prompts .md-codigo').length,
    copiar: document.querySelectorAll('#cuerpo-prompts button[data-copiar]').length,
    notas: document.querySelectorAll('#semanas textarea[data-notas-semana]').length,
    valorSesiones: document.getElementById('valor-sesiones').textContent.trim(),
    valorHoras: document.getElementById('valor-horas').textContent.trim(),
    valorSemanas: document.getElementById('valor-semanas').textContent.trim()
  }))()`);

  assert.equal(estado.semanas, 20);
  assert.equal(estado.casillas, 140);
  assert.equal(estado.notas, 20);
  assert.equal(estado.prompts, 8);
  assert.equal(estado.copiar, 8);
  assert.match(estado.horario, /1 h L–V · 2 h S \+ 2 h D = 9 h\/sem/);
  assert.match(estado.horario, /20 semanas/);
  assert.match(estado.titulo, /20 semanas/);
  assert.equal(estado.valorSesiones, '0 / 140');
  assert.equal(estado.valorHoras, '0 / 180 h');
  assert.equal(estado.valorSemanas, '0 / 20');
});

test('marcar el lunes y el fin de semana actualiza las estadísticas', async () => {
  await evaluate(`(() => {
    document.getElementById('cb-week-1-lunes').click();
    document.getElementById('cb-week-1-sabado').click();
    return true;
  })()`);

  const estado = await evaluate(`(() => ({
    valorSesiones: document.getElementById('valor-sesiones').textContent.trim(),
    valorHoras: document.getElementById('valor-horas').textContent.trim(),
    contador: document.querySelector('[data-progreso-semana="1"]').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1')
  }))()`);

  assert.equal(estado.valorSesiones, '2 / 140');
  assert.equal(estado.valorHoras, '3 / 180 h');
  assert.equal(estado.contador, '2/7');
  assert.ok(estado.guardado, 'el progreso debe guardarse en localStorage');
  assert.ok(estado.guardado.includes('week-1-lunes'));
  assert.ok(estado.guardado.includes('week-1-sabado'));
});

test('las notas se guardan y sobreviven a una recarga', async () => {
  await evaluate(`(() => {
    const area = document.getElementById('notas-3');
    area.value = 'Traza sanitizada: request/response anotado.';
    area.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await dormir(700);

  await ctx.cdp.send('Page.reload', { ignoreCache: false }, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const estado = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    nota: document.getElementById('notas-3').value,
    valorHoras: document.getElementById('valor-horas').textContent.trim()
  }))()`);

  assert.equal(estado.lunes, true);
  assert.equal(estado.sabado, true);
  assert.equal(estado.nota, 'Traza sanitizada: request/response anotado.');
  assert.equal(estado.valorHoras, '3 / 180 h');
});

test('la búsqueda y los filtros no rompen el acordeón', async () => {
  const antes = await evaluate(`(() => ({
    abiertas: document.querySelectorAll('#semanas details.semana[open]').length,
    semana1: document.querySelector('#semanas details.semana').open
  }))()`);
  assert.ok(antes.abiertas >= 1, 'al cargar debe quedar abierta la primera semana pendiente');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.focus();
    campo.value = 'SSRF';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const filtrado = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length,
    titulos: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).map((d) => d.querySelector('.semana-titulo').textContent),
    resultados: document.getElementById('resultados').textContent.trim(),
    foco: document.activeElement.id
  }))()`);

  assert.equal(filtrado.visibles, 1);
  assert.match(filtrado.titulos[0], /SSRF/);
  assert.match(filtrado.resultados, /1 de 20/);
  assert.equal(filtrado.foco, 'buscar', 'el foco debe seguir en el campo de búsqueda');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = 'no-existe-nada-xyz';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const vacio = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length,
    mensaje: !!document.querySelector('.sin-resultados'),
    boton: !!document.querySelector('.sin-resultados button')
  }))()`);
  assert.equal(vacio.visibles, 0);
  assert.equal(vacio.mensaje, true);
  assert.equal(vacio.boton, true);

  await evaluate(`document.querySelector('.sin-resultados button').click()`);
  const limpio = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length,
    valor: document.getElementById('buscar').value
  }))()`);
  assert.equal(limpio.visibles, 20);
  assert.equal(limpio.valor, '');

  const abierto = await evaluate(`document.querySelector('#semanas details.semana').open`);
  assert.equal(abierto, true, 'la búsqueda no debe cerrar las semanas ya abiertas');
});

test('los filtros por estado separan pendientes, en curso y estudiadas', async () => {
  await evaluate(`(() => {
    document.querySelector('[data-filtro="en-curso"]').click();
    return true;
  })()`);
  const enCurso = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length,
    presionado: document.querySelector('[data-filtro="en-curso"]').getAttribute('aria-pressed')
  }))()`);
  assert.equal(enCurso.visibles, 1);
  assert.equal(enCurso.presionado, 'true');

  await evaluate(`(() => {
    document.querySelector('[data-filtro="todas"]').click();
    document.getElementById('cb-week-2-lunes').click();
    return true;
  })()`);

  await evaluate(`document.querySelector('[data-filtro="pendientes"]').click()`);
  const pendientes = await evaluate(
    `[...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length`,
  );
  assert.equal(pendientes, 18, 'las semanas 1 y 2 ya no están pendientes');

  await evaluate(`document.querySelector('[data-filtro="en-curso"]').click()`);
  const enCursoAhora = await evaluate(
    `[...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length`,
  );
  assert.equal(enCursoAhora, 2, 'la semana 1 (2/7) y la semana 2 (1/7) están en curso');

  await evaluate(`document.querySelector('[data-filtro="todas"]').click()`);
});

test('marcar una sesión no hace desaparecer la semana bajo el filtro activo', async () => {
  await evaluate(`document.querySelector('[data-filtro="pendientes"]').click()`);

  const antes = await evaluate(`(() => {
    const visibles = [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden);
    const primera = visibles[0];
    const casilla = primera.querySelector('input[type=checkbox]');
    return {
      pendientes: document.querySelector('[data-cuenta="pendientes"]').textContent,
      visibles: visibles.length,
      semana: primera.dataset.semana,
      casilla: casilla.id
    };
  })()`);

  await evaluate(`(() => {
    const semana = document.querySelector('#semanas details.semana[data-semana="${antes.semana}"]');
    semana.open = true;
    const casilla = document.getElementById('${antes.casilla}');
    casilla.focus();
    casilla.click();
    return true;
  })()`);

  const despues = await evaluate(`(() => {
    const semana = document.querySelector('#semanas details.semana[data-semana="${antes.semana}"]');
    return {
      visibles: [...document.querySelectorAll('#semanas details.semana')].filter((d) => !d.hidden).length,
      sigueVisible: !semana.hidden,
      pendientes: document.querySelector('[data-cuenta="pendientes"]').textContent,
      enCurso: document.querySelector('[data-cuenta="en-curso"]').textContent,
      foco: document.activeElement.id
    };
  })()`);

  assert.equal(despues.sigueVisible, true, 'la semana marcada no debe desaparecer');
  assert.equal(despues.visibles, antes.visibles, 'la lista visible no cambia al marcar');
  assert.equal(Number(despues.pendientes), Number(antes.pendientes) - 1);
  assert.equal(despues.foco, antes.casilla, 'el foco debe quedarse en la casilla');

  await evaluate(`document.querySelector('[data-filtro="todas"]').click()`);
});

test('el acordeón responde al teclado y «Continuar» enfoca la sesión pendiente', async () => {
  await evaluate(`(() => {
    const details = document.querySelectorAll('#semanas details.semana')[2];
    details.open = false;
    details.querySelector('summary').focus();
    return document.activeElement.tagName;
  })()`);

  await ctx.cdp.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    text: '\r',
    unmodifiedText: '\r',
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  }, ctx.sessionId);
  await ctx.cdp.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  }, ctx.sessionId);

  const abierto = await evaluate(
    `document.querySelectorAll('#semanas details.semana')[2].open`,
  );
  assert.equal(abierto, true, 'Enter sobre el resumen debe abrir la semana');

  await evaluate(`document.getElementById('btn-continuar').click()`);
  const foco = await evaluate(`(() => ({
    id: document.activeElement.id,
    semana: document.activeElement.closest('details').dataset.semana,
    abierta: document.activeElement.closest('details').open
  }))()`);
  assert.match(foco.id, /^cb-week-/);
  assert.equal(foco.abierta, true);
});

test('la navegación interna llega a otros documentos del repo sin 404', async () => {
  await evaluate(`(() => {
    window.location.hash = '#/guia';
    return true;
  })()`);
  await esperarPor(`!document.getElementById('vista-guia').hidden`, { etiqueta: 'la vista de la guía' });

  const enlaces = await evaluate(`(() => ({
    total: document.querySelectorAll('#cuerpo-guia a.enlace-doc').length,
    fuera: [...document.querySelectorAll('#cuerpo-guia a.enlace-doc')].filter((a) => !a.dataset.docPath).length,
    tieneMetodologia: !!document.querySelector('#cuerpo-guia a[data-doc-path="METODOLOGIA.md"]'),
    tieneCiCd: [...document.querySelectorAll('#cuerpo-guia a.enlace-doc')].some((a) => a.dataset.docPath.includes('4.2 — CI-CD'))
  }))()`);

  assert.ok(enlaces.total >= 8);
  assert.equal(enlaces.fuera, 0);
  assert.equal(enlaces.tieneMetodologia, true);
  assert.equal(enlaces.tieneCiCd, true);

  // Un enlace a un documento del repo se abre en el lector interno.
  await evaluate(`(() => {
    document.querySelector('#cuerpo-guia a[data-doc-path="METODOLOGIA.md"]').click();
    return true;
  })()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector interno' });
  await esperarPor(
    `document.getElementById('lector-cuerpo').textContent.includes('Presupuesto semanal')`,
    { etiqueta: 'el contenido de METODOLOGIA.md' },
  );

  const lector = await evaluate(`(() => ({
    titulo: document.getElementById('lector-titulo').textContent.trim(),
    ruta: document.getElementById('lector-ruta').textContent.trim(),
    texto: document.getElementById('lector-cuerpo').textContent.includes('Presupuesto semanal'),
    vacio: document.getElementById('lector-cuerpo').textContent.trim().length
  }))()`);
  assert.equal(lector.titulo, 'Metodología de Aprendizaje');
  assert.equal(lector.ruta, 'METODOLOGIA.md');
  assert.equal(lector.texto, true);
  assert.ok(lector.vacio > 500);

  await evaluate(`document.getElementById('btn-cerrar-lector').click()`);
});

test('los anchors Unicode navegan dentro del documento', async () => {
  await evaluate(`(() => {
    window.location.hash = '#/recursos';
    return true;
  })()`);
  await esperarPor(`!document.getElementById('vista-recursos').hidden`, { etiqueta: 'la vista de recursos' });

  await evaluate(`(() => {
    window.location.hash = '#/doc?path=' + encodeURIComponent('Especializacioes/AppSec/RECURSOS.md') + '&anchor=' + encodeURIComponent('http-y-navegador');
    return true;
  })()`);
  await dormir(200);

  const ancla = await evaluate(`(() => {
    const nodo = document.querySelector('#vista-recursos [data-anchor="http-y-navegador"]');
    return {
      existe: !!nodo,
      visible: !document.getElementById('vista-recursos').hidden,
      texto: nodo ? nodo.textContent.trim() : ''
    };
  })()`);
  assert.equal(ancla.visible, true);
  assert.equal(ancla.existe, true);
  assert.equal(ancla.texto, 'HTTP y navegador');
});

test('los 8 prompts se pueden copiar con feedback accesible', async () => {
  await evaluate(`(() => {
    window.location.hash = '#/prompts';
    return true;
  })()`);
  await esperarPor(`!document.getElementById('vista-prompts').hidden`, { etiqueta: 'la vista de prompts' });

  await evaluate(`(() => {
    document.querySelector('#cuerpo-prompts button[data-copiar]').click();
    return true;
  })()`);
  await esperarPor(`document.querySelector('#avisos .aviso') !== null`, { etiqueta: 'el aviso de copia' });

  const aviso = await evaluate(`(() => {
    const nodos = [...document.querySelectorAll('#avisos .aviso')].map((n) => n.textContent);
    return nodos.join(' | ');
  })()`);
  assert.match(aviso, /copiad|selecciona el texto/i);

  const portapapeles = await evaluate(`(async () => {
    try { return await navigator.clipboard.readText(); } catch (e) { return ''; }
  })()`);
  if (portapapeles) {
    assert.match(portapapeles, /Semana \[SEMANA\]/);
  }
});

test('una importación malformada no pisa el progreso', async () => {
  const antes = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    horas: document.getElementById('valor-horas').textContent.trim()
  }))()`);
  assert.equal(antes.lunes, true);

  const archivo = join(ctx.perfil, 'roto.json');
  await writeFile(archivo, '{ esto no es un json', 'utf8');

  const { root } = await ctx.cdp.send('DOM.getDocument', { depth: -1 }, ctx.sessionId);
  const { nodeId } = await ctx.cdp.send(
    'DOM.querySelector',
    { nodeId: root.nodeId, selector: '#input-importar' },
    ctx.sessionId,
  );
  await ctx.cdp.send('DOM.setFileInputFiles', { files: [archivo], nodeId }, ctx.sessionId);

  await esperarPor(`[...document.querySelectorAll('#avisos .aviso-error')].length > 0`, {
    etiqueta: 'el aviso de error de importación',
  });

  const despues = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    horas: document.getElementById('valor-horas').textContent.trim(),
    error: document.querySelector('#avisos .aviso-error').textContent
  }))()`);

  assert.equal(despues.lunes, true, 'una importación inválida no debe desmarcar nada');
  assert.equal(despues.sabado, true);
  assert.equal(despues.horas, antes.horas);
  assert.match(despues.error, /JSON|No se ha importado nada/i);
});

test('exportar e importar una copia válida mantiene el progreso', async () => {
  const horasAntes = await evaluate(`document.getElementById('valor-horas').textContent.trim()`);
  const descargas = join(ctx.perfil, 'descargas');
  await ctx.cdp.send('Browser.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: descargas,
    eventsEnabled: true,
  });

  await evaluate(`document.getElementById('btn-exportar').click()`);

  let archivo = null;
  for (let intento = 0; intento < 60 && !archivo; intento += 1) {
    await dormir(100);
    const lista = existsSync(descargas) ? await readdir(descargas) : [];
    archivo = lista.find((nombre) => nombre.endsWith('.json'));
  }
  assert.ok(archivo, 'la exportación debería descargar un JSON');

  const contenido = JSON.parse(await readFile(join(descargas, archivo), 'utf8'));
  assert.equal(contenido.version, 1);
  assert.equal(contenido.completed['week-1-lunes'], true);

  // Se importa el mismo archivo: debe pedir confirmación y no romper nada.
  const { root } = await ctx.cdp.send('DOM.getDocument', { depth: -1 }, ctx.sessionId);
  const { nodeId } = await ctx.cdp.send(
    'DOM.querySelector',
    { nodeId: root.nodeId, selector: '#input-importar' },
    ctx.sessionId,
  );
  await ctx.cdp.send('DOM.setFileInputFiles', { files: [join(descargas, archivo)], nodeId }, ctx.sessionId);

  await esperarPor(`document.getElementById('dialogo-confirmar').open`, {
    etiqueta: 'el diálogo de confirmación',
  });
  await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  await dormir(300);

  const despues = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    horas: document.getElementById('valor-horas').textContent.trim(),
    dialogo: document.getElementById('dialogo-confirmar').open
  }))()`);
  assert.equal(despues.lunes, true);
  assert.equal(despues.sabado, true);
  assert.equal(despues.horas, horasAntes);
  assert.equal(despues.dialogo, false);
});

test('si el almacenamiento falla se avisa sin romper la página', async () => {
  await evaluate(`(() => {
    if (!window.__setItemOriginal) window.__setItemOriginal = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('sin cuota', 'QuotaExceededError'); };
    return true;
  })()`);

  await evaluate(`document.getElementById('cb-week-3-lunes').click()`);
  await esperarPor(`[...document.querySelectorAll('#avisos .aviso')].some((n) => /no ha podido guardar|no se ha podido guardar/i.test(n.textContent))`, {
    etiqueta: 'el aviso de almacenamiento',
  });

  const aviso = await evaluate(`(() => {
    const nodo = [...document.querySelectorAll('#avisos .aviso')].find((n) => /guardar/i.test(n.textContent));
    return nodo ? nodo.textContent : '';
  })()`);
  assert.match(aviso, /exportar|Exportar/);

  await evaluate(`(() => {
    if (window.__setItemOriginal) Storage.prototype.setItem = window.__setItemOriginal;
    return true;
  })()`);
});

test('en móvil (390 px) no hay desbordamiento horizontal en ninguna vista', async () => {
  await ctx.cdp.send(
    'Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
    ctx.sessionId,
  );
  await dormir(300);

  const medir = async (etiqueta) => {
    const medidas = await evaluate(`(() => ({
      documento: document.documentElement.scrollWidth,
      cuerpo: document.body.scrollWidth,
      ventana: window.innerWidth
    }))()`);
    assert.ok(
      medidas.documento <= medidas.ventana + 1,
      `${etiqueta}: el documento se desborda (${medidas.documento} > ${medidas.ventana})`,
    );
    assert.ok(medidas.cuerpo <= medidas.ventana + 1, `${etiqueta}: el cuerpo se desborda (${medidas.cuerpo})`);
  };

  // Itinerario con una semana abierta (tabla de sesiones incluida).
  await evaluate(`(() => {
    document.querySelector('#semanas details.semana').open = true;
    document.getElementById('btn-expandir').click();
    return true;
  })()`);
  await dormir(200);
  await medir('itinerario');

  for (const vista of ['guia', 'recursos', 'prompts']) {
    await evaluate(`(() => { window.location.hash = '#/${vista}'; return true; })()`);
    await dormir(200);
    await medir(vista);
  }

  // Lector interno abierto.
  await evaluate(`(() => {
    window.location.hash = '#/doc?path=' + encodeURIComponent('METODOLOGIA.md');
    return true;
  })()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector abierto' });
  await dormir(200);
  await medir('lector');
  await evaluate(`(() => {
    document.getElementById('btn-cerrar-lector').click();
    window.location.hash = '#/itinerario';
    return true;
  })()`);

  await ctx.cdp.send('Emulation.clearDeviceMetricsOverride', {}, ctx.sessionId);
});

test('un progreso guardado corrupto se avisa y se puede borrar explícitamente', async () => {
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', '{ esto esta roto')`);
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  await esperarPor(
    `[...document.querySelectorAll('#avisos .aviso')].some((n) => /dañado/.test(n.textContent))`,
    { etiqueta: 'el aviso de datos dañados' },
  );

  const estado = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-1-lunes').checked,
    boton: !!document.querySelector('#avisos .aviso button'),
    guardado: window.localStorage.getItem('appsec-progreso-v1')
  }))()`);

  assert.equal(estado.marcada, false, 'un estado corrupto no debe restaurar marcas');
  assert.equal(estado.boton, true, 'debe ofrecer borrar el dato dañado');
  assert.equal(estado.guardado, '{ esto esta roto', 'no se debe sobrescribir el dato corrupto al leer');

  await evaluate(`document.querySelector('#avisos .aviso button').click()`);
  await dormir(200);

  const limpio = await evaluate(`(() => ({
    guardado: window.localStorage.getItem('appsec-progreso-v1'),
    horas: document.getElementById('valor-horas').textContent.trim()
  }))()`);
  assert.ok(limpio.guardado === null || limpio.guardado.includes('"version": 1'));
  assert.equal(limpio.horas, '0 / 180 h');
});

test('el buscador incluye el número y el título de la semana', async () => {
  const buscar = async (texto) => {
    await evaluate(`(() => {
      const campo = document.getElementById('buscar');
      campo.value = ${JSON.stringify(texto)};
      campo.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    })()`);
    return evaluate(`(() => ({
      visibles: [...document.querySelectorAll('#semanas details.semana')]
        .filter((d) => !d.hidden)
        .map((d) => d.dataset.semana),
      titulos: [...document.querySelectorAll('#semanas details.semana')]
        .filter((d) => !d.hidden)
        .map((d) => d.querySelector('.semana-titulo').textContent)
    }))()`);
  };

  const porNumero = await buscar('Semana 20');
  assert.deepEqual(porNumero.visibles, ['20']);

  const porTitulo = await buscar('congelado');
  assert.deepEqual(porTitulo.visibles, ['19']);
  assert.match(porTitulo.titulos[0], /evaluación integradora/i);

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
});

test('la nota guardada dice la verdad: solo en memoria si el navegador rechaza', async () => {
  await evaluate(`(() => {
    if (!window.__setItemOriginal) window.__setItemOriginal = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('sin cuota', 'QuotaExceededError'); };
    return true;
  })()`);

  await evaluate(`(() => {
    const area = document.getElementById('notas-4');
    area.value = 'Nota que no se puede guardar';
    area.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await dormir(700);

  const estado = await evaluate(`(() => ({
    texto: document.querySelector('[data-nota-estado="4"]').textContent,
    aviso: [...document.querySelectorAll('#avisos .aviso')].map((n) => n.textContent).join(' | ')
  }))()`);

  assert.match(estado.texto, /solo en memoria/i, 'no debe prometer «Guardado» si no se pudo guardar');
  assert.doesNotMatch(estado.texto, /guardado en este navegador/i);
  assert.match(estado.aviso, /no ha podido guardar|no se ha podido guardar|quota/i);

  // Al recargar, la nota no debe reaparecer: nunca se affirms que se guardó.
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });
  const trasRecarga = await evaluate(`document.getElementById('notas-4').value`);
  assert.equal(trasRecarga, '', 'una nota que no se pudo guardar no debe reaparecer');

  await evaluate(`(() => {
    if (window.__setItemOriginal) Storage.prototype.setItem = window.__setItemOriginal;
    return true;
  })()`);
});

test('la última nota escrita no se pierde si se recarga antes del retardo', async () => {
  await evaluate(`(() => {
    const area = document.getElementById('notas-6');
    area.value = 'Nota escrita justo antes de recargar';
    area.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  // Sin esperar al retardo de 400 ms.
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const valor = await evaluate(`document.getElementById('notas-6').value`);
  assert.equal(valor, 'Nota escrita justo antes de recargar', 'la nota debe volcarse al salir de la página');
});

test('el lector está oculto mientras está cerrado y se puede volver a abrir', async () => {
  // Carga limpia: sin hash de documento, el lector no debe abrirse solo.
  await evaluate(`window.location.hash = '#/itinerario'`);
  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista' });

  const medir = async () =>
    evaluate(`(() => {
      const d = document.getElementById('lector');
      const caja = d.getBoundingClientRect();
      return {
        display: getComputedStyle(d).display,
        abierto: d.open,
        ancho: Math.round(caja.width),
        alto: Math.round(caja.height),
        visible: d.checkVisibility ? d.checkVisibility() : null
      };
    })()`);

  const inicial = await medir();
  assert.equal(inicial.display, 'none', 'un diálogo cerrado no debe verse');
  assert.equal(inicial.visible, false);
  assert.equal(inicial.ancho, 0);
  assert.equal(inicial.alto, 0);

  await evaluate(`(() => {
    window.location.hash = '#/doc?path=' + encodeURIComponent('METODOLOGIA.md');
    return true;
  })()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector abierto' });
  await dormir(200);

  const abierto = await medir();
  assert.equal(abierto.display, 'flex');
  assert.equal(abierto.visible, true);
  assert.ok(abierto.ancho > 100 && abierto.alto > 100, 'el lector debe tener tamaño visible');

  await evaluate(`document.getElementById('btn-cerrar-lector').click()`);
  await dormir(200);

  const cerrado = await medir();
  assert.equal(cerrado.display, 'none', 'al cerrar debe volver a ocultarse');
  assert.equal(cerrado.visible, false);
  assert.equal(cerrado.ancho, 0);

  // Y debe poder volver a abrirse.
  await evaluate(`(() => {
    window.location.hash = '#/doc?path=' + encodeURIComponent('ROADMAP.md');
    return true;
  })()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector reabierto' });
  await dormir(200);
  const reabierto = await medir();
  assert.equal(reabierto.display, 'flex');
  assert.ok(reabierto.ancho > 100);
  await evaluate(`document.getElementById('btn-cerrar-lector').click()`);
});

test('sin itinerario no se pierde el progreso: error visible y reintento que hidrata', async () => {
  // Estado previo: dos marcas y una nota.
  await evaluate(`(() => {
    window.localStorage.setItem('appsec-progreso-v1', JSON.stringify({
      version: 1,
      completed: { 'week-1-lunes': true, 'week-1-sabado': true },
      notes: { 'week-2': 'Nota previa que debe sobrevivir' }
    }));
    return true;
  })()`);

  ctx.fallItinerario = true;
  const cargado = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.navigate', { url: ctx.url }, ctx.sessionId);
  await cargado;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista sin itinerario' });

  const fallo = await evaluate(`(() => {
    const error = document.getElementById('error-itinerario');
    const caja = error.getBoundingClientRect();
    return {
      visible: !error.hidden && caja.height > 0,
      texto: error.textContent,
      botón: !!error.querySelector('button'),
      exportar: document.getElementById('btn-exportar').disabled,
      importar: document.getElementById('btn-importar').disabled,
      reiniciar: document.getElementById('btn-reiniciar').disabled,
      continuar: document.getElementById('btn-continuar').disabled,
      buscar: document.getElementById('buscar').disabled,
      guardado: window.localStorage.getItem('appsec-progreso-v1')
    };
  })()`);

  assert.equal(fallo.visible, true, 'el error debe verse');
  assert.match(fallo.texto, /itinerario/i);
  assert.equal(fallo.botón, true, 'debe ofrecer Reintentar');
  assert.equal(fallo.exportar, true, 'no se puede exportar sin lista de semanas');
  assert.equal(fallo.importar, true, 'no se puede importar sin lista de semanas');
  assert.equal(fallo.reiniciar, true);
  assert.equal(fallo.continuar, true);
  assert.equal(fallo.buscar, true);
  assert.ok(fallo.guardado.includes('week-1-lunes'), 'el progreso guardado no debe tocarse');
  assert.ok(fallo.guardado.includes('Nota previa que debe sobrevivir'));

  // Ahora el servidor responde: el reintento debe hidratar el mismo pipeline.
  ctx.fallItinerario = false;
  await evaluate(`document.querySelector('#error-itinerario button').click()`);
  await esperarPor(`document.querySelectorAll('#semanas details.semana').length === 20`, {
    etiqueta: 'el itinerario tras reintentar',
  });
  await dormir(300);

  const hidratado = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    nota: document.getElementById('notas-2').value,
    sesiones: document.getElementById('valor-sesiones').textContent.trim(),
    horas: document.getElementById('valor-horas').textContent.trim(),
    semanas: document.getElementById('valor-semanas').textContent.trim(),
    error: document.getElementById('error-itinerario').hidden,
    exportar: document.getElementById('btn-exportar').disabled
  }))()`);

  assert.equal(hidratado.lunes, true, 'las marcas previas deben volver');
  assert.equal(hidratado.sabado, true);
  assert.equal(hidratado.nota, 'Nota previa que debe sobrevivir', 'la nota previa debe volver');
  assert.equal(hidratado.sesiones, '2 / 140');
  assert.equal(hidratado.horas, '3 / 180 h');
  assert.equal(hidratado.semanas, '0 / 20');
  assert.equal(hidratado.error, true, 'el error debe desaparecer tras el reintento');
  assert.equal(hidratado.exportar, false, 'los controles vuelven a estar disponibles');

  // Se puede seguir marcando y el cambio persiste.
  await evaluate(`document.getElementById('cb-week-1-martes').click()`);
  await dormir(200);
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const final = await evaluate(`(() => ({
    lunes: document.getElementById('cb-week-1-lunes').checked,
    martes: document.getElementById('cb-week-1-martes').checked,
    sabado: document.getElementById('cb-week-1-sabado').checked,
    nota: document.getElementById('notas-2').value,
    horas: document.getElementById('valor-horas').textContent.trim()
  }))()`);
  assert.equal(final.lunes, true);
  assert.equal(final.martes, true);
  assert.equal(final.sabado, true);
  assert.equal(final.nota, 'Nota previa que debe sobrevivir');
  assert.equal(final.horas, '4 / 180 h');
});

test('un error al arrancar se muestra en pantalla en vez de dejar la página en blanco', async () => {
  const { identifier } = await ctx.cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: "window.matchMedia = function () { throw new Error('matchMedia no disponible'); };",
  }, ctx.sessionId);

  const cargado = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.navigate', { url: ctx.url }, ctx.sessionId);
  await cargado;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app con error de arranque' });

  const error = await evaluate(`(() => {
    const nodos = [...document.querySelectorAll('#avisos .error-carga')];
    const ultimo = nodos[nodos.length - 1];
    const caja = ultimo ? ultimo.getBoundingClientRect() : { height: 0 };
    return {
      visible: !!ultimo && caja.height > 0,
      texto: ultimo ? ultimo.textContent.trim() : ''
    };
  })()`);

  assert.equal(error.visible, true, 'el error de arranque debe verse');
  assert.match(error.texto, /no ha podido arrancar/i);
  assert.match(error.texto, /matchMedia/, 'el mensaje debe explicar la causa');

  await ctx.cdp.send('Page.removeScriptToEvaluateOnNewDocument', { identifier }, ctx.sessionId);
  const cargado2 = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.navigate', { url: ctx.url }, ctx.sessionId);
  await cargado2;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app recuperada' });
});

test('tras un reinicio confirmado, la acción vieja de «dato dañado» no borra el progreso nuevo', async () => {
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', '{ esto esta roto')`);
  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app con dato corrupto' });
  await esperarPor(
    `[...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent))`,
    { etiqueta: 'el aviso de dato dañado' },
  );

  // Se guarda la referencia al botón obsoleto antes de resolver la corrupción.
  const botonViejo = await evaluate(`(() => {
    const boton = [...document.querySelectorAll('#avisos .aviso button')].find((b) => /dañado/i.test(b.textContent));
    window.__botonViejo = boton;
    return boton ? boton.textContent.trim() : '';
  })()`);
  assert.match(botonViejo, /dañado/i);

  // Reinicio confirmado (flujo existente con diálogo de confirmación).
  await evaluate(`document.getElementById('btn-reiniciar').click()`);
  await esperarPor(`document.getElementById('dialogo-confirmar').open`, { etiqueta: 'el diálogo de reinicio' });
  await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  await dormir(300);

  const trasReinicio = await evaluate(`(() => ({
    accionVieja: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    horas: document.getElementById('valor-horas').textContent.trim()
  }))()`);
  assert.equal(trasReinicio.horas, '0 / 180 h');
  assert.equal(trasReinicio.accionVieja, false, 'la acción de «dato dañado» debe retirarse tras el reinicio');

  // Marca nueva: el progreso válido ya existe.
  await evaluate(`document.getElementById('cb-week-2-lunes').click()`);
  await dormir(200);

  // Se pulsa el botón viejo (puede estar fuera del DOM): no debe borrar nada.
  await evaluate(`(() => { if (window.__botonViejo) window.__botonViejo.click(); return true; })()`);
  await dormir(400);

  const tras = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-2-lunes').checked,
    horas: document.getElementById('valor-horas').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(tras.marcada, true, 'la acción obsoleta no debe desmarcar el progreso nuevo');
  assert.equal(tras.horas, '1 / 180 h');
  assert.ok(tras.guardado.includes('week-2-lunes'), 'el progreso guardado no debe borrarse');
});

test('importar una copia válida deja obsoleta la acción de borrar el dato dañado', async () => {
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', '{ esto esta roto')`);
  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app con dato corrupto' });
  await esperarPor(
    `[...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent))`,
    { etiqueta: 'el aviso de dato dañado' },
  );

  const botonViejo = await evaluate(`(() => {
    const boton = [...document.querySelectorAll('#avisos .aviso button')].find((b) => /dañado/i.test(b.textContent));
    window.__botonViejo = boton;
    return !!boton;
  })()`);
  assert.equal(botonViejo, true);

  // Copia válida con dos marcas.
  const archivo = join(ctx.perfil, 'respaldo-valido.json');
  await writeFile(
    archivo,
    JSON.stringify({ version: 1, completed: { 'week-3-lunes': true, 'week-3-sabado': true }, notes: {} }),
    'utf8',
  );
  const { root } = await ctx.cdp.send('DOM.getDocument', { depth: -1 }, ctx.sessionId);
  const { nodeId } = await ctx.cdp.send(
    'DOM.querySelector',
    { nodeId: root.nodeId, selector: '#input-importar' },
    ctx.sessionId,
  );
  await ctx.cdp.send('DOM.setFileInputFiles', { files: [archivo], nodeId }, ctx.sessionId);
  await dormir(500);

  const trasImportar = await evaluate(`(() => ({
    marcado: document.getElementById('cb-week-3-lunes').checked,
    horas: document.getElementById('valor-horas').textContent.trim(),
    accionVieja: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(trasImportar.marcado, true, 'la copia válida debe aplicarse');
  assert.equal(trasImportar.horas, '3 / 180 h');
  assert.equal(trasImportar.accionVieja, false, 'la acción de «dato dañado» debe retirarse tras importar');
  assert.ok(trasImportar.guardado.includes('week-3-lunes'));

  // El botón viejo, si se conserva la referencia, no debe borrar el estado.
  await evaluate(`(() => { if (window.__botonViejo) window.__botonViejo.click(); return true; })()`);
  await dormir(400);

  const final = await evaluate(`(() => ({
    marcado: document.getElementById('cb-week-3-lunes').checked,
    horas: document.getElementById('valor-horas').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);
  assert.equal(final.marcado, true, 'la acción obsoleta no debe borrar el progreso importado');
  assert.equal(final.horas, '3 / 180 h');
  assert.ok(final.guardado.includes('week-3-lunes'));
});

test('el mismo enlace interno se puede volver a abrir después de cerrarlo', async () => {
  await evaluate(`window.location.hash = '#/guia'`);
  await esperarPor(`!document.getElementById('vista-guia').hidden`, { etiqueta: 'la vista de la guía' });

  const enlace = await evaluate(`(() => {
    const a = document.querySelector('#cuerpo-guia a[data-doc-path="METODOLOGIA.md"]');
    window.__mismoEnlace = a;
    return a ? a.getAttribute('href') : '';
  })()`);
  assert.ok(enlace.includes('METODOLOGIA.md'));

  await evaluate(`window.__mismoEnlace.click()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector abierto' });
  await esperarPor(
    `document.getElementById('lector-cuerpo').textContent.includes('Presupuesto semanal')`,
    { etiqueta: 'el contenido de METODOLOGIA.md' },
  );

  await evaluate(`document.getElementById('btn-cerrar-lector').click()`);
  await dormir(250);
  assert.equal(await evaluate(`document.getElementById('lector').open`), false);

  // El MISMO enlace otra vez: el hash no cambia, pero debe volver a abrir.
  await evaluate(`window.__mismoEnlace.click()`);
  await esperarPor(`document.getElementById('lector').open`, { etiqueta: 'el lector reabierto con el mismo enlace' });
  await esperarPor(
    `document.getElementById('lector-cuerpo').textContent.includes('Presupuesto semanal')`,
    { etiqueta: 'el contenido tras reabrir' },
  );

  await evaluate(`document.getElementById('btn-cerrar-lector').click()`);
});

test('la barra de herramientas cabe dentro de la tarjeta a 1440, 1280 y 1024 px', async () => {
  await evaluate(`window.location.hash = '#/itinerario'`);
  await esperarPor(`!document.getElementById('vista-itinerario').hidden`, {
    etiqueta: 'la vista del itinerario visible',
  });

  for (const ancho of [1440, 1280, 1024]) {
    await ctx.cdp.send(
      'Emulation.setDeviceMetricsOverride',
      { width: ancho, height: 900, deviceScaleFactor: 1, mobile: false },
      ctx.sessionId,
    );
    await dormir(300);

    const medidas = await evaluate(`(() => {
      const tarjeta = document.querySelector('.barra-herramientas').getBoundingClientRect();
      const controles = [...document.querySelectorAll('.barra-herramientas button, .barra-herramientas input')]
        .map((n) => {
          const r = n.getBoundingClientRect();
          return {
            id: n.id || n.textContent.trim().slice(0, 24),
            visible: r.width > 0 && r.height > 0,
            izquierda: Math.round(r.left),
            derecha: Math.round(r.right),
            arriba: Math.round(r.top),
            abajo: Math.round(r.bottom)
          };
        });
      return {
        documento: document.documentElement.scrollWidth,
        ventana: window.innerWidth,
        tarjeta: {
          izquierda: Math.round(tarjeta.left),
          derecha: Math.round(tarjeta.right),
          arriba: Math.round(tarjeta.top),
          abajo: Math.round(tarjeta.bottom)
        },
        controles
      };
    })()`);

    assert.ok(
      medidas.documento <= medidas.ventana + 1,
      `a ${ancho} px la página se desborda (${medidas.documento} > ${medidas.ventana})`,
    );

    assert.ok(medidas.controles.length >= 6, 'la barra debe tener controles visibles');
    for (const control of medidas.controles) {
      assert.ok(control.visible, `el control «${control.id}» no debería estar oculto`);
      assert.ok(
        control.derecha <= medidas.tarjeta.derecha + 1,
        `a ${ancho} px el control «${control.id}» se sale por la derecha (${control.derecha} > ${medidas.tarjeta.derecha})`,
      );
      assert.ok(
        control.izquierda >= medidas.tarjeta.izquierda - 1,
        `a ${ancho} px el control «${control.id}» se sale por la izquierda`,
      );
      assert.ok(
        control.abajo <= medidas.tarjeta.abajo + 1,
        `a ${ancho} px el control «${control.id}» se sale por abajo`,
      );
    }
  }

  await ctx.cdp.send('Emulation.clearDeviceMetricsOverride', {}, ctx.sessionId);
});

test('cancelar el borrado del dato dañado conserva el aviso, la RAM y el dato crudo', async () => {
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', '{ esto esta roto')`);
  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app con dato corrupto' });
  await esperarPor(
    `[...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent))`,
    { etiqueta: 'el aviso de dato dañado' },
  );

  // Se marca una sesión en RAM (no se puede guardar: el dato está dañado).
  await evaluate(`document.getElementById('cb-week-1-lunes').click()`);
  await dormir(300);

  const antes = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-1-lunes').checked,
    crudo: window.localStorage.getItem('appsec-progreso-v1'),
    accion: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent))
  }))()`);
  assert.equal(antes.marcada, true, 'la marca en RAM debe existir');
  assert.equal(antes.crudo, '{ esto esta roto', 'el dato corrupto no debe sobrescribirse');
  assert.equal(antes.accion, true);

  // Se intenta borrar y se CANCELA.
  await evaluate(`(() => {
    const boton = [...document.querySelectorAll('#avisos .aviso button')].find((b) => /dañado/i.test(b.textContent));
    boton.click();
    return true;
  })()`);
  await esperarPor(`document.getElementById('dialogo-confirmar').open`, { etiqueta: 'el diálogo de confirmación' });
  await evaluate(`document.getElementById('confirmar-cancelar').click()`);
  await dormir(300);

  const trasCancelar = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-1-lunes').checked,
    crudo: window.localStorage.getItem('appsec-progreso-v1'),
    accion: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    exito: [...document.querySelectorAll('#avisos .aviso')].some((n) => /reiniciado/i.test(n.textContent))
  }))()`);

  assert.equal(trasCancelar.accion, true, 'tras cancelar, la acción debe seguir visible');
  assert.equal(trasCancelar.marcada, true, 'la marca en RAM no debe perderse');
  assert.equal(trasCancelar.crudo, '{ esto esta roto', 'el dato crudo debe conservarse');
  assert.equal(trasCancelar.exito, false, 'no debe anunciarse un reinicio exitoso');

  // Segundo intento: ahora sí se confirma y se resuelve.
  await evaluate(`(() => {
    const boton = [...document.querySelectorAll('#avisos .aviso button')].find((b) => /dañado/i.test(b.textContent));
    boton.click();
    return true;
  })()`);
  await esperarPor(`document.getElementById('dialogo-confirmar').open`, { etiqueta: 'el segundo diálogo' });
  await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  await dormir(400);

  const resuelto = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-1-lunes').checked,
    accion: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    horas: document.getElementById('valor-horas').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(resuelto.marcada, false, 'tras borrar, el progreso en RAM se limpia');
  assert.equal(resuelto.accion, false, 'el aviso se retira al resolver');
  assert.equal(resuelto.horas, '0 / 180 h');
  assert.ok(!resuelto.guardado.includes('esto esta roto'), 'el dato corrupto debe desaparecer');
});

test('si borrar el dato dañado falla, se conserva todo y no se anuncia éxito', async () => {
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', '{ esto esta roto')`);
  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app con dato corrupto' });
  await esperarPor(
    `[...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent))`,
    { etiqueta: 'el aviso de dato dañado' },
  );

  // El almacenamiento rechaza el borrado.
  await evaluate(`(() => {
    if (!window.__removeItemOriginal) window.__removeItemOriginal = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function () { throw new DOMException('no se puede borrar', 'SecurityError'); };
    return true;
  })()`);

  await evaluate(`document.getElementById('cb-week-2-lunes').click()`);
  await dormir(300);

  await evaluate(`(() => {
    const boton = [...document.querySelectorAll('#avisos .aviso button')].find((b) => /dañado/i.test(b.textContent));
    boton.click();
    return true;
  })()`);
  await esperarPor(`document.getElementById('dialogo-confirmar').open`, { etiqueta: 'el diálogo de confirmación' });
  await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  await dormir(400);

  const trasFallo = await evaluate(`(() => ({
    marcada: document.getElementById('cb-week-2-lunes').checked,
    crudo: window.localStorage.getItem('appsec-progreso-v1'),
    accion: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    exito: [...document.querySelectorAll('#avisos .aviso')].some((n) => /reiniciado/i.test(n.textContent))
  }))()`);

  assert.equal(trasFallo.accion, true, 'el aviso debe conservarse si no se pudo borrar');
  assert.equal(trasFallo.marcada, true, 'la marca en RAM no debe perderse');
  assert.equal(trasFallo.crudo, '{ esto esta roto', 'el dato crudo debe conservarse');
  assert.equal(trasFallo.exito, false, 'no debe anunciarse un reinicio exitoso');

  await evaluate(`(() => {
    if (window.__removeItemOriginal) Storage.prototype.removeItem = window.__removeItemOriginal;
    return true;
  })()`);
});

test('en móvil la tarea de la sesión se lee entera sin scroll lateral', async () => {
  await ctx.cdp.send(
    'Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
    ctx.sessionId,
  );
  await dormir(300);

  await evaluate(`(() => {
    const semana = document.querySelector('#semanas details.semana');
    semana.open = true;
    semana.scrollIntoView();
    return true;
  })()`);
  await dormir(250);

  const medidas = await evaluate(`(() => {
    const celda = document.querySelector('#semanas .tabla-sesiones tbody tr td.col-tarea');
    const caja = celda.getBoundingClientRect();
    const wrap = celda.closest('.tabla-sesiones-wrap');
    return {
      izquierda: Math.round(caja.left),
      derecha: Math.round(caja.right),
      ancho: Math.round(caja.width),
      ventana: window.innerWidth,
      wrapScroll: wrap.scrollWidth,
      wrapCliente: wrap.clientWidth,
      largo: celda.textContent.replace(/\\s+/g, ' ').trim().length,
      pagScroll: document.documentElement.scrollWidth
    };
  })()`);

  assert.ok(medidas.largo > 40, 'la tarea debe seguir ahí');
  assert.ok(medidas.izquierda >= 0, 'la tarea no puede empezar fuera del viewport');
  assert.ok(medidas.derecha <= medidas.ventana + 1, `la tarea se sale del viewport (${medidas.derecha} > ${medidas.ventana})`);
  assert.ok(medidas.ancho >= 280, `la tarea debe tener ancho legible (${medidas.ancho}px)`);
  assert.ok(medidas.wrapScroll <= medidas.wrapCliente + 1, 'no debe hacer falta scroll lateral para leer la tarea');
  assert.ok(medidas.pagScroll <= medidas.ventana + 1, 'la página no debe desbordarse');

  await ctx.cdp.send('Emulation.clearDeviceMetricsOverride', {}, ctx.sessionId);
});

test('no hubo errores de consola ni respuestas 404', () => {
  assert.deepEqual(ctx.errores, [], `errores inesperados: ${ctx.errores.join(' | ')}`);
  // El único fallo de red permitido es el 500 controlado del test de arranque.
  const fallidas = ctx.red.filter((texto) => !/status of 500/.test(texto));
  assert.deepEqual(fallidas, [], `recursos no encontrados: ${fallidas.join(' | ')}`);
});

test('abrir el index con file:// explica cómo usar un servidor local', async () => {
  const { targetId } = await ctx.cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await ctx.cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await ctx.cdp.send('Page.enable', {}, sessionId);
  await ctx.cdp.send('Runtime.enable', {}, sessionId);

  const urlArchivo = `file://${join(RAIZ, 'Especializacioes/AppSec/web/index.html')}`;
  await ctx.cdp.send('Page.navigate', { url: urlArchivo }, sessionId);
  await dormir(1500);

  const evaluado = await ctx.cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const aviso = document.getElementById('aviso-archivo');
      if (!aviso) return { existe: false };
      const caja = aviso.getBoundingClientRect();
      return {
        existe: true,
        visible: getComputedStyle(aviso).display !== 'none' && caja.height > 0,
        texto: aviso.textContent.replace(/\\s+/g, ' ').trim(),
        comando: aviso.querySelector('pre code') ? aviso.querySelector('pre code').textContent : '',
        enlaces: aviso.querySelectorAll('a').length
      };
    })()`,
    returnByValue: true,
  }, sessionId);

  const aviso = evaluado.result.value;
  assert.equal(aviso.existe, true);
  assert.equal(aviso.visible, true, 'con file:// debe verse la instrucción, no una pantalla vacía');
  assert.match(aviso.texto, /servidor/i);
  assert.match(aviso.comando, /python3 -m http\.server 8000 --bind 127\.0\.0\.1/);
  assert.match(aviso.texto, /http:\/\/127\.0\.0\.1:8000\/Especializacioes\/AppSec\/web\//);
  assert.ok(aviso.enlaces >= 1, 'debe ofrecer los .md como alternativa');

  await ctx.cdp.send('Target.closeTarget', { targetId });
});

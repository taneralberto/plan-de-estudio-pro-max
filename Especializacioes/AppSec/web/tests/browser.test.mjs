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

test('la web carga 20 módulos y 83 actividades sin errores de consola', async () => {
  const estado = await evaluate(`(() => ({
    modulos: document.querySelectorAll('#modulos details.modulo').length,
    casillas: document.querySelectorAll('#modulos input[type=checkbox][data-actividad]').length,
    titulo: document.getElementById('titulo-itinerario').textContent.trim(),
    horario: document.getElementById('horario').textContent.trim(),
    prompts: document.querySelectorAll('#cuerpo-prompts .md-codigo').length,
    copiar: document.querySelectorAll('#cuerpo-prompts button[data-copiar]').length,
    notas: document.querySelectorAll('#modulos textarea[data-notas-modulo]').length,
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    valorModulos: document.getElementById('valor-modulos').textContent.trim(),
    desarrollo: document.querySelectorAll('#modulos .desarrollo h3').length,
    codigo: document.querySelectorAll('#modulos .md-codigo').length
  }))()`);

  assert.equal(estado.modulos, 20);
  assert.equal(estado.casillas, 83);
  assert.equal(estado.notas, 20);
  assert.equal(estado.prompts, 8);
  assert.equal(estado.copiar, 8);
  assert.ok(estado.desarrollo > 0, 'el desarrollo de las actividades se renderiza junto a la tabla');
  assert.ok(estado.codigo > 0, 'los bloques de código se renderizan junto a la tabla');
  assert.match(estado.horario, /20 módulos/);
  assert.match(estado.horario, /83 actividades/);
  assert.match(estado.horario, /2–3 horas semanales/);
  assert.doesNotMatch(estado.horario, /≈|\d+ semanas|sesiones/);
  assert.equal(await evaluate(`document.querySelector('#valor-horas, #barra-horas, .col-duracion')`), null);
  assert.match(estado.titulo, /20 módulos/);
  assert.equal(estado.valorActividades, '0 / 83');
  assert.equal(estado.valorModulos, '0 / 20');
});

test('marcar dos actividades actualiza las estadísticas', async () => {
  await evaluate(`(() => {
    document.getElementById('cb-module-1-a1').click();
    document.getElementById('cb-module-1-a3').click();
    return true;
  })()`);

  const estado = await evaluate(`(() => ({
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    contador: document.querySelector('[data-progreso-modulo="1"]').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1')
  }))()`);

  assert.equal(estado.valorActividades, '2 / 83');
  assert.equal(estado.contador, '2/5');
  assert.ok(estado.guardado, 'el progreso debe guardarse en localStorage');
  assert.ok(estado.guardado.includes('module-1-a1'));
  assert.ok(estado.guardado.includes('module-1-a3'));
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
    primera: document.getElementById('cb-module-1-a1').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    nota: document.getElementById('notas-3').value
  }))()`);

  assert.equal(estado.primera, true);
  assert.equal(estado.tercera, true);
  assert.equal(estado.nota, 'Traza sanitizada: request/response anotado.');
});

test('la búsqueda y los filtros no rompen el acordeón', async () => {
  const antes = await evaluate(`(() => ({
    abiertas: document.querySelectorAll('#modulos details.modulo[open]').length,
    modulo1: document.querySelector('#modulos details.modulo').open
  }))()`);
  assert.ok(antes.abiertas >= 1, 'al cargar debe quedar abierto el primer módulo pendiente');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.focus();
    campo.value = 'SSRF';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const filtrado = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
    numeros: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).map((d) => d.dataset.modulo),
    titulos: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).map((d) => d.querySelector('.modulo-titulo').textContent),
    resultados: document.getElementById('resultados').textContent.trim(),
    foco: document.activeElement.id
  }))()`);

  assert.ok(filtrado.visibles >= 1, 'la búsqueda debe encontrar el módulo de SSRF');
  assert.ok(filtrado.visibles < 20, 'la búsqueda debe reducir la lista');
  assert.ok(filtrado.numeros.includes('9'), 'el módulo de SSRF debe aparecer');
  assert.ok(filtrado.titulos.some((titulo) => /SSRF/.test(titulo)));
  assert.match(filtrado.resultados, /de 20 módulos visibles/);
  assert.equal(filtrado.foco, 'buscar', 'el foco debe seguir en el campo de búsqueda');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = 'no-existe-nada-xyz';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const vacio = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
    mensaje: !!document.querySelector('.sin-resultados'),
    boton: !!document.querySelector('.sin-resultados button')
  }))()`);
  assert.equal(vacio.visibles, 0);
  assert.equal(vacio.mensaje, true);
  assert.equal(vacio.boton, true);

  await evaluate(`document.querySelector('.sin-resultados button').click()`);
  const limpio = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
    valor: document.getElementById('buscar').value
  }))()`);
  assert.equal(limpio.visibles, 20);
  assert.equal(limpio.valor, '');

  const abierto = await evaluate(`document.querySelector('#modulos details.modulo').open`);
  assert.equal(abierto, true, 'la búsqueda no debe cerrar los módulos ya abiertos');
});

test('el desarrollo de una actividad es buscable', async () => {
  // Texto del desarrollo de M10-A3, no de la tabla ni del título.
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = 'resolver la ruta a su forma real';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const filtrado = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
    numeros: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).map((d) => d.dataset.modulo)
  }))()`);

  assert.ok(filtrado.visibles >= 1, 'el texto del desarrollo debe ser buscable');
  assert.deepEqual(filtrado.numeros, ['10'], 'solo el módulo cuyo desarrollo lo menciona');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
});

test('los filtros por estado separan pendientes, en curso y estudiadas', async () => {
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-filtro="todas"]').click();
    return true;
  })()`);

  await evaluate(`(() => {
    document.querySelector('[data-filtro="en-curso"]').click();
    return true;
  })()`);
  const enCurso = await evaluate(`(() => ({
    visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
    presionado: document.querySelector('[data-filtro="en-curso"]').getAttribute('aria-pressed')
  }))()`);
  assert.equal(enCurso.visibles, 1);
  assert.equal(enCurso.presionado, 'true');

  await evaluate(`(() => {
    document.querySelector('[data-filtro="todas"]').click();
    document.getElementById('cb-module-2-a1').click();
    return true;
  })()`);

  await evaluate(`document.querySelector('[data-filtro="pendientes"]').click()`);
  const pendientes = await evaluate(
    `[...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length`,
  );
  assert.equal(pendientes, 18, 'los módulos 1 y 2 ya no están pendientes');

  await evaluate(`document.querySelector('[data-filtro="en-curso"]').click()`);
  const enCursoAhora = await evaluate(
    `[...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length`,
  );
  assert.equal(enCursoAhora, 2, 'el módulo 1 (2/5) y el módulo 2 (1/4) están en curso');

  await evaluate(`document.querySelector('[data-filtro="todas"]').click()`);
});

test('marcar una actividad no hace desaparecer el módulo bajo el filtro activo', async () => {
  await evaluate(`document.querySelector('[data-filtro="pendientes"]').click()`);

  const antes = await evaluate(`(() => {
    const visibles = [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden);
    const primero = visibles[0];
    const casilla = primero.querySelector('input[type=checkbox]');
    return {
      pendientes: document.querySelector('[data-cuenta="pendientes"]').textContent,
      visibles: visibles.length,
      modulo: primero.dataset.modulo,
      casilla: casilla.id
    };
  })()`);

  await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="${antes.modulo}"]');
    modulo.open = true;
    const casilla = document.getElementById('${antes.casilla}');
    casilla.focus();
    casilla.click();
    return true;
  })()`);

  const despues = await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="${antes.modulo}"]');
    return {
      visibles: [...document.querySelectorAll('#modulos details.modulo')].filter((d) => !d.hidden).length,
      sigueVisible: !modulo.hidden,
      pendientes: document.querySelector('[data-cuenta="pendientes"]').textContent,
      enCurso: document.querySelector('[data-cuenta="en-curso"]').textContent,
      foco: document.activeElement.id
    };
  })()`);

  assert.equal(despues.sigueVisible, true, 'el módulo marcado no debe desaparecer');
  assert.equal(despues.visibles, antes.visibles, 'la lista visible no cambia al marcar');
  assert.equal(Number(despues.pendientes), Number(antes.pendientes) - 1);
  assert.equal(despues.foco, antes.casilla, 'el foco debe quedarse en la casilla');

  await evaluate(`document.querySelector('[data-filtro="todas"]').click()`);
});

test('el acordeón responde al teclado y «Continuar» enfoca la actividad pendiente', async () => {
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-filtro="todas"]').click();
    return true;
  })()`);

  await evaluate(`(() => {
    const details = document.querySelectorAll('#modulos details.modulo')[2];
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
    `document.querySelectorAll('#modulos details.modulo')[2].open`,
  );
  assert.equal(abierto, true, 'Enter sobre el resumen debe abrir el módulo');

  await evaluate(`document.getElementById('btn-continuar').click()`);
  const foco = await evaluate(`(() => ({
    id: document.activeElement.id,
    modulo: document.activeElement.closest('details').dataset.modulo,
    abierta: document.activeElement.closest('details').open
  }))()`);
  assert.match(foco.id, /^cb-module-/);
  assert.equal(foco.abierta, true);
});

test('el enlace interno del itinerario abre la actividad y abre su módulo', async () => {
  await evaluate(`(() => {
    window.location.hash = '#/itinerario';
    return true;
  })()`);
  await esperarPor(`!document.getElementById('vista-itinerario').hidden`, { etiqueta: 'la vista del itinerario' });

  await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="3"]');
    modulo.open = true;
    const enlace = modulo.querySelector('.tabla-actividades a.enlace-doc');
    window.__enlaceActividad = enlace;
    return enlace ? enlace.getAttribute('href') : '';
  })()`);

  const href = await evaluate(`window.__enlaceActividad ? window.__enlaceActividad.getAttribute('href') : ''`);
  assert.ok(href.includes('ITINERARIO.md'), 'el enlace apunta al itinerario');
  assert.ok(href.includes('anchor=m1-a1--') || href.includes('anchor=m3-a1--'), 'el enlace lleva al ancla de la actividad');

  await evaluate(`window.__enlaceActividad.click()`);
  await dormir(300);

  const destino = await evaluate(`(() => {
    const ancla = document.querySelector('#modulos details.modulo [data-anchor="m3-a1--autorización-e-idorbola-entre-tenants"], #modulos h3[id*="m3-a1--"]');
    return {
      existe: !!ancla,
      moduloAbierto: !!document.querySelector('#modulos details.modulo[data-modulo="3"]').open,
      visible: !document.getElementById('vista-itinerario').hidden
    };
  })()`);
  assert.equal(destino.visible, true);
  assert.equal(destino.moduloAbierto, true, 'el módulo del ancla debe quedar abierto');
});

test('un enlace a un prerrequisito que la búsqueda esconde lo revela y enfoca el ancla', async () => {
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-filtro="todas"]').click();
    window.location.hash = '#/itinerario';
    return true;
  })()`);
  await esperarPor(`!document.getElementById('vista-itinerario').hidden`, { etiqueta: 'la vista del itinerario' });

  // La búsqueda deja visible el módulo 18 y esconde el módulo 3.
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = 'excessive agency';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);

  const filtrado = await evaluate(`(() => ({
    m3: document.querySelector('#modulos details.modulo[data-modulo="3"]').hidden,
    m18: document.querySelector('#modulos details.modulo[data-modulo="18"]').hidden
  }))()`);
  assert.equal(filtrado.m18, false, 'el módulo 18 debe seguir visible con la búsqueda');
  assert.equal(filtrado.m3, true, 'el módulo 3 debe quedar escondido con la búsqueda');

  const hayEnlace = await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="18"]');
    modulo.open = true;
    window.__enlacePrerrequisito = modulo.querySelector('a.enlace-doc[data-anchor="m3-a3--default-deny-y-consulta-con-alcance"]');
    return !!window.__enlacePrerrequisito;
  })()`);
  assert.equal(hayEnlace, true, 'el módulo 18 debe enlazar con su prerrequisito M3-A3');

  const guardadoAntes = await evaluate(`window.localStorage.getItem('appsec-progreso-v1')`);

  await evaluate(`window.__enlacePrerrequisito.click()`);
  await esperarPor(
    `document.activeElement && document.activeElement.dataset.anchor === 'm3-a3--default-deny-y-consulta-con-alcance'`,
    { etiqueta: 'el foco en el ancla de M3-A3' },
  );

  const destino = await evaluate(`(() => {
    const ancla = document.querySelector('#modulos h3[data-anchor="m3-a3--default-deny-y-consulta-con-alcance"]');
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="3"]');
    return {
      visible: !modulo.hidden,
      abierto: modulo.open,
      conCaja: ancla.getClientRects().length > 0,
      focoEsAncla: document.activeElement === ancla,
      focoEsEnlace: document.activeElement === window.__enlacePrerrequisito,
      busqueda: document.getElementById('buscar').value,
      filtro: document.querySelector('[data-filtro="todas"]').getAttribute('aria-pressed'),
      guardado: window.localStorage.getItem('appsec-progreso-v1')
    };
  })()`);

  assert.equal(destino.visible, true, 'el módulo del prerrequisito debe quedar visible');
  assert.equal(destino.abierto, true, 'el módulo del prerrequisito debe quedar abierto');
  assert.equal(destino.conCaja, true, 'el ancla debe verse en pantalla');
  assert.equal(destino.focoEsAncla, true, 'el foco debe caer en el ancla');
  assert.equal(destino.focoEsEnlace, false, 'el foco no debe quedarse en el enlace pulsado');
  assert.equal(destino.busqueda, '', 'la búsqueda debe limpiarse para poder mostrar el destino');
  assert.equal(destino.filtro, 'true', 'el filtro debe volver a «todas»');
  assert.equal(destino.guardado, guardadoAntes, 'navegar no debe tocar el progreso guardado');
});

test('un enlace a un prerrequisito que el filtro de estado esconde lo revela y enfoca el ancla', async () => {
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-filtro="todas"]').click();
    return true;
  })()`);

  // El filtro «pendientes» esconde el módulo 3 en cuanto tiene una actividad
  // marcada; el módulo 18, sin marcar, sigue visible.
  const marcadaAntes = await evaluate(`(() => {
    const casilla = document.getElementById('cb-module-3-a1');
    const estaba = casilla.checked;
    if (!estaba) casilla.click();
    return estaba;
  })()`);

  await evaluate(`document.querySelector('[data-filtro="pendientes"]').click()`);

  const filtrado = await evaluate(`(() => ({
    m3: document.querySelector('#modulos details.modulo[data-modulo="3"]').hidden,
    m18: document.querySelector('#modulos details.modulo[data-modulo="18"]').hidden
  }))()`);
  assert.equal(filtrado.m18, false, 'el módulo 18 debe seguir visible con el filtro de estado');
  assert.equal(filtrado.m3, true, 'el módulo 3 debe quedar escondido con el filtro de estado');

  const hayEnlace = await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="18"]');
    modulo.open = true;
    window.__enlacePrerrequisito = modulo.querySelector('a.enlace-doc[data-anchor="m3-a3--default-deny-y-consulta-con-alcance"]');
    return !!window.__enlacePrerrequisito;
  })()`);
  assert.equal(hayEnlace, true, 'el módulo 18 debe enlazar con su prerrequisito M3-A3');

  const guardadoAntes = await evaluate(`window.localStorage.getItem('appsec-progreso-v1')`);

  await evaluate(`window.__enlacePrerrequisito.click()`);
  await esperarPor(
    `document.activeElement && document.activeElement.dataset.anchor === 'm3-a3--default-deny-y-consulta-con-alcance'`,
    { etiqueta: 'el foco en el ancla de M3-A3' },
  );

  const destino = await evaluate(`(() => {
    const ancla = document.querySelector('#modulos h3[data-anchor="m3-a3--default-deny-y-consulta-con-alcance"]');
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="3"]');
    return {
      visible: !modulo.hidden,
      abierto: modulo.open,
      conCaja: ancla.getClientRects().length > 0,
      focoEsAncla: document.activeElement === ancla,
      focoEsEnlace: document.activeElement === window.__enlacePrerrequisito,
      busqueda: document.getElementById('buscar').value,
      filtro: document.querySelector('[data-filtro="todas"]').getAttribute('aria-pressed'),
      guardado: window.localStorage.getItem('appsec-progreso-v1')
    };
  })()`);

  assert.equal(destino.visible, true, 'el módulo del prerrequisito debe quedar visible');
  assert.equal(destino.abierto, true, 'el módulo del prerrequisito debe quedar abierto');
  assert.equal(destino.conCaja, true, 'el ancla debe verse en pantalla');
  assert.equal(destino.focoEsAncla, true, 'el foco debe caer en el ancla');
  assert.equal(destino.focoEsEnlace, false, 'el foco no debe quedarse en el enlace pulsado');
  assert.equal(destino.busqueda, '', 'la búsqueda debe seguir vacía');
  assert.equal(destino.filtro, 'true', 'el filtro debe volver a «todas»');
  assert.equal(destino.guardado, guardadoAntes, 'navegar no debe tocar el progreso guardado');

  // Se deja el progreso y los filtros como estaban antes de la prueba.
  await evaluate(`(() => {
    if (!${marcadaAntes ? 'false' : 'true'}) document.getElementById('cb-module-3-a1').click();
    document.querySelector('[data-filtro="todas"]').click();
    return true;
  })()`);
});

test('un enlace a un ancla que ya está visible no pierde la búsqueda activa', async () => {
  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = 'excessive agency';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    const modulo = document.querySelector('#modulos details.modulo[data-modulo="18"]');
    modulo.open = true;
    window.__enlaceVisible = modulo.querySelector('a.enlace-doc[data-anchor="m18-a3--excessive-agency-y-política-de-herramientas-externas"]');
    return !!window.__enlaceVisible;
  })()`);
  assert.equal(await evaluate(`!!window.__enlaceVisible`), true, 'el módulo 18 enlaza con su propia actividad');

  await evaluate(`window.__enlaceVisible.click()`);
  await esperarPor(
    `document.activeElement && document.activeElement.dataset.anchor === 'm18-a3--excessive-agency-y-política-de-herramientas-externas'`,
    { etiqueta: 'el foco en el ancla de M18-A3' },
  );

  const estado = await evaluate(`(() => ({
    busqueda: document.getElementById('buscar').value,
    m3: document.querySelector('#modulos details.modulo[data-modulo="3"]').hidden,
    m18: document.querySelector('#modulos details.modulo[data-modulo="18"]').hidden,
    focoEsAncla:
      document.activeElement ===
      document.querySelector('#modulos h3[data-anchor="m18-a3--excessive-agency-y-política-de-herramientas-externas"]')
  }))()`);

  assert.equal(estado.focoEsAncla, true, 'el foco debe caer en el ancla');
  assert.equal(estado.busqueda, 'excessive agency', 'la búsqueda no debe perderse si el destino ya está visible');
  assert.equal(estado.m3, true, 'el filtro sigue aplicando: el módulo 3 sigue escondido');
  assert.equal(estado.m18, false, 'el módulo 18 sigue visible');

  await evaluate(`(() => {
    const campo = document.getElementById('buscar');
    campo.value = '';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
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
    assert.match(portapapeles, /Módulo \[MÓDULO\]|Módulo/);
  }
});

test('una importación malformada no pisa el progreso', async () => {
  const antes = await evaluate(`(() => ({
    primera: document.getElementById('cb-module-1-a1').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim()
  }))()`);
  assert.equal(antes.primera, true);

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
    primera: document.getElementById('cb-module-1-a1').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    error: document.querySelector('#avisos .aviso-error').textContent
  }))()`);

  assert.equal(despues.primera, true, 'una importación inválida no debe desmarcar nada');
  assert.equal(despues.tercera, true);
  assert.equal(despues.actividades, antes.actividades);
  assert.match(despues.error, /JSON|No se ha importado nada/i);
});

test('exportar e importar una copia válida mantiene el progreso', async () => {
  const actividadesAntes = await evaluate(`document.getElementById('valor-actividades').textContent.trim()`);
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
  assert.equal(contenido.completed['module-1-a1'], true);

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
    primera: document.getElementById('cb-module-1-a1').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    dialogo: document.getElementById('dialogo-confirmar').open
  }))()`);
  assert.equal(despues.primera, true);
  assert.equal(despues.tercera, true);
  assert.equal(despues.actividades, actividadesAntes);
  assert.equal(despues.dialogo, false);
});

test('si el almacenamiento falla se avisa sin romper la página', async () => {
  await evaluate(`(() => {
    if (!window.__setItemOriginal) window.__setItemOriginal = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('sin cuota', 'QuotaExceededError'); };
    return true;
  })()`);

  await evaluate(`document.getElementById('cb-module-3-a1').click()`);
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

  // Itinerario con un módulo abierto (tabla de actividades incluida).
  await evaluate(`(() => {
    document.querySelector('#modulos details.modulo').open = true;
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
    marcada: document.getElementById('cb-module-1-a1').checked,
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
    actividades: document.getElementById('valor-actividades').textContent.trim()
  }))()`);
  assert.ok(limpio.guardado === null || limpio.guardado.includes('"version": 1'));
  assert.equal(limpio.actividades, '0 / 83');
});

test('el buscador incluye el número y el título del módulo', async () => {
  const buscar = async (texto) => {
    await evaluate(`(() => {
      const campo = document.getElementById('buscar');
      campo.value = ${JSON.stringify(texto)};
      campo.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    })()`);
    return evaluate(`(() => ({
      visibles: [...document.querySelectorAll('#modulos details.modulo')]
        .filter((d) => !d.hidden)
        .map((d) => d.dataset.modulo),
      titulos: [...document.querySelectorAll('#modulos details.modulo')]
        .filter((d) => !d.hidden)
        .map((d) => d.querySelector('.modulo-titulo').textContent)
    }))()`);
  };

  const porNumero = await buscar('Módulo 20');
  assert.ok(porNumero.visibles.includes('20'), 'el número del módulo debe ser buscable');

  const porTitulo = await buscar('congelado');
  assert.ok(porTitulo.visibles.includes('19'), 'el título del módulo debe ser buscable');
  assert.ok(
    porTitulo.titulos.some((titulo) => /evaluación integradora/i.test(titulo)),
    'el módulo 19 debe aparecer por su título',
  );

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

  // Al recargar, la nota no debe reaparecer: nunca se afirma que se guardó.
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
      completed: { 'module-1-a1': true, 'module-1-a3': true },
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
  assert.equal(fallo.exportar, true, 'no se puede exportar sin lista de módulos');
  assert.equal(fallo.importar, true, 'no se puede importar sin lista de módulos');
  assert.equal(fallo.reiniciar, true);
  assert.equal(fallo.continuar, true);
  assert.equal(fallo.buscar, true);
  assert.ok(fallo.guardado.includes('module-1-a1'), 'el progreso guardado no debe tocarse');
  assert.ok(fallo.guardado.includes('Nota previa que debe sobrevivir'));

  // Ahora el servidor responde: el reintento debe hidratar el mismo pipeline.
  ctx.fallItinerario = false;
  await evaluate(`document.querySelector('#error-itinerario button').click()`);
  await esperarPor(`document.querySelectorAll('#modulos details.modulo').length === 20`, {
    etiqueta: 'el itinerario tras reintentar',
  });
  await dormir(300);

  const hidratado = await evaluate(`(() => ({
    primera: document.getElementById('cb-module-1-a1').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    nota: document.getElementById('notas-2').value,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    modulos: document.getElementById('valor-modulos').textContent.trim(),
    error: document.getElementById('error-itinerario').hidden,
    exportar: document.getElementById('btn-exportar').disabled
  }))()`);

  assert.equal(hidratado.primera, true, 'las marcas previas deben volver');
  assert.equal(hidratado.tercera, true);
  assert.equal(hidratado.nota, 'Nota previa que debe sobrevivir', 'la nota previa debe volver');
  assert.equal(hidratado.actividades, '2 / 83');
  assert.equal(hidratado.modulos, '0 / 20');
  assert.equal(hidratado.error, true, 'el error debe desaparecer tras el reintento');
  assert.equal(hidratado.exportar, false, 'los controles vuelven a estar disponibles');

  // Se puede seguir marcando y el cambio persiste.
  await evaluate(`document.getElementById('cb-module-1-a2').click()`);
  await dormir(200);
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const final = await evaluate(`(() => ({
    primera: document.getElementById('cb-module-1-a1').checked,
    segunda: document.getElementById('cb-module-1-a2').checked,
    tercera: document.getElementById('cb-module-1-a3').checked,
    nota: document.getElementById('notas-2').value,
    actividades: document.getElementById('valor-actividades').textContent.trim()
  }))()`);

  assert.equal(final.primera, true);
  assert.equal(final.segunda, true);
  assert.equal(final.tercera, true);
  assert.equal(final.nota, 'Nota previa que debe sobrevivir');
  assert.equal(final.actividades, '3 / 83');
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
    actividades: document.getElementById('valor-actividades').textContent.trim()
  }))()`);
  assert.equal(trasReinicio.actividades, '0 / 83');
  assert.equal(trasReinicio.accionVieja, false, 'la acción de «dato dañado» debe retirarse tras el reinicio');

  // Marca nueva: el progreso válido ya existe.
  await evaluate(`document.getElementById('cb-module-2-a1').click()`);
  await dormir(200);

  // Se pulsa el botón viejo (puede estar fuera del DOM): no debe borrar nada.
  await evaluate(`(() => { if (window.__botonViejo) window.__botonViejo.click(); return true; })()`);
  await dormir(400);

  const tras = await evaluate(`(() => ({
    marcada: document.getElementById('cb-module-2-a1').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(tras.marcada, true, 'la acción obsoleta no debe desmarcar el progreso nuevo');
  assert.equal(tras.actividades, '1 / 83');
  assert.ok(tras.guardado.includes('module-2-a1'), 'el progreso guardado no debe borrarse');
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
    JSON.stringify({ version: 1, completed: { 'module-3-a1': true, 'module-3-a3': true }, notes: {} }),
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
    marcado: document.getElementById('cb-module-3-a1').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    accionVieja: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(trasImportar.marcado, true, 'la copia válida debe aplicarse');
  assert.equal(trasImportar.actividades, '2 / 83');
  assert.equal(trasImportar.accionVieja, false, 'la acción de «dato dañado» debe retirarse tras importar');
  assert.ok(trasImportar.guardado.includes('module-3-a1'));

  // El botón viejo, si se conserva la referencia, no debe borrar el estado.
  await evaluate(`(() => { if (window.__botonViejo) window.__botonViejo.click(); return true; })()`);
  await dormir(400);

  const final = await evaluate(`(() => ({
    marcado: document.getElementById('cb-module-3-a1').checked,
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(final.marcado, true, 'la acción obsoleta no debe borrar el progreso importado');
  assert.equal(final.actividades, '2 / 83');
  assert.ok(final.guardado.includes('module-3-a1'));
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

  // Se marca una actividad en RAM (no se puede guardar: el dato está dañado).
  await evaluate(`document.getElementById('cb-module-1-a1').click()`);
  await dormir(300);

  const antes = await evaluate(`(() => ({
    marcada: document.getElementById('cb-module-1-a1').checked,
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
    marcada: document.getElementById('cb-module-1-a1').checked,
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
    marcada: document.getElementById('cb-module-1-a1').checked,
    accion: [...document.querySelectorAll('#avisos .aviso button')].some((b) => /dañado/i.test(b.textContent)),
    actividades: document.getElementById('valor-actividades').textContent.trim(),
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(resuelto.marcada, false, 'tras borrar, el progreso en RAM se limpia');
  assert.equal(resuelto.accion, false, 'el aviso se retira al resolver');
  assert.equal(resuelto.actividades, '0 / 83');
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

  await evaluate(`document.getElementById('cb-module-2-a1').click()`);
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
    marcada: document.getElementById('cb-module-2-a1').checked,
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

test('en móvil la evidencia de la actividad se lee entera sin scroll lateral', async () => {
  await ctx.cdp.send(
    'Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
    ctx.sessionId,
  );
  await dormir(300);

  await evaluate(`(() => {
    const modulo = document.querySelector('#modulos details.modulo');
    modulo.open = true;
    modulo.scrollIntoView();
    return true;
  })()`);
  await dormir(250);

  const medidas = await evaluate(`(() => {
    const celda = document.querySelector('#modulos .tabla-actividades tbody tr td.col-evidencia');
    const caja = celda.getBoundingClientRect();
    const wrap = celda.closest('.tabla-actividades-wrap');
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

  assert.ok(medidas.largo > 40, 'la evidencia debe seguir ahí');
  assert.ok(medidas.izquierda >= 0, 'la evidencia no puede empezar fuera del viewport');
  assert.ok(medidas.derecha <= medidas.ventana + 1, `la evidencia se sale del viewport (${medidas.derecha} > ${medidas.ventana})`);
  assert.ok(medidas.ancho >= 280, `la evidencia debe tener ancho legible (${medidas.ancho}px)`);
  assert.ok(medidas.wrapScroll <= medidas.wrapCliente + 1, 'no debe hacer falta scroll lateral para leer la evidencia');
  assert.ok(medidas.pagScroll <= medidas.ventana + 1, 'la página no debe desbordarse');

  await ctx.cdp.send('Emulation.clearDeviceMetricsOverride', {}, ctx.sessionId);
});

test('el historial del plan anterior se conserva, se muestra y no cuenta para la ruta actual', async () => {
  // Se siembran las 140 marcas del plan anterior, las 20 notas y dos actividades.
  await evaluate(`(() => {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const completed = {};
    for (let semana = 1; semana <= 20; semana += 1) {
      for (const dia of dias) completed['week-' + semana + '-' + dia] = true;
    }
    completed['module-1-a1'] = true;
    completed['module-2-a1'] = true;
    const notes = {};
    for (let numero = 1; numero <= 20; numero += 1) notes['week-' + numero] = 'Nota conservada ' + numero;
    window.localStorage.setItem('appsec-progreso-v1', JSON.stringify({ version: 1, completed, notes }));
    return true;
  })()`);

  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const estado = await evaluate(`(() => ({
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    valorModulos: document.getElementById('valor-modulos').textContent.trim(),
    marcadas: document.querySelectorAll('#modulos tr[data-estudiada="true"]').length,
    historialVisible: !document.getElementById('historial').hidden,
    historial: document.getElementById('historial').textContent.replace(/\\s+/g, ' ').trim(),
    nota2: document.getElementById('notas-2').value,
    nota20: document.getElementById('notas-20').value,
    avisos: [...document.querySelectorAll('#avisos .aviso')].map((n) => n.textContent).join(' | ')
  }))()`);

  assert.equal(estado.valorActividades, '2 / 83', 'el historial no cuenta como actividad');
  assert.equal(estado.marcadas, 2, 'solo las actividades nuevas están marcadas');
  assert.equal(estado.valorModulos, '0 / 20');
  assert.equal(estado.historialVisible, true, 'el historial debe verse');
  assert.match(estado.historial, /140 marcas conservadas/);
  assert.match(estado.historial, /Módulo 1/);
  assert.match(estado.historial, /lunes, martes, miércoles/);
  assert.match(estado.historial, /20 notas conservadas/);
  assert.equal(estado.nota2, 'Nota conservada 2');
  assert.equal(estado.nota20, 'Nota conservada 20');
  assert.doesNotMatch(estado.avisos, /descartaron/i, 'las marcas del plan anterior son conocidas');

  // Se marca una actividad nueva más: el historial sigue intacto.
  await evaluate(`document.getElementById('cb-module-3-a1').click()`);
  await dormir(300);

  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const tras = await evaluate(`(() => ({
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    historial: document.getElementById('historial').textContent.replace(/\\s+/g, ' ').trim(),
    nota2: document.getElementById('notas-2').value,
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(tras.valorActividades, '3 / 83');
  assert.match(tras.historial, /140 marcas conservadas/);
  assert.equal(tras.nota2, 'Nota conservada 2');

  const guardado = JSON.parse(tras.guardado);
  assert.equal(Object.keys(guardado.completed).length, 143, 'las 140 marcas antiguas y las 3 nuevas');
  assert.equal(guardado.completed['week-1-lunes'], true);
  assert.equal(guardado.completed['module-3-a1'], true);
  assert.equal(Object.keys(guardado.notes).length, 20);
});

test('con solo historial, los contadores de la ruta actual están a cero y «Continuar» enfoca la primera actividad', async () => {
  await evaluate(`(() => {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const completed = {};
    for (let semana = 1; semana <= 20; semana += 1) {
      for (const dia of dias) completed['week-' + semana + '-' + dia] = true;
    }
    window.localStorage.setItem('appsec-progreso-v1', JSON.stringify({ version: 1, completed, notes: {} }));
    return true;
  })()`);

  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const estado = await evaluate(`(() => ({
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    valorModulos: document.getElementById('valor-modulos').textContent.trim(),
    marcadas: document.querySelectorAll('#modulos tr[data-estudiada="true"]').length,
    historialVisible: !document.getElementById('historial').hidden
  }))()`);

  assert.equal(estado.valorActividades, '0 / 83');
  assert.equal(estado.valorModulos, '0 / 20');
  assert.equal(estado.marcadas, 0);
  assert.equal(estado.historialVisible, true);

  await evaluate(`document.getElementById('btn-continuar').click()`);
  const foco = await evaluate(`(() => ({
    id: document.activeElement.id,
    modulo: document.activeElement.closest('details').dataset.modulo
  }))()`);
  assert.equal(foco.id, 'cb-module-1-a1', '«Continuar» debe ir a la primera actividad actual');
  assert.equal(foco.modulo, '1');
});

test('exportar e importar una copia con historial conserva las marcas antiguas', async () => {
  // Estado mixto: historial del plan anterior, notas y actividades nuevas.
  await evaluate(`(() => {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const completed = {};
    for (let semana = 1; semana <= 20; semana += 1) {
      for (const dia of dias) completed['week-' + semana + '-' + dia] = true;
    }
    completed['module-1-a1'] = true;
    completed['module-2-a1'] = true;
    completed['module-3-a1'] = true;
    const notes = {};
    for (let numero = 1; numero <= 20; numero += 1) notes['week-' + numero] = 'Nota conservada ' + numero;
    window.localStorage.setItem('appsec-progreso-v1', JSON.stringify({ version: 1, completed, notes }));
    return true;
  })()`);

  const carga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await carga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const descargas = join(ctx.perfil, 'descargas-mixtas');
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
  assert.equal(contenido.completed['week-1-lunes'], true, 'el historial viaja en la copia');
  assert.equal(contenido.completed['module-1-a1'], true, 'las actividades nuevas también');

  // Se borra todo y se vuelve a importar la copia mixta.
  await evaluate(`window.localStorage.setItem('appsec-progreso-v1', JSON.stringify({ version: 1, completed: {}, notes: {} }))`);
  const recarga = esperarEvento('Page.loadEventFired');
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await recarga;
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'la app lista tras recargar' });

  const { root } = await ctx.cdp.send('DOM.getDocument', { depth: -1 }, ctx.sessionId);
  const { nodeId } = await ctx.cdp.send(
    'DOM.querySelector',
    { nodeId: root.nodeId, selector: '#input-importar' },
    ctx.sessionId,
  );
  await ctx.cdp.send('DOM.setFileInputFiles', { files: [join(descargas, archivo)], nodeId }, ctx.sessionId);
  // Si queda progreso, la importación pide confirmación; si no, se aplica sola.
  await esperarPor(
    `document.getElementById('dialogo-confirmar').open || document.getElementById('cb-module-1-a1').checked`,
    { etiqueta: 'la importación de la copia mixta' },
  );
  if (await evaluate(`document.getElementById('dialogo-confirmar').open`)) {
    await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  }
  await dormir(400);

  const despues = await evaluate(`(() => ({
    actividad: document.getElementById('cb-module-1-a1').checked,
    valorActividades: document.getElementById('valor-actividades').textContent.trim(),
    historial: document.getElementById('historial').textContent.replace(/\\s+/g, ' ').trim(),
    nota2: document.getElementById('notas-2').value,
    guardado: window.localStorage.getItem('appsec-progreso-v1') || ''
  }))()`);

  assert.equal(despues.actividad, true, 'la actividad importada debe quedar marcada');
  assert.equal(despues.valorActividades, '3 / 83', 'el historial no cuenta como actividad');
  assert.match(despues.historial, /140 marcas conservadas/);
  assert.equal(despues.nota2, 'Nota conservada 2');

  const guardado = JSON.parse(despues.guardado);
  assert.equal(Object.keys(guardado.completed).length, 143);
  assert.equal(Object.keys(guardado.notes).length, 20);
});

test('progreso previo completo conserva los 83 IDs, 20 notas e historial al recargar e importar', async () => {
  const ids = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: [1, 2, 4].includes(i + 1) ? 5 : 4 }, (_, j) => `module-${i + 1}-a${j + 1}`)).flat();
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const legacy = Array.from({ length: 20 }, (_, i) => dias.map((dia) => `week-${i + 1}-${dia}`)).flat();
  const previo = {
    version: 1,
    completed: Object.fromEntries([...ids, ...legacy].map((id) => [id, true])),
    notes: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`week-${i + 1}`, `Nota previa ${i + 1}`])),
  };
  await evaluate(`localStorage.setItem('appsec-progreso-v1', ${JSON.stringify(JSON.stringify(previo))})`);
  await ctx.cdp.send('Page.reload', {}, ctx.sessionId);
  await esperarPor("document.body.dataset.ready === '1'", { etiqueta: 'progreso completo hidratado' });

  const comprobar = async () => {
    const estado = await evaluate(`(() => ({
      ids: [...document.querySelectorAll('#modulos input[data-actividad]:checked')].map(n => n.dataset.actividad),
      notas: [...document.querySelectorAll('#modulos textarea[data-notas-modulo]')].map(n => n.value),
      columnas: [...document.querySelectorAll('.tabla-actividades thead tr')].map(n => n.children.length),
      actividades: document.getElementById('valor-actividades').textContent.trim(),
      modulos: document.getElementById('valor-modulos').textContent.trim(),
      historial: document.getElementById('historial').textContent,
      guardado: JSON.parse(localStorage.getItem('appsec-progreso-v1'))
    }))()`);
    assert.deepEqual(estado.ids, ids);
    assert.deepEqual(estado.notas, Array.from({ length: 20 }, (_, i) => `Nota previa ${i + 1}`));
    assert.deepEqual(estado.columnas, Array(20).fill(2));
    assert.equal(estado.actividades, '83 / 83');
    assert.equal(estado.modulos, '20 / 20');
    assert.match(estado.historial, /140 marcas conservadas/);
    assert.deepEqual(estado.guardado.completed, previo.completed);
    assert.deepEqual(estado.guardado.notes, previo.notes);
    assert.equal(estado.guardado.version, 1);
  };
  await comprobar();

  // El mismo formato previo se importa sobre un progreso modificado, sin migración.
  await evaluate(`document.getElementById('cb-module-20-a4').click()`);
  const archivo = join(ctx.perfil, 'progreso-previo-completo.json');
  await writeFile(archivo, JSON.stringify(previo), 'utf8');
  const { root } = await ctx.cdp.send('DOM.getDocument', { depth: -1 }, ctx.sessionId);
  const { nodeId } = await ctx.cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#input-importar' }, ctx.sessionId);
  await ctx.cdp.send('DOM.setFileInputFiles', { files: [archivo], nodeId }, ctx.sessionId);
  await esperarPor(`document.getElementById('dialogo-confirmar').open`, { etiqueta: 'confirmar import completo' });
  await evaluate(`document.getElementById('confirmar-aceptar').click()`);
  await esperarPor(`document.getElementById('cb-module-20-a4').checked`, { etiqueta: 'última actividad restaurada' });
  await comprobar();
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

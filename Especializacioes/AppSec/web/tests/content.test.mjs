/**
 * content.test.mjs — parser y render contra el Markdown REAL del repositorio.
 *
 * No se copia ningún fragmento del itinerario en el test: todo se lee del disco.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  DOCS,
  createContext,
  extractCodeBlocks,
  parseItinerario,
  parseMarkdown,
  renderBlocks,
  renderMarkdown,
  resolveDocPath,
  schemeOf,
  slugify,
} from '../content.mjs';

// Los tests viven en `Especializacioes/AppSec/web/tests/`: cuatro niveles hasta
// la raíz del repositorio (tests -> web -> AppSec -> Especializacioes -> raíz).
const RAIZ = fileURLToPath(new URL('../../../../', import.meta.url));
const APPSEC = `${RAIZ}Especializacioes/AppSec/`;

const ITINERARIO = readFileSync(`${APPSEC}ITINERARIO.md`, 'utf8');
const GUIA = readFileSync(`${APPSEC}README.md`, 'utf8');
const RECURSOS = readFileSync(`${APPSEC}RECURSOS.md`, 'utf8');
const PROMPTS = readFileSync(`${APPSEC}PROMPTS.md`, 'utf8');

test('el itinerario real tiene 20 semanas, 7 sesiones por semana y 140 sesiones', () => {
  const parseado = parseItinerario(ITINERARIO);

  assert.equal(parseado.weeks.length, 20);
  assert.equal(parseado.schedule.sessions, 140);

  for (const semana of parseado.weeks) {
    assert.equal(semana.sessions.length, 7, `la semana ${semana.number} debe tener 7 sesiones`);
    const dias = semana.sessions.map((sesion) => sesion.daySlug);
    assert.deepEqual(
      [...dias].sort(),
      ['domingo', 'jueves', 'lunes', 'martes', 'miercoles', 'sabado', 'viernes'],
      `la semana ${semana.number} debe tener los 7 días`,
    );
  }
});

test('las horas se derivan del propio itinerario: 1 h L–V, 2 h S y D, 9 h/semana y 180 h', () => {
  const parseado = parseItinerario(ITINERARIO);
  const { schedule } = parseado;

  assert.deepEqual(schedule.weekdayHours, [1]);
  assert.deepEqual(schedule.weekendHours, [2]);
  assert.equal(schedule.hoursPerWeek, 9);
  assert.equal(schedule.totalHours, 180);

  // 5 × 1 h entre semana + 2 × 2 h el fin de semana = 9 h, y 20 semanas = 180 h.
  const sumaDirecta = parseado.weeks
    .flatMap((semana) => semana.sessions)
    .reduce((total, sesion) => total + sesion.hours, 0);
  assert.equal(sumaDirecta, 20 * 5 * 1 + 20 * 2 * 2);
  assert.equal(sumaDirecta, 180);
});

test('los identificadores de sesión son estables y no dependen del índice global', () => {
  const parseado = parseItinerario(ITINERARIO);
  const ids = parseado.weeks.flatMap((semana) => semana.sessions.map((sesion) => sesion.id));

  assert.equal(ids[0], 'week-1-lunes');
  assert.ok(ids.includes('week-3-lunes'));
  assert.ok(ids.includes('week-20-domingo'));
  assert.equal(new Set(ids).size, ids.length, 'no debe haber identificadores duplicados');
});

test('cada semana conserva objetivo, busca, recursos, entregable y recuperación', () => {
  const parseado = parseItinerario(ITINERARIO);
  for (const semana of parseado.weeks) {
    const claves = semana.items.filter((item) => item.kind === 'field').map((item) => item.key);
    assert.deepEqual(claves, ['objetivo', 'busca', 'recursos', 'entregable', 'recuperacion']);
  }
});

test('el itinerario conserva introducción y cierre, y avisa si el formato cambia', () => {
  const parseado = parseItinerario(ITINERARIO);
  assert.ok(parseado.preamble.length > 0, 'debe conservar la introducción');
  assert.ok(parseado.closing.length > 0, 'debe conservar la nota de cierre');

  const roto = ITINERARIO.replace('| Lunes | 1 h |', '| Lunes | 1 h |');
  const conFilaMenos = ITINERARIO.replace(/^\| Martes \|.*\n/m, '');
  assert.throws(() => parseItinerario(conFilaMenos), /6 filas de sesión en lugar de 7/);
  assert.ok(roto.length > 0);
});

test('PROMPTS.md tiene 8 bloques de prompt y el texto se conserva exactamente', () => {
  const bloques = extractCodeBlocks(PROMPTS);
  assert.equal(bloques.length, 8);
  assert.ok(bloques.every((bloque) => bloque.lang === 'text'));

  const primero = ITINERARIO; // solo para no dejar variable sin usar
  void primero;

  const fuente = readFileSync(`${APPSEC}PROMPTS.md`, 'utf8');
  const original = fuente.split('```text')[1].split('```')[0].replace(/^\n/, '').replace(/\n$/, '');
  assert.equal(bloques[0].text, original);
});

test('el render escapa el texto y bloquea esquemas dangereux', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/README.md', docKey: 'guia' });

  const casos = [
    '[clic](javascript:alert(1))',
    '[clic](JaVaScRiPt:alert(1))',
    '[clic](data:text/html;base64,PHNjcmlwdD4=)',
    '[clic](vbscript:msgbox(1))',
    '[clic](%6a%61%76%61%73%63%72%69%70%74:alert(1))',
    '[clic](java&#115;cript:alert(1))',
  ];

  for (const caso of casos) {
    const { html, blocked } = renderMarkdown(caso, ctx);
    assert.ok(!/href=/.test(html), `no debe quedar ningún href en: ${caso}`);
    assert.ok(!/javascript:/i.test(html), `no debe aparecer javascript: en: ${html}`);
    assert.ok(blocked.length > 0, `el enlace debe quedar registrado como bloqueado: ${caso}`);
    assert.ok(html.includes('enlace-bloqueado'));
  }
});

test('el HTML crudo del Markdown queda inerte', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/README.md', docKey: 'guia' });
  const { html } = renderMarkdown('<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">', ctx);

  assert.ok(!/<script/i.test(html));
  assert.ok(!/<img/i.test(html));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('&lt;img'));
});

test('las comillas de un atributo no rompen el HTML', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/README.md', docKey: 'guia' });
  const { html } = renderMarkdown('[clic](https://ejemplo.test/a"onerror="alert(1))', ctx);
  assert.ok(!/onerror="alert/.test(html));
  assert.ok(html.includes('&quot;'));
});

test('los enlaces con paréntesis balanceados y acentos se resuelven contra el repo', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/README.md', docKey: 'guia' });
  const { html } = renderMarkdown(GUIA, ctx);

  const enlaces = [...html.matchAll(/data-doc-path="([^"]+)"/g)].map((m) => m[1]);
  const esperados = [
    'Etapa 1 — Entrada/1.4 — Seguridad Aplicada.md',
    'Etapa 4 — Profundización/4.2 — CI-CD (Integración y Entrega Continua).md',
    'Etapa 4 — Profundización/4.5 — Observabilidad (Los 3 Pilares).md',
    'METODOLOGIA.md',
    'ROADMAP.md',
    'PROYECTOS.md',
  ];

  for (const esperado of esperados) {
    assert.ok(enlaces.includes(esperado), `falta el enlace a ${esperado}`);
    assert.ok(existsSync(`${RAIZ}${esperado}`), `${esperado} debería existir en el repo`);
  }
});

test('resolveDocPath no permite salir del repo ni abrir rutas ocultas', () => {
  const base = 'Especializacioes/AppSec';

  assert.equal(resolveDocPath(base, '../../METODOLOGIA.md'), 'METODOLOGIA.md');
  assert.equal(resolveDocPath(base, '../../../fuera.md'), null);
  assert.equal(resolveDocPath(base, '/../../etc/passwd'), null);
  assert.equal(resolveDocPath(base, '.git/config.md'), null);
  assert.equal(resolveDocPath(base, '.obsidian/x.md'), null);
  assert.equal(resolveDocPath(base, 'imagen.png'), null);
  assert.equal(resolveDocPath(base, 'https://ejemplo.test/x.md'), null);
});

test('schemeOf detecta esquemas aunque estén codificados', () => {
  assert.equal(schemeOf('javascript:alert(1)'), 'javascript');
  assert.equal(schemeOf('  JAVASCRIPT:alert(1)'), 'javascript');
  assert.equal(schemeOf('java\tscript:alert(1)'), 'javascript');
  assert.equal(schemeOf('data:text/html,x'), 'data');
  assert.equal(schemeOf('https://ejemplo.test'), 'https');
  assert.equal(schemeOf('RECURSOS.md'), null);
});

test('los anchors Unicode siguen el estilo de GitHub', () => {
  assert.equal(slugify('Cómo estudiar'), 'cómo-estudiar');
  assert.equal(slugify('Sesiones y cierre con evidencia'), 'sesiones-y-cierre-con-evidencia');
  assert.equal(slugify('Registro de evidencia semanal'), 'registro-de-evidencia-semanal');
  assert.equal(slugify('APIs y lógica de negocio'), 'apis-y-lógica-de-negocio');
  assert.equal(slugify('HTTP y navegador'), 'http-y-navegador');
  assert.equal(slugify('Uso de Academy y herramientas'), 'uso-de-academy-y-herramientas');
  assert.equal(slugify('Semana 1 — HTTP, navegador y alcance seguro'), 'semana-1--http-navegador-y-alcance-seguro');
});

test('los anchors internos del repo existen de verdad', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/ITINERARIO.md', docKey: 'itinerario' });
  const { html } = renderMarkdown(ITINERARIO, ctx);

  const destinos = new Map();
  for (const doc of DOCS) {
    const fuente = readFileSync(`${RAIZ}${doc.path}`, 'utf8');
    destinos.set(
      doc.path,
      new Set(parseMarkdown(fuente).filter((b) => b.type === 'heading').map((b) => slugify(b.text))),
    );
  }

  for (const coincidencia of html.matchAll(/href="#\/doc\?path=([^"&]+)(?:&amp;anchor=([^"&]+))?"/g)) {
    const path = decodeURIComponent(coincidencia[1]);
    const anchor = coincidencia[2] ? decodeURIComponent(coincidencia[2]) : '';
    assert.ok(destinos.has(path), `el destino ${path} debería ser uno de los 4 documentos`);
    if (anchor) {
      assert.ok(destinos.get(path).has(anchor), `el anchor #${anchor} debería existir en ${path}`);
    }
  }
});

test('las tablas, listas, negritas y código se renderizan sin perder contenido', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/README.md', docKey: 'guia' });
  const { html } = renderMarkdown(GUIA, ctx);

  assert.ok(html.includes('<table class="md-tabla">'));
  assert.ok(html.includes('<strong>'));
  assert.ok(html.includes('<ul class="md-lista">'));
  assert.ok(html.includes('<code>'));
  assert.ok(html.includes('Sesiones y cierre con evidencia'));
  assert.ok(html.includes('1.4 — Seguridad Aplicada'));
});

test('los recursos conservan enlaces externos y theory/practica', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/RECURSOS.md', docKey: 'recursos' });
  const { html } = renderMarkdown(RECURSOS, ctx);

  assert.ok(html.includes('<ul class="md-lista">'));
  assert.ok(html.includes('MDN HTTP overview'));
  assert.ok(html.includes('portswigger.net/web-security/learning-paths'));
  assert.ok(html.includes('<code>'));
});

test('los enlaces externos se abren en otra pestaña con rel seguro', () => {
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/RECURSOS.md', docKey: 'recursos' });
  const { html } = renderMarkdown(RECURSOS, ctx);
  const externos = [...html.matchAll(/<a class="enlace-externo"[^>]*>/g)].map((m) => m[0]);

  assert.ok(externos.length > 5);
  for (const externo of externos) {
    assert.ok(externo.includes('target="_blank"'));
    assert.ok(externo.includes('rel="noopener noreferrer"'));
  }
});

test('las listas anidadas (ordenadas y no ordenadas) se renderizan', () => {
  const ctx = createContext({ docPath: 'x.md', docKey: 'x' });
  const fuente = ['1. Primero:', '   - bullet A', '   - bullet B', '2. Segundo'].join('\n');
  const { html } = renderMarkdown(fuente, ctx);

  assert.ok(html.includes('<ol class="md-lista">'));
  assert.ok(html.includes('<ul class="md-lista">'));
  assert.ok(html.includes('bullet A'));
  assert.ok(html.includes('bullet B'));
  assert.ok(!html.includes('undefined'), 'no debe quedar «undefined» en el HTML');
});

test('un documento real con lista anidada se renderiza sin romperse', () => {
  const ruta = 'Etapa 2 — Fundamentos/2.8 — Git Avanzado y Modelo de Objetos.md';
  const fuente = readFileSync(`${RAIZ}${ruta}`, 'utf8');
  const { html } = renderMarkdown(fuente, createContext({ docPath: ruta, docKey: 'git' }));

  assert.ok(!html.includes('undefined'), 'no debe quedar «undefined» en el HTML');
  assert.ok(html.includes('<ol class="md-lista">'));
  assert.ok(html.includes('<ul class="md-lista">'));
  assert.ok(html.includes('Reflog'));
  assert.ok(html.includes('Bisect'));
});

test('se renderizan todos los documentos locales referenciados por los 4 .md', () => {
  const fuentes = {
    'ITINERARIO.md': ITINERARIO,
    'README.md': GUIA,
    'RECURSOS.md': RECURSOS,
    'PROMPTS.md': PROMPTS,
  };

  const destinos = new Set();
  for (const [nombre, fuente] of Object.entries(fuentes)) {
    const ctx = createContext({ docPath: `Especializacioes/AppSec/${nombre}`, docKey: 'x' });
    const html = renderBlocks(parseMarkdown(fuente), ctx);
    for (const coincidencia of html.matchAll(/data-doc-path="([^"]+)"/g)) {
      destinos.add(coincidencia[1]);
    }
  }

  assert.ok(destinos.size >= 10, `se esperaban varios destinos, hay ${destinos.size}`);

  for (const destino of destinos) {
    assert.ok(existsSync(`${RAIZ}${destino}`), `${destino} debería existir en el repo`);
    const ctx = createContext({ docPath: destino, docKey: 'doc' });
    const html = renderBlocks(parseMarkdown(readFileSync(`${RAIZ}${destino}`, 'utf8')), ctx);
    assert.ok(!/undefined/.test(html), `${destino} no debe renderizar «undefined»`);
    assert.ok(!/<script/i.test(html), `${destino} no debe inyectar HTML ejecutable`);
    assert.ok(html.length > 300, `${destino} debería renderizar contenido`);
  }
});

test('renderBlocks devuelve HTML escapado para un texto con ángulos y comillas', () => {
  const ctx = createContext({ docPath: 'x.md', docKey: 'x' });
  const bloques = parseMarkdown('Un valor < 5 y otro > 3 con "comillas" & ampersand.');
  const html = renderBlocks(bloques, ctx);
  assert.ok(html.includes('&lt; 5'));
  assert.ok(html.includes('&gt; 3'));
  assert.ok(html.includes('&amp;'));
  assert.ok(html.includes('&quot;'));
  assert.ok(!html.includes('< 5'));
});

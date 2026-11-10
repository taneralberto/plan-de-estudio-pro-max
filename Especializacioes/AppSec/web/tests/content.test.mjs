/**
 * content.test.mjs — parser y render contra el Markdown REAL del repositorio.
 *
 * No se copia ningún fragmento del itinerario en los tests de contrato: todo
 * se lee del disco. Los fixtures sintéticos solo sirven para fijar el formato
 * que el parser acepta y el que rechaza.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  DOCS,
  createContext,
  extractCodeBlocks,
  parseDuracion,
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

/**
 * Itinerario sintético con el formato de módulos. Sirve para fijar qué acepta
 * el parser (ids estables, duraciones estrictas) y qué rechaza.
 */
function itinerario({ modulos = [], cierre = true, titulo } = {}) {
  const partes = [`# ${titulo || `Itinerario AppSec — ${modulos.length} módulos`}`, ''];
  for (const modulo of modulos) {
    partes.push(`## Módulo ${modulo.numero} — ${modulo.titulo || 'Título del módulo'}`, '');
    if (modulo.campos !== false) {
      partes.push('**Objetivo verificable:** Objetivo del módulo.', '');
    }
    partes.push('| Actividad | Dedicación acumulada | Trabajo y evidencia |', '|---|---|---|');
    for (const fila of modulo.filas) {
      partes.push(`| ${fila.codigo} — ${fila.titulo} | ${fila.duracion} | ${fila.trabajo || 'Trabajo y evidencia.'} |`);
    }
    partes.push('');
    if (modulo.desarrollo !== false) {
      partes.push(`### M${modulo.numero}-A1 — Desarrollo de la actividad`, '');
      partes.push('- Objetivo de la actividad.', '');
      partes.push('```js', 'const prueba = true;', '```', '');
    }
  }
  if (cierre) {
    partes.push('## Cierre de la ruta', '', 'La ruta termina con un balance honesto.', '');
  }
  return partes.join('\n');
}

const MODULO_VALIDO = {
  numero: 1,
  filas: [
    { codigo: 'A1', titulo: 'Primera actividad', duracion: '3 h' },
    { codigo: 'A2', titulo: 'Segunda actividad', duracion: '3 h' },
    { codigo: 'A3', titulo: 'Tercera actividad', duracion: '3 h' },
  ],
};

test('el itinerario real tiene 20 módulos y 83 actividades', () => {
  const parseado = parseItinerario(ITINERARIO);

  assert.equal(parseado.modules.length, 20);
  assert.equal(parseado.schedule.modules, 20);
  assert.equal(parseado.schedule.activities, 83);
  assert.equal(parseado.schedule.totalHours, parseado.modules.reduce((suma, modulo) => suma + modulo.hours, 0));
});

test('cada módulo real tiene entre 3 y 5 actividades con los códigos A1…An', () => {
  const parseado = parseItinerario(ITINERARIO);

  for (const modulo of parseado.modules) {
    assert.ok(
      modulo.activities.length >= 3 && modulo.activities.length <= 5,
      `el módulo ${modulo.number} debe tener entre 3 y 5 actividades`,
    );
    const codigos = modulo.activities.map((actividad) => actividad.index).sort((a, b) => a - b);
    assert.deepEqual(
      codigos,
      modulo.activities.map((_, indice) => indice + 1),
      `el módulo ${modulo.number} debe tener los códigos A1…A${modulo.activities.length}`,
    );
    for (const actividad of modulo.activities) {
      assert.ok(actividad.hours > 0, 'toda actividad tiene dedicación positiva');
      assert.ok(actividad.titleText.length > 0, 'toda actividad tiene título');
      assert.ok(actividad.taskText.length > 0, 'toda actividad dice qué hay que hacer');
    }
  }
});

test('las horas se derivan del propio itinerario: 9 h por módulo y 180 h en total', () => {
  const parseado = parseItinerario(ITINERARIO);

  for (const modulo of parseado.modules) {
    const suma = modulo.activities.reduce((total, actividad) => total + actividad.hours, 0);
    assert.equal(suma, modulo.hours, `el módulo ${modulo.number} debe sumar sus actividades`);
    assert.equal(modulo.hours, 9, `el módulo ${modulo.number} debe sumar 9 h`);
  }

  const sumaDirecta = parseado.modules
    .flatMap((modulo) => modulo.activities)
    .reduce((total, actividad) => total + actividad.hours, 0);
  assert.equal(sumaDirecta, 180);
  assert.equal(parseado.schedule.totalHours, 180);
});

test('los identificadores de actividad siguen al código, no al título ni al orden', () => {
  const original = parseItinerario(itinerario({ modulos: [MODULO_VALIDO] }));
  assert.deepEqual(
    original.modules[0].activities.map((actividad) => actividad.id),
    ['module-1-a1', 'module-1-a2', 'module-1-a3'],
  );

  // Se editan los títulos y se mueve una fila: los ids siguen al código.
  const movido = itinerario({
    modulos: [
      {
        numero: 1,
        filas: [
          { codigo: 'A3', titulo: 'Tercera actividad', duracion: '3 h' },
          { codigo: 'A1', titulo: 'Primera actividad renombrada', duracion: '3 h' },
          { codigo: 'A2', titulo: 'Segunda actividad', duracion: '3 h' },
        ],
      },
    ],
  });
  const parseado = parseItinerario(movido);
  const porCodigo = Object.fromEntries(
    parseado.modules[0].activities.map((actividad) => [actividad.code, actividad]),
  );

  assert.equal(porCodigo.A1.id, 'module-1-a1');
  assert.equal(porCodigo.A1.titleText, 'Primera actividad renombrada');
  assert.equal(porCodigo.A3.id, 'module-1-a3');

  const ids = parseado.modules.flatMap((modulo) => modulo.activities.map((actividad) => actividad.id));
  assert.equal(new Set(ids).size, ids.length, 'no debe haber identificadores duplicados');
});

test('los identificadores reales son estables y no dependen del índice global', () => {
  const parseado = parseItinerario(ITINERARIO);
  const ids = parseado.modules.flatMap((modulo) => modulo.activities.map((actividad) => actividad.id));

  assert.ok(ids.includes('module-1-a1'));
  assert.ok(ids.includes('module-3-a2'));
  assert.ok(ids.includes('module-17-a4'));
  assert.ok(ids.includes('module-20-a4'));
  assert.equal(new Set(ids).size, ids.length, 'no debe haber identificadores duplicados');
});

test('las duraciones son estrictas: horas o minutos, coma decimal, siempre positivas', () => {
  assert.equal(parseDuracion('2 h'), 2);
  assert.equal(parseDuracion('2h'), 2);
  assert.equal(parseDuracion('1,5 h'), 1.5);
  assert.equal(parseDuracion('1.5 h'), 1.5);
  assert.equal(parseDuracion('90 min'), 1.5);
  assert.equal(parseDuracion('45 minutos'), 0.75);
  assert.equal(parseDuracion('2 horas'), 2);

  for (const basura of ['0 h', '-1 h', '2', 'h', 'abc', '2,5,5 h', '', '   ', '2 h extra', 'NaN h', '1e3 h']) {
    assert.equal(parseDuracion(basura), null, `«${basura}» no es una duración válida`);
  }
});

test('el parser rechaza estructuras que no encajan', () => {
  const base = itinerario({ modulos: [MODULO_VALIDO] });

  // Duración inválida.
  assert.throws(
    () => parseItinerario(itinerario({ modulos: [{ ...MODULO_VALIDO, filas: [{ ...MODULO_VALIDO.filas[0], duracion: '0 h' }, MODULO_VALIDO.filas[1], MODULO_VALIDO.filas[2]] }] })),
    /duración no interpretable/,
  );

  // Código de actividad repetido.
  assert.throws(
    () => parseItinerario(itinerario({ modulos: [{ ...MODULO_VALIDO, filas: [MODULO_VALIDO.filas[0], { ...MODULO_VALIDO.filas[1], codigo: 'A1' }, MODULO_VALIDO.filas[2]] }] })),
    /repite el código/,
  );

  // Actividad sin código.
  assert.throws(
    () => parseItinerario(itinerario({ modulos: [{ ...MODULO_VALIDO, filas: [{ codigo: 'X1', titulo: 'Sin código', duracion: '3 h' }, MODULO_VALIDO.filas[1], MODULO_VALIDO.filas[2]] }] })),
    /sin código/,
  );

  // Códigos con huecos.
  assert.throws(
    () =>
      parseItinerario(
        itinerario({
          modulos: [
            {
              ...MODULO_VALIDO,
              filas: [
                { ...MODULO_VALIDO.filas[0], codigo: 'A1' },
                { ...MODULO_VALIDO.filas[1], codigo: 'A3' },
                { ...MODULO_VALIDO.filas[2], codigo: 'A4' },
              ],
            },
          ],
        }),
      ),
    /no tiene los códigos/,
  );

  // Solo dos actividades.
  assert.throws(
    () => parseItinerario(itinerario({ modulos: [{ ...MODULO_VALIDO, filas: MODULO_VALIDO.filas.slice(0, 2) }] })),
    /2 actividades en lugar de 3 a 5/,
  );

  // Tabla con columnas de más.
  assert.throws(
    () =>
      parseItinerario(
        [
          '# Itinerario AppSec — 1 módulos',
          '',
          '## Módulo 1 — Título',
          '',
          '| Actividad | Dedicación acumulada | Trabajo y evidencia | Extra |',
          '|---|---|---|---|',
          '| A1 — Una | 3 h | Trabajo | Más |',
          '| A2 — Dos | 3 h | Trabajo | Más |',
          '| A3 — Tres | 3 h | Trabajo | Más |',
          '',
          '## Cierre de la ruta',
          '',
          'Cierre.',
          '',
        ].join('\n'),
      ),
    /4 columnas en lugar de 3/,
  );

  // Tabla con columnas que no son las esperadas.
  assert.throws(
    () =>
      parseItinerario(
        [
          '# Itinerario AppSec — 1 módulos',
          '',
          '## Módulo 1 — Título',
          '',
          '| Actividad | Duración | Trabajo y evidencia |',
          '|---|---|---|',
          '| A1 — Una | 3 h | Trabajo |',
          '| A2 — Dos | 3 h | Trabajo |',
          '| A3 — Tres | 3 h | Trabajo |',
          '',
          '## Cierre de la ruta',
          '',
          'Cierre.',
          '',
        ].join('\n'),
      ),
    /no tiene la columna «dedicacion acumulada»/,
  );

  // Dos tablas de actividades en el mismo módulo.
  assert.throws(
    () =>
      parseItinerario(
        [
          '# Itinerario AppSec — 1 módulos',
          '',
          '## Módulo 1 — Título',
          '',
          '| Actividad | Dedicación acumulada | Trabajo y evidencia |',
          '|---|---|---|',
          '| A1 — Una | 3 h | Trabajo |',
          '| A2 — Dos | 3 h | Trabajo |',
          '| A3 — Tres | 3 h | Trabajo |',
          '',
          '| Actividad | Dedicación acumulada | Trabajo y evidencia |',
          '|---|---|---|',
          '| A4 — Cuatro | 3 h | Trabajo |',
          '| A5 — Cinco | 3 h | Trabajo |',
          '| A6 — Seis | 3 h | Trabajo |',
          '',
          '## Cierre de la ruta',
          '',
          'Cierre.',
          '',
        ].join('\n'),
      ),
    /no tiene una tabla de actividades única/,
  );

  // Numeración de módulos discontinua.
  assert.throws(
    () =>
      parseItinerario(
        itinerario({
          titulo: 'Itinerario AppSec — 2 módulos',
          modulos: [{ ...MODULO_VALIDO, numero: 1 }, { ...MODULO_VALIDO, numero: 3 }],
        }),
      ),
    /Numeración de módulos discontinua/,
  );

  // El título declara más módulos de los que hay.
  assert.throws(
    () => parseItinerario(itinerario({ titulo: 'Itinerario AppSec — 7 módulos', modulos: [MODULO_VALIDO] })),
    /El título declara 7 módulos/,
  );

  // Falta el cierre explícito.
  assert.throws(
    () => parseItinerario(itinerario({ modulos: [MODULO_VALIDO], cierre: false })),
    /Cierre de la ruta/,
  );

  // Sin ningún módulo.
  assert.throws(
    () => parseItinerario('# Itinerario AppSec — 0 módulos\n\n## Cierre de la ruta\n\nCierre.\n'),
    /no contiene ningún módulo/,
  );

  assert.ok(base.length > 0);
});

test('el cierre es explícito: «## Cierre de la ruta» separa el final del documento', () => {
  const parseado = parseItinerario(ITINERARIO);

  assert.ok(parseado.closing.length > 0, 'debe conservar el cierre');
  assert.equal(parseado.closing[0].type, 'heading');
  assert.equal(parseado.closing[0].text, 'Cierre de la ruta');

  // El cierre no se deduce del final del módulo 20.
  const ultimo = parseado.modules[parseado.modules.length - 1];
  const bloquesCierre = parseado.closing.slice(1);
  for (const bloque of bloquesCierre) {
    assert.ok(
      !ultimo.items.some((item) => item.kind === 'block' && item.block === bloque),
      'el cierre no debe quedar dentro del último módulo',
    );
  }
  assert.ok(
    ultimo.items.some((item) => item.kind === 'block' && item.block.type === 'heading' && /^M\d+-A\d+/.test(item.block.text)),
    'el desarrollo de las actividades sigue dentro del módulo',
  );
});

test('cada módulo conserva objetivo, busca, recursos, prerrequisitos, entregable y recuperación', () => {
  const parseado = parseItinerario(ITINERARIO);
  for (const modulo of parseado.modules) {
    const claves = modulo.items.filter((item) => item.kind === 'field').map((item) => item.key);
    assert.deepEqual(
      claves,
      ['objetivo', 'busca', 'recursos', 'prerrequisitos', 'entregable', 'recuperacion'],
      `el módulo ${modulo.number} debe conservar sus campos`,
    );
  }
});

test('el desarrollo de la actividad y sus bloques de código se renderizan junto a la tabla', () => {
  const parseado = parseItinerario(ITINERARIO);
  const ctx = createContext({ docPath: 'Especializacioes/AppSec/ITINERARIO.md', docKey: 'itinerario' });

  const primero = parseado.modules[0];
  const desarrollo = primero.items.filter((item) => item.kind === 'block');
  assert.ok(desarrollo.length > 0, 'el módulo debe traer el desarrollo de sus actividades');

  const html = desarrollo.map((item) => renderBlocks([item.block], ctx)).join('\n');
  assert.ok(html.includes('data-anchor="m1-a1--'), 'el desarrollo debe conservar su ancla');
  assert.ok(html.includes('<h3'), 'el desarrollo se renderiza como encabezado');
  assert.ok(desarrollo.some((item) => item.block.type === 'code'), 'el módulo conserva sus bloques de código');
  assert.ok(html.includes('md-codigo'), 'los bloques de código se renderizan con su botón de copiar');
});

test('PROMPTS.md tiene 8 bloques de prompt y el texto se conserva exactamente', () => {
  const bloques = extractCodeBlocks(PROMPTS);
  assert.equal(bloques.length, 8);
  assert.ok(bloques.every((bloque) => bloque.lang === 'text'));

  const fuente = readFileSync(`${APPSEC}PROMPTS.md`, 'utf8');
  const original = fuente.split('```text')[1].split('```')[0].replace(/^\n/, '').replace(/\n$/, '');
  assert.equal(bloques[0].text, original);
});

test('el render escapa el texto y bloquea esquemas peligrosos', () => {
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
  assert.equal(slugify('Módulo 1 — HTTP, navegador y alcance seguro'), 'módulo-1--http-navegador-y-alcance-seguro');
  assert.equal(slugify('M1-A1 — Alcance del laboratorio y ejemplo de autorización'), 'm1-a1--alcance-del-laboratorio-y-ejemplo-de-autorización');
  assert.equal(slugify('Cierre de la ruta'), 'cierre-de-la-ruta');
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
  assert.ok(html.includes('Registro de evidencia por módulo y actividad'));
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

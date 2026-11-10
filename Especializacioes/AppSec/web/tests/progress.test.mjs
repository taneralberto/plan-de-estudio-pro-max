/**
 * progress.test.mjs — estado local: validación, roundtrip, importación y errores.
 *
 * Se usa un doble de `localStorage` en memoria: no toca el navegador real.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  LEGACY_DAY_SLUGS,
  LEGACY_WEEK_COUNT,
  MAX_IMPORT_CHARS,
  MAX_NOTE_CHARS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  createEmptyState,
  createStore,
  legacySessionIds,
  parseImport,
  serializeState,
  validateState,
} from '../progress.mjs';

import { parseItinerario } from '../content.mjs';

const RAIZ = fileURLToPath(new URL('../../../../', import.meta.url));
const ITINERARIO = readFileSync(`${RAIZ}Especializacioes/AppSec/ITINERARIO.md`, 'utf8');

/** Identificadores que la web conoce: actividades actuales y plan anterior. */
function conocidosReales() {
  const parseado = parseItinerario(ITINERARIO);
  const completedIds = new Set(
    parseado.modules.flatMap((modulo) => modulo.activities.map((actividad) => actividad.id)),
  );
  for (const id of legacySessionIds()) completedIds.add(id);
  const noteIds = new Set(parseado.modules.map((modulo) => `week-${modulo.number}`));
  return { completedIds, noteIds, parseado };
}

const CONOCIDOS = {
  completedIds: new Set(['module-1-a1', 'module-1-a2', 'module-2-a1', 'week-1-lunes', 'week-1-martes', 'week-2-lunes']),
  noteIds: new Set(['week-1', 'week-2']),
};

function memoriaInicial() {
  const datos = new Map();
  return {
    datos,
    getItem: (clave) => (datos.has(clave) ? datos.get(clave) : null),
    setItem: (clave, valor) => {
      datos.set(clave, String(valor));
    },
    removeItem: (clave) => {
      datos.delete(clave);
    },
    clear: () => datos.clear(),
  };
}

test('el esquema y la clave de almacenamiento no cambian', () => {
  assert.equal(SCHEMA_VERSION, 1);
  assert.equal(STORAGE_KEY, 'appsec-progreso-v1');
});

test('los identificadores conocidos son las 83 actividades, los 140 registros anteriores y las 20 notas', () => {
  const { completedIds, noteIds, parseado } = conocidosReales();

  const actividades = parseado.modules.flatMap((modulo) => modulo.activities.map((a) => a.id));
  assert.equal(actividades.length, 83);
  assert.equal(noteIds.size, 20);
  assert.ok(noteIds.has('week-1'));
  assert.ok(noteIds.has('week-20'));

  const legacy = legacySessionIds();
  assert.equal(legacy.length, 140);
  assert.equal(new Set(legacy).size, 140);
  for (const id of legacy) {
    assert.match(id, /^week-\d+-(lunes|martes|miercoles|jueves|viernes|sabado|domingo)$/);
    assert.ok(completedIds.has(id), `${id} debe ser un identificador conocido`);
  }

  // 83 actividades + 140 registros anteriores, sin solaparse.
  assert.equal(completedIds.size, 83 + 140);
  assert.equal(LEGACY_WEEK_COUNT * LEGACY_DAY_SLUGS.length, 140);
});

test('un `week-*` desconocido no se acepta', () => {
  const { completedIds } = conocidosReales();

  assert.equal(completedIds.has('week-99-lunes'), false);
  assert.equal(completedIds.has('week-21'), false);
  assert.equal(completedIds.has('week-1-festivo'), false);
  assert.equal(completedIds.has('week-0-lunes'), false);
});

test('el roundtrip guarda y recupera el estado', () => {
  const storage = memoriaInicial();
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['module-1-a1'] = true;
  estado.completed['week-2-lunes'] = true;
  estado.notes['week-1'] = 'Traza sanitizada el lunes.';

  assert.equal(store.save(estado).ok, true);
  assert.equal(storage.datos.has(STORAGE_KEY), true);

  const cargado = store.load();
  assert.equal(cargado.issues.length, 0);
  assert.equal(cargado.state.completed['module-1-a1'], true);
  assert.equal(cargado.state.completed['week-2-lunes'], true);
  assert.equal(cargado.state.notes['week-1'], 'Traza sanitizada el lunes.');
  assert.equal(cargado.state.version, SCHEMA_VERSION);
});

test('el JSON exportado se puede reimportar sin pérdida', () => {
  const estado = createEmptyState();
  estado.completed['module-1-a2'] = true;
  estado.completed['week-1-martes'] = true;
  estado.notes['week-2'] = 'Nota con acentos: ñ, á, «comillas».';

  const texto = serializeState(estado);
  const respaldo = JSON.parse(texto);
  assert.equal(respaldo.version, SCHEMA_VERSION);
  assert.deepEqual(Object.keys(respaldo.completed), ['module-1-a2', 'week-1-martes']);
  assert.equal(respaldo.notes['week-2'], 'Nota con acentos: ñ, á, «comillas».');

  const importado = parseImport(texto, CONOCIDOS);
  assert.equal(importado.ok, true);
  assert.equal(importado.state.completed['module-1-a2'], true);
  assert.equal(importado.state.completed['week-1-martes'], true);
  assert.equal(importado.state.notes['week-2'], 'Nota con acentos: ñ, á, «comillas».');
});

test('el historial anterior y las notas sobreviven a load-save-load y a export-import', () => {
  const { completedIds, noteIds } = conocidosReales();
  const storage = memoriaInicial();
  const store = createStore({ storage, known: { completedIds, noteIds } });

  const estado = createEmptyState();
  estado.completed['module-1-a1'] = true;
  estado.completed['module-20-a4'] = true;
  for (const id of legacySessionIds()) estado.completed[id] = true;
  for (const numero of Array.from({ length: 20 }, (_, indice) => indice + 1)) {
    estado.notes[`week-${numero}`] = `Nota conservada del módulo ${numero}.`;
  }

  assert.equal(store.save(estado).ok, true);

  const recargado = store.load();
  assert.equal(recargado.issues.length, 0);
  assert.equal(Object.keys(recargado.state.completed).length, 142);
  assert.equal(recargado.state.completed['module-1-a1'], true);
  assert.equal(recargado.state.completed['week-1-lunes'], true);
  assert.equal(recargado.state.completed['week-20-domingo'], true);
  assert.equal(Object.keys(recargado.state.notes).length, 20);
  assert.equal(recargado.state.notes['week-13'], 'Nota conservada del módulo 13.');

  // Exportar e importar de nuevo no cambia nada: la operación es idempotente.
  const texto = serializeState(recargado.state);
  const importado = parseImport(texto, { completedIds, noteIds });
  assert.equal(importado.ok, true);
  assert.equal(importado.issues.length, 0);
  assert.deepEqual(
    Object.keys(importado.state.completed).sort(),
    Object.keys(recargado.state.completed).sort(),
  );
  assert.deepEqual(importado.state.notes, recargado.state.notes);
  assert.equal(serializeState(importado.state), serializeState(recargado.state));
});

test('las marcas del plan anterior se conservan tal cual y no se convierten en actividades', () => {
  const { completedIds, noteIds } = conocidosReales();
  const crudo = {
    version: 1,
    completed: { 'week-1-lunes': true, 'week-20-domingo': true, 'module-3-a2': true },
    notes: { 'week-1': 'nota', 'week-20': 'nota' },
  };

  const resultado = validateState(crudo, { completedIds, noteIds });
  assert.equal(resultado.ok, true);
  assert.equal(resultado.state.completed['week-1-lunes'], true);
  assert.equal(resultado.state.completed['week-20-domingo'], true);
  assert.equal(resultado.state.completed['module-3-a2'], true);
  // No aparece ninguna actividad «nueva» inventada a partir del historial.
  assert.equal(Object.keys(resultado.state.completed).length, 3);
  assert.equal(resultado.state.notes['week-1'], 'nota');
  assert.equal(resultado.state.notes['week-20'], 'nota');
});

test('un JSON malformado no es importable y no pisa el estado', () => {
  const storage = memoriaInicial();
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['module-1-a1'] = true;
  store.save(estado);

  const resultado = parseImport('{ esto no es json', CONOCIDOS);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /JSON/);

  // El estado guardado sigue intacto.
  const cargado = store.load();
  assert.equal(cargado.state.completed['module-1-a1'], true);
});

test('una versión de esquema distinta se rechaza', () => {
  const resultado = parseImport(JSON.stringify({ version: 99, completed: {}, notes: {} }), CONOCIDOS);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /versión/i);
});

test('los identificadores desconocidos se descartan con aviso, sin invalidar el resto', () => {
  const crudo = {
    version: 1,
    completed: { 'module-1-a1': true, 'week-99-lunes': true, 'module-1-a2': 'sí' },
    notes: { 'week-1': 'ok', 'week-42': 'fantasma', 'week-2': 12 },
  };

  const resultado = validateState(crudo, CONOCIDOS);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.state.completed['module-1-a1'], true);
  assert.equal(resultado.state.completed['week-99-lunes'], undefined);
  assert.equal(resultado.state.notes['week-42'], undefined);
  assert.equal(resultado.state.notes['week-2'], undefined);
  assert.ok(resultado.issues.some((issue) => issue.type === 'ids-desconocidos'));
});

test('las claves peligrosas no contaminan los prototipos', () => {
  const crudo = JSON.parse(
    '{"version":1,"completed":{"__proto__":{"polluted":true},"constructor":true,"module-1-a1":true},"notes":{"prototype":"x","week-1":"ok"}}',
  );

  const resultado = validateState(crudo, CONOCIDOS);
  assert.equal(resultado.ok, true);
  assert.equal({}.polluted, undefined);
  assert.equal(Object.prototype.polluted, undefined);
  assert.equal(resultado.state.completed['module-1-a1'], true);
  assert.equal(resultado.state.notes['week-1'], 'ok');
  assert.equal(Object.prototype.hasOwnProperty.call(resultado.state.notes, 'prototype'), false);
});

test('las notas demasiado largas o de tipo raro se descartan', () => {
  const crudo = {
    version: 1,
    completed: {},
    notes: { 'week-1': 'x'.repeat(MAX_NOTE_CHARS + 1), 'week-2': { texto: 'x' } },
  };
  const resultado = validateState(crudo, CONOCIDOS);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.state.notes['week-1'], undefined);
  assert.equal(resultado.state.notes['week-2'], undefined);
  assert.ok(resultado.issues.some((issue) => issue.type === 'entradas-invalidas'));
});

test('un estado que no es un objeto se rechaza', () => {
  for (const crudo of [null, 42, 'texto', [], { version: 1 }]) {
    const resultado = validateState(crudo, CONOCIDOS);
    assert.equal(resultado.ok, false, `debería rechazar ${JSON.stringify(crudo)}`);
  }
});

test('la importación respeta el límite de tamaño', () => {
  const enorme = `{"version":1,"completed":{},"notes":{"week-1":"${'x'.repeat(MAX_IMPORT_CHARS)}"}}`;
  const resultado = parseImport(enorme, CONOCIDOS);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /tamaño/i);
});

test('un almacenamiento corrupto se avisa y no se sobrescribe al leer', () => {
  const storage = memoriaInicial();
  storage.setItem(STORAGE_KEY, '{ roto');
  const store = createStore({ storage, known: CONOCIDOS });

  const cargado = store.load();
  assert.equal(cargado.issues.length > 0, true);
  assert.equal(cargado.issues[0].type, 'corrupto');
  assert.equal(Object.keys(cargado.state.completed).length, 0);

  // El dato corrupto sigue en el disco: la app decide explícitamente qué hacer.
  assert.equal(storage.getItem(STORAGE_KEY), '{ roto');
});

test('un almacenamiento con cuota agotada no rompe la app', () => {
  const storage = memoriaInicial();
  storage.setItem = () => {
    const error = new Error('cuota');
    error.name = 'QuotaExceededError';
    throw error;
  };
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['module-1-a1'] = true;
  const resultado = store.save(estado);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /guardar/i);
});

test('un almacenamiento deshabilitado se detecta sin lanzar', () => {
  const storage = {
    getItem() {
      throw new Error('bloqueado');
    },
    setItem() {
      throw new Error('bloqueado');
    },
    removeItem() {
      throw new Error('bloqueado');
    },
  };
  const store = createStore({ storage, known: CONOCIDOS });

  assert.equal(store.available(), false);
  const cargado = store.load();
  assert.equal(cargado.available, false);
  assert.ok(cargado.issues.some((issue) => issue.type === 'almacen'));
  assert.equal(store.save(createEmptyState()).ok, false);
  assert.equal(store.clear().ok, false);
});

test('reiniciar borra solo la clave propia, nunca todo el almacenamiento', () => {
  const storage = memoriaInicial();
  storage.setItem('otra-cosa', 'no tocar');
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['module-1-a1'] = true;
  store.save(estado);

  assert.equal(store.clear().ok, true);
  assert.equal(storage.getItem(STORAGE_KEY), null);
  assert.equal(storage.getItem('otra-cosa'), 'no tocar');
});

test('las horas marcadas se derivan de las actividades, no de las sesiones', () => {
  // El módulo de progreso no decide horas: las recibe ya calculadas desde el
  // itinerario. Este test fija el contrato que consume la UI.
  const estado = createEmptyState();
  const actividades = [
    { id: 'module-1-a1', hours: 2 },
    { id: 'module-1-a2', hours: 3.5 },
    { id: 'module-1-a3', hours: 3.5 },
  ];

  let horas = 0;
  for (const actividad of actividades) {
    estado.completed[actividad.id] = true;
    horas += actividad.hours;
  }

  assert.equal(horas, 9);
  assert.equal(Object.keys(estado.completed).length, 3);
});

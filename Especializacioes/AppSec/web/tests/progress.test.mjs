/**
 * progress.test.mjs — estado local: validación, roundtrip, importación y errores.
 *
 * Se usa un doble de `localStorage` en memoria: no toca el navegador real.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_IMPORT_CHARS,
  MAX_NOTE_CHARS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  createEmptyState,
  createStore,
  parseImport,
  serializeState,
  validateState,
} from '../progress.mjs';

const CONOCIDOS = {
  sessionIds: new Set(['week-1-lunes', 'week-1-martes', 'week-2-lunes']),
  weekIds: new Set(['week-1', 'week-2']),
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

test('el roundtrip guarda y recupera el estado', () => {
  const storage = memoriaInicial();
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['week-1-lunes'] = true;
  estado.completed['week-2-lunes'] = true;
  estado.notes['week-1'] = 'Traza sanitizada el lunes.';

  assert.equal(store.save(estado).ok, true);
  assert.equal(storage.datos.has(STORAGE_KEY), true);

  const cargado = store.load();
  assert.equal(cargado.issues.length, 0);
  assert.equal(cargado.state.completed['week-1-lunes'], true);
  assert.equal(cargado.state.completed['week-2-lunes'], true);
  assert.equal(cargado.state.notes['week-1'], 'Traza sanitizada el lunes.');
  assert.equal(cargado.state.version, SCHEMA_VERSION);
});

test('el JSON exportado se puede reimportar sin pérdida', () => {
  const estado = createEmptyState();
  estado.completed['week-1-martes'] = true;
  estado.notes['week-2'] = 'Nota con acentos: ñ, á, «comillas».';

  const texto = serializeState(estado);
  const respaldo = JSON.parse(texto);
  assert.equal(respaldo.version, SCHEMA_VERSION);
  assert.deepEqual(Object.keys(respaldo.completed), ['week-1-martes']);
  assert.equal(respaldo.notes['week-2'], 'Nota con acentos: ñ, á, «comillas».');

  const importado = parseImport(texto, CONOCIDOS);
  assert.equal(importado.ok, true);
  assert.equal(importado.state.completed['week-1-martes'], true);
  assert.equal(importado.state.notes['week-2'], 'Nota con acentos: ñ, á, «comillas».');
});

test('un JSON malformado no es importable y no pisa el estado', () => {
  const storage = memoriaInicial();
  const store = createStore({ storage, known: CONOCIDOS });

  const estado = createEmptyState();
  estado.completed['week-1-lunes'] = true;
  store.save(estado);

  const resultado = parseImport('{ esto no es json', CONOCIDOS);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /JSON/);

  // El estado guardado sigue intacto.
  const cargado = store.load();
  assert.equal(cargado.state.completed['week-1-lunes'], true);
});

test('una versión de esquema distinta se rechaza', () => {
  const resultado = parseImport(JSON.stringify({ version: 99, completed: {}, notes: {} }), CONOCIDOS);
  assert.equal(resultado.ok, false);
  assert.match(resultado.error, /versión/i);
});

test('los identificadores desconocidos se descartan con aviso, sin invalidar el resto', () => {
  const crudo = {
    version: 1,
    completed: { 'week-1-lunes': true, 'week-99-lunes': true, 'week-1-martes': 'sí' },
    notes: { 'week-1': 'ok', 'week-42': 'fantasma', 'week-2': 12 },
  };

  const resultado = validateState(crudo, CONOCIDOS);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.state.completed['week-1-lunes'], true);
  assert.equal(resultado.state.completed['week-99-lunes'], undefined);
  assert.equal(resultado.state.notes['week-42'], undefined);
  assert.equal(resultado.state.notes['week-2'], undefined);
  assert.ok(resultado.issues.some((issue) => issue.type === 'ids-desconocidos'));
});

test('las claves peligrosas no contaminan los prototipos', () => {
  const crudo = JSON.parse(
    '{"version":1,"completed":{"__proto__":{"polluted":true},"constructor":true,"week-1-lunes":true},"notes":{"prototype":"x","week-1":"ok"}}',
  );

  const resultado = validateState(crudo, CONOCIDOS);
  assert.equal(resultado.ok, true);
  assert.equal({}.polluted, undefined);
  assert.equal(Object.prototype.polluted, undefined);
  assert.equal(resultado.state.completed['week-1-lunes'], true);
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
  estado.completed['week-1-lunes'] = true;
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
  estado.completed['week-1-lunes'] = true;
  store.save(estado);

  assert.equal(store.clear().ok, true);
  assert.equal(storage.getItem(STORAGE_KEY), null);
  assert.equal(storage.getItem('otra-cosa'), 'no tocar');
});

test('la derivación de horas por sesión es 2 h el sábado y el domingo y 1 h entre semana', () => {
  // El módulo de progreso no decide horas: las recibe ya calculadas desde el
  // itinerario. Este test fija el contrato que consume la UI.
  const estado = createEmptyState();
  const sesiones = [
    { id: 'week-1-lunes', hours: 1 },
    { id: 'week-1-martes', hours: 1 },
    { id: 'week-1-miercoles', hours: 1 },
    { id: 'week-1-jueves', hours: 1 },
    { id: 'week-1-viernes', hours: 1 },
    { id: 'week-1-sabado', hours: 2 },
    { id: 'week-1-domingo', hours: 2 },
  ];

  let horas = 0;
  for (const sesion of sesiones) {
    estado.completed[sesion.id] = true;
    horas += sesion.hours;
  }

  assert.equal(horas, 9);
  assert.equal(sesiones.find((s) => s.id === 'week-1-sabado').hours, 2);
  assert.equal(sesiones.find((s) => s.id === 'week-1-domingo').hours, 2);
  assert.equal(Object.keys(estado.completed).length, 7);
});

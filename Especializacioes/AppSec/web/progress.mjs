/**
 * progress.mjs — estado local de estudio (overlay sobre el Markdown, sin escribirlo).
 *
 * Esquema canónico v1:
 *   { version: 1, completed: { "<id-actividad>": true }, notes: { "<id-modulo>": "texto" } }
 *
 * Reglas:
 * - La clave de `localStorage` es propia: al reiniciar solo se borra esa clave.
 * - Nada se escribe nunca en los `.md`.
 * - Todo lo que entra desde el disco (importación) o sale de localStorage se valida.
 * - `completed` guarda dos clases de marcas: las actividades de la ruta actual
 *   (`module-1-a1`) y los registros del plan anterior (`week-1-lunes`). Las
 *   últimas se conservan tal cual, pero no acreditan nada de la ruta actual.
 */

export const STORAGE_KEY = 'appsec-progreso-v1';
export const SCHEMA_VERSION = 1;
export const MAX_IMPORT_CHARS = 1024 * 1024;
export const MAX_NOTE_CHARS = 10000;
export const MAX_ENTRIES = 5000;

/** Registros del plan anterior: 20 semanas × 7 días = 140 marcas. */
export const LEGACY_WEEK_COUNT = 20;
export const LEGACY_DAY_SLUGS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

/**
 * Los 140 identificadores del plan anterior, exactos y ninguno más: no se
 * acepta cualquier `week-*` desconocido.
 */
export function legacySessionIds() {
  const ids = [];
  for (let semana = 1; semana <= LEGACY_WEEK_COUNT; semana += 1) {
    for (const dia of LEGACY_DAY_SLUGS) ids.push(`week-${semana}-${dia}`);
  }
  return ids;
}

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function createEmptyState() {
  return { version: SCHEMA_VERSION, completed: Object.create(null), notes: Object.create(null) };
}

export function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function safeKeys(object) {
  return Object.keys(object).filter((key) => !FORBIDDEN_KEYS.has(key));
}

/**
 * Valida un estado desconocido (importado o leído de disco).
 * Devuelve `{ ok, state, issues }`: `issues` recoge avisos y descartes puntuales;
 * un error de forma devuelve `ok: false` y no se usa ningún dato.
 *
 * `known` trae dos conjuntos: `completedIds` (actividades actuales y registros
 * del plan anterior) y `noteIds` (una nota por módulo).
 */
export function validateState(raw, known = {}) {
  const issues = [];
  const completedIds = known.completedIds instanceof Set ? known.completedIds : null;
  const noteIds = known.noteIds instanceof Set ? known.noteIds : null;

  if (!isPlainObject(raw)) {
    return { ok: false, state: null, issues: [{ type: 'invalido', message: 'El contenido no es un objeto de estado válido.' }] };
  }
  if (raw.version !== SCHEMA_VERSION) {
    return {
      ok: false,
      state: null,
      issues: [{
        type: 'version',
        message: `Versión de estado no soportada («${String(raw.version)}»); se esperaba ${SCHEMA_VERSION}.`,
      }],
    };
  }
  if (!isPlainObject(raw.completed) || !isPlainObject(raw.notes)) {
    return { ok: false, state: null, issues: [{ type: 'invalido', message: 'Faltan las secciones «completed» o «notes» del estado.' }] };
  }

  const state = createEmptyState();
  let unknownCompleted = 0;
  let unknownNotes = 0;
  let invalidCompleted = 0;
  let invalidNotes = 0;

  const completedKeys = safeKeys(raw.completed);
  if (completedKeys.length > MAX_ENTRIES) {
    return { ok: false, state: null, issues: [{ type: 'demasiado', message: 'El estado contiene demasiadas entradas.' }] };
  }
  for (const id of completedKeys) {
    const value = raw.completed[id];
    if (value !== true && value !== false) {
      invalidCompleted += 1;
      continue;
    }
    if (completedIds && !completedIds.has(id)) {
      unknownCompleted += 1;
      continue;
    }
    if (value === true) state.completed[id] = true;
  }

  const noteKeys = safeKeys(raw.notes);
  if (noteKeys.length > MAX_ENTRIES) {
    return { ok: false, state: null, issues: [{ type: 'demasiado', message: 'El estado contiene demasiadas notas.' }] };
  }
  for (const id of noteKeys) {
    const value = raw.notes[id];
    if (typeof value !== 'string') {
      invalidNotes += 1;
      continue;
    }
    if (value.length > MAX_NOTE_CHARS) {
      invalidNotes += 1;
      continue;
    }
    if (noteIds && !noteIds.has(id)) {
      unknownNotes += 1;
      continue;
    }
    if (value.trim()) state.notes[id] = value;
  }

  if (unknownCompleted) {
    issues.push({
      type: 'ids-desconocidos',
      message: `Se descartaron ${unknownCompleted} marcas que no son ni una actividad de la ruta ni un registro del plan anterior (el contenido cambió).`,
    });
  }
  if (unknownNotes) {
    issues.push({
      type: 'ids-desconocidos',
      message: `Se descartaron ${unknownNotes} notas de módulos que no existen en el itinerario.`,
    });
  }
  if (invalidCompleted || invalidNotes) {
    issues.push({
      type: 'entradas-invalidas',
      message: `Se descartaron ${invalidCompleted + invalidNotes} entradas con un formato no válido.`,
    });
  }

  return { ok: true, state, issues };
}

/** Serializa el estado a JSON de respaldo (estable y ordenado). */
export function serializeState(state) {
  const completed = {};
  for (const id of Object.keys(state.completed || {}).sort()) {
    if (state.completed[id] === true) completed[id] = true;
  }
  const notes = {};
  for (const id of Object.keys(state.notes || {}).sort()) {
    const value = state.notes[id];
    if (typeof value === 'string' && value.length) notes[id] = value;
  }
  return JSON.stringify(
    { app: 'appsec-web', version: SCHEMA_VERSION, completed, notes, exportedAt: new Date().toISOString() },
    null,
    2,
  );
}

/** Parsea y valida un JSON de respaldo. `ok:false` no debe tocar el progreso actual. */
export function parseImport(text, known = {}) {
  const content = String(text == null ? '' : text);
  if (!content.trim()) {
    return { ok: false, error: 'El archivo está vacío.' };
  }
  if (content.length > MAX_IMPORT_CHARS) {
    return { ok: false, error: 'El archivo supera el tamaño máximo admitido (1 MB).' };
  }
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return { ok: false, error: 'El archivo no contiene JSON válido.' };
  }
  const result = validateState(parsed, known);
  if (!result.ok) {
    const message = result.issues.map((issue) => issue.message).join(' ');
    return { ok: false, error: `Estado no válido: ${message}` };
  }
  return { ok: true, state: result.state, issues: result.issues };
}

/**
 * Acceso a `localStorage` con tolerancia a fallos: almacenamiento deshabilitado,
 * cuota agotada o datos corruptos.
 */
export function createStore({ storage, known = {} } = {}) {
  function available() {
    if (!storage) return false;
    try {
      const probe = `${STORAGE_KEY}:probe`;
      storage.setItem(probe, '1');
      storage.removeItem(probe);
      return true;
    } catch {
      return false;
    }
  }

  return {
    available,

    /** Lee el estado guardado. Nunca sobrescribe lo que hay en disco. */
    load() {
      if (!storage) {
        return { state: createEmptyState(), issues: [{ type: 'almacen', message: 'Este navegador no expone almacenamiento local.' }], available: false };
      }
      let text;
      try {
        text = storage.getItem(STORAGE_KEY);
      } catch {
        return {
          state: createEmptyState(),
          issues: [{ type: 'almacen', message: 'No se puede leer el almacenamiento local de este navegador.' }],
          available: false,
        };
      }
      if (text === null || text === '') {
        return { state: createEmptyState(), issues: [], available: true };
      }
      if (text.length > MAX_IMPORT_CHARS) {
        return {
          state: createEmptyState(),
          issues: [{ type: 'corrupto', message: 'El progreso guardado es demasiado grande y no se ha podido leer.' }],
          available: true,
        };
      }
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        return {
          state: createEmptyState(),
          issues: [{
            type: 'corrupto',
            message: 'El progreso guardado está dañado. No se ha sobrescrito: puedes exportarlo o borrarlo desde «Reiniciar».',
          }],
          available: true,
        };
      }
      const result = validateState(parsed, known);
      if (!result.ok) {
        return {
          state: createEmptyState(),
          issues: result.issues.map((issue) => ({ ...issue, type: 'corrupto' })),
          available: true,
        };
      }
      return { state: result.state, issues: result.issues, available: true };
    },

    /** Guarda el estado. Devuelve `{ ok:false }` si el navegador lo rechaza. */
    save(state) {
      if (!storage) return { ok: false, error: 'Este navegador no expone almacenamiento local.' };
      try {
        storage.setItem(STORAGE_KEY, serializeState(state));
        return { ok: true };
      } catch {
        return {
          ok: false,
          error: 'El navegador no ha podido guardar el progreso (almacenamiento deshabilitado o cuota agotada).',
        };
      }
    },

    /** Borra únicamente la clave propia (nunca `localStorage.clear()`). */
    clear() {
      if (!storage) return { ok: false, error: 'Este navegador no expone almacenamiento local.' };
      try {
        storage.removeItem(STORAGE_KEY);
        return { ok: true };
      } catch {
        return { ok: false, error: 'No se ha podido borrar el progreso guardado.' };
      }
    },
  };
}

/**
 * progress.mjs — estado local de estudio (overlay sobre el Markdown, sin escribirlo).
 *
 * Esquema canónico v1:
 *   { version: 1, completed: { "<id-sesion>": true }, notes: { "<id-semana>": "texto" } }
 *
 * Reglas:
 * - La clave de `localStorage` es propia: al reiniciar solo se borra esa clave.
 * - Nada se escribe nunca en los `.md`.
 * - Todo lo que entra desde el disco (importación) o sale de localStorage se valida.
 */

export const STORAGE_KEY = 'appsec-progreso-v1';
export const SCHEMA_VERSION = 1;
export const MAX_IMPORT_CHARS = 1024 * 1024;
export const MAX_NOTE_CHARS = 10000;
export const MAX_ENTRIES = 5000;

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
 */
export function validateState(raw, known = {}) {
  const issues = [];
  const sessionIds = known.sessionIds instanceof Set ? known.sessionIds : null;
  const weekIds = known.weekIds instanceof Set ? known.weekIds : null;

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
  let unknownSessions = 0;
  let unknownWeeks = 0;
  let invalidSessions = 0;
  let invalidNotes = 0;

  const completedKeys = safeKeys(raw.completed);
  if (completedKeys.length > MAX_ENTRIES) {
    return { ok: false, state: null, issues: [{ type: 'demasiado', message: 'El estado contiene demasiadas entradas.' }] };
  }
  for (const id of completedKeys) {
    const value = raw.completed[id];
    if (value !== true && value !== false) {
      invalidSessions += 1;
      continue;
    }
    if (sessionIds && !sessionIds.has(id)) {
      unknownSessions += 1;
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
    if (weekIds && !weekIds.has(id)) {
      unknownWeeks += 1;
      continue;
    }
    if (value.trim()) state.notes[id] = value;
  }

  if (unknownSessions) {
    issues.push({
      type: 'ids-desconocidos',
      message: `Se descartaron ${unknownSessions} marcas de sesiones que ya no existen en el itinerario (el contenido cambió).`,
    });
  }
  if (unknownWeeks) {
    issues.push({
      type: 'ids-desconocidos',
      message: `Se descartaron ${unknownWeeks} notas de semanas que ya no existen en el itinerario.`,
    });
  }
  if (invalidSessions || invalidNotes) {
    issues.push({
      type: 'entradas-invalidas',
      message: `Se descartaron ${invalidSessions + invalidNotes} entradas con un formato no válido.`,
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

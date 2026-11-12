/**
 * app.mjs — glue de la web AppSec.
 *
 * El Markdown del repo sigue siendo la fuente de verdad: la web lo lee con `fetch`
 * y nunca lo escribe. El progreso de estudio es un overlay local (localStorage).
 */

import {
  DOCS,
  createContext,
  docByPath,
  parseMarkdown,
  parseItinerario,
  renderBlocks,
  renderInlineNodes,
  slugify,
} from './content.mjs';

import {
  LEGACY_DAY_SLUGS,
  MAX_IMPORT_CHARS,
  MAX_NOTE_CHARS,
  createEmptyState,
  createStore,
  legacySessionIds,
  parseImport,
  serializeState,
} from './progress.mjs';

const $ = (id) => document.getElementById(id);

/**
 * Raíz del repositorio: la web vive en `Especializacioes/AppSec/web/`, así que
 * desde este archivo hay que subir tres niveles (`web/` -> `AppSec/` ->
 * `Especializacioes/` -> raíz). Las rutas de documento son relativas al repo,
 * nunca a la página.
 */
const RAIZ_REPO = new URL('../../../', import.meta.url);

const dom = {
  horario: $('horario'),
  avisos: $('avisos'),
  notasAlmacen: $('nota-almacen'),
  detalleAlmacen: $('detalle-almacen'),
  errorItinerario: $('error-itinerario'),
  historial: $('historial'),
  historialCuerpo: $('historial-cuerpo'),

  tituloItinerario: $('titulo-itinerario'),
  preambulo: $('preambulo-itinerario'),
  cierre: $('cierre-itinerario'),
  modulos: $('modulos'),
  buscar: $('buscar'),
  resultados: $('resultados'),
  btnContinuar: $('btn-continuar'),
  btnExpandir: $('btn-expandir'),
  btnContraer: $('btn-contraer'),

  cuerpoGuia: $('cuerpo-guia'),
  cuerpoRecursos: $('cuerpo-recursos'),
  cuerpoPrompts: $('cuerpo-prompts'),

  valorActividades: $('valor-actividades'),
  valorModulos: $('valor-modulos'),
  barraActividades: $('barra-actividades'),
  barraModulos: $('barra-modulos'),

  btnExportar: $('btn-exportar'),
  btnImportar: $('btn-importar'),
  inputImportar: $('input-importar'),
  btnReiniciar: $('btn-reiniciar'),

  lector: $('lector'),
  lectorTitulo: $('lector-titulo'),
  lectorRuta: $('lector-ruta'),
  lectorCuerpo: $('lector-cuerpo'),
  btnCerrarLector: $('btn-cerrar-lector'),

  confirmar: $('dialogo-confirmar'),
  confirmarTitulo: $('confirmar-titulo'),
  confirmarMensaje: $('confirmar-mensaje'),
  confirmarAceptar: $('confirmar-aceptar'),
  confirmarCancelar: $('confirmar-cancelar'),
};

const app = {
  vista: 'itinerario',
  modulos: [],
  contextoItinerario: null,
  cache: new Map(),
  progreso: createEmptyState(),
  store: null,
  almacenIniciado: false,
  listo: false,
  bloqueoAlmacen: false,
  filtro: { texto: '', modo: 'todas' },
};

/** Actividad actual por identificador (`module-1-a1`). */
const actividadIndex = new Map();

/** Etiquetas de los días del plan anterior, para el historial. */
const ETIQUETAS_DIA = {
  lunes: 'lunes',
  martes: 'martes',
  miercoles: 'miércoles',
  jueves: 'jueves',
  viernes: 'viernes',
  sabado: 'sábado',
  domingo: 'domingo',
};

/* -------------------------------------------------------------------------- */
/* Avisos                                                                     */
/* -------------------------------------------------------------------------- */

function mostrarAviso(tipo, texto, opciones = {}) {
  const caja = document.createElement('div');
  caja.className = `aviso aviso-${tipo}`;

  const parrafo = document.createElement('p');
  parrafo.className = 'aviso-texto';
  parrafo.textContent = texto;
  caja.appendChild(parrafo);

  if (opciones.accion) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'aviso-boton';
    boton.textContent = opciones.accion.texto;
    boton.addEventListener('click', () => {
      // El aviso NO se retira aquí: si la acción se cancela o falla, el
      // usuario debe seguir viendo el botón para reintentarlo. Quitarlo es
      // responsabilidad de quien resuelve (callback).
      opciones.accion.hacer();
    });
    caja.appendChild(boton);
  }

  if (!opciones.persistente) {
    const cerrar = document.createElement('button');
    cerrar.type = 'button';
    cerrar.className = 'aviso-boton';
    cerrar.textContent = 'Cerrar';
    cerrar.addEventListener('click', () => caja.remove());
    caja.appendChild(cerrar);
    window.setTimeout(() => caja.remove(), opciones.duracion || 8000);
  }

  dom.avisos.prepend(caja);
  return caja;
}

/* -------------------------------------------------------------------------- */
/* Confirmación en la propia aplicación (no `window.confirm`)                  */
/* -------------------------------------------------------------------------- */

function askConfirm({ titulo, mensaje, aceptar = 'Aceptar' }) {
  return new Promise((resolve) => {
    dom.confirmarTitulo.textContent = titulo;
    dom.confirmarMensaje.textContent = mensaje;
    dom.confirmarAceptar.textContent = aceptar;
    dom.confirmar.returnValue = 'cancelar';

    const alCerrar = () => {
      dom.confirmar.removeEventListener('close', alCerrar);
      resolve(dom.confirmar.returnValue === 'aceptar');
    };
    dom.confirmar.addEventListener('close', alCerrar);
    dom.confirmar.showModal();
  });
}

dom.confirmarAceptar.addEventListener('click', () => {
  dom.confirmar.returnValue = 'aceptar';
  dom.confirmar.close();
});
dom.confirmarCancelar.addEventListener('click', () => {
  dom.confirmar.returnValue = 'cancelar';
  dom.confirmar.close();
});

/* -------------------------------------------------------------------------- */
/* Carga de documentos                                                        */
/* -------------------------------------------------------------------------- */

/**
 * URL de un documento del repo. `path` es relativa a la raíz del repositorio,
 * así que se resuelve contra `RAIZ_REPO` y no contra la página. Cada segmento
 * se codifica; los `..` nunca pueden salir de la raíz del repo.
 */
function urlDeDoc(path) {
  const segmentos = [];
  for (const segmento of String(path).split('/')) {
    if (!segmento || segmento === '.') continue;
    if (segmento === '..') {
      segmentos.pop();
      continue;
    }
    segmentos.push(encodeURIComponent(segmento));
  }
  return new URL(segmentos.join('/'), RAIZ_REPO).href;
}

async function leerDoc(path) {
  if (app.cache.has(path)) return app.cache.get(path);
  const respuesta = await fetch(urlDeDoc(path), { cache: 'no-cache' });
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status} al pedir ${path}.`);
  }
  const texto = await respuesta.text();
  app.cache.set(path, texto);
  return texto;
}

function docKeyDe(path) {
  return `doc-${path.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
}

/* -------------------------------------------------------------------------- */
/* Itinerario                                                                 */
/* -------------------------------------------------------------------------- */

function textoDeInline(nodes) {
  return nodes
    .map((node) => {
      if (node.type === 'text' || node.type === 'code') return node.text;
      if (node.children) return textoDeInline(node.children);
      return '';
    })
    .join(' ');
}

function construirModulos(parseado) {
  const ctx = createContext({ docPath: DOCS[0].path, docKey: 'itinerario' });
  app.contextoItinerario = ctx;
  app.modulos = [];
  actividadIndex.clear();

  const fragmento = document.createDocumentFragment();

  for (const modulo of parseado.modules) {
    const details = document.createElement('details');
    details.className = 'modulo';
    details.id = `itinerario-${modulo.headingSlug}`;
    details.dataset.modulo = String(modulo.number);
    details.dataset.anchor = modulo.headingSlug;

    const summary = document.createElement('summary');
    summary.className = 'modulo-sum';

    const numero = document.createElement('span');
    numero.className = 'modulo-num';
    numero.textContent = `Módulo ${modulo.number}`;

    const titulo = document.createElement('span');
    titulo.className = 'modulo-titulo';
    titulo.textContent = modulo.title;

    const meta = document.createElement('span');
    meta.className = 'modulo-meta';

    const resumen = document.createElement('span');
    resumen.className = 'modulo-actividades';
    resumen.textContent = `${modulo.activities.length} actividades`;

    const progreso = document.createElement('span');
    progreso.className = 'modulo-progreso';
    progreso.dataset.progresoModulo = String(modulo.number);

    meta.append(resumen, progreso);
    summary.append(numero, titulo, meta);

    const cuerpo = document.createElement('div');
    cuerpo.className = 'modulo-cuerpo';

    const textosBusqueda = [`módulo ${modulo.number}`, String(modulo.number), modulo.title];
    let tablaActividades = null;

    for (const item of modulo.items) {
      if (item.kind === 'field') {
        textosBusqueda.push(item.label, textoDeInline(item.value));
        const bloque = document.createElement('div');
        bloque.className = 'campo-modulo';
        const etiqueta = document.createElement('p');
        etiqueta.className = 'campo-modulo-titulo';
        etiqueta.textContent = item.label;
        const valor = document.createElement('div');
        valor.innerHTML = renderInlineComoParrafo(item.value, ctx);
        bloque.append(etiqueta, valor);
        cuerpo.appendChild(bloque);
        continue;
      }

      if (item.kind === 'actividades') {
        tablaActividades = construirTablaActividades(modulo);
        cuerpo.appendChild(tablaActividades);
        for (const actividad of modulo.activities) {
          textosBusqueda.push(actividad.code, actividad.titleText, actividad.taskText);
        }
        continue;
      }

      // El desarrollo de la actividad (### Mx-Ay, listas y código) se renderiza
      // tal cual, junto a la tabla, y también es buscable.
      textosBusqueda.push(textoDeBloque(item.block));
      const bloque = document.createElement('div');
      bloque.className = 'campo-modulo desarrollo';
      bloque.innerHTML = renderBlocks([item.block], ctx);
      cuerpo.appendChild(bloque);
    }

    cuerpo.appendChild(construirNotas(modulo));

    details.append(summary, cuerpo);
    fragmento.appendChild(details);

    const enriquecido = {
      ...modulo,
      element: details,
      contador: progreso,
      tabla: tablaActividades,
      busqueda: textosBusqueda.join(' ').toLowerCase(),
    };
    app.modulos.push(enriquecido);

    // Las actividades apuntan al módulo enriquecido (con contador y elemento).
    for (const actividad of modulo.activities) {
      const info = actividadIndex.get(actividad.id);
      if (info) info.modulo = enriquecido;
    }
  }

  dom.modulos.replaceChildren(fragmento);
}

/** Texto plano de un bloque del Markdown (para la búsqueda). */
function textoDeBloque(block) {
  if (!block) return '';
  if (block.type === 'paragraph' || block.type === 'heading' || block.type === 'code') return block.text;
  if (block.type === 'list') return textoDeLista(block.items);
  if (block.type === 'table') return [...block.header, ...block.rows.flat()].join(' ');
  if (block.type === 'blockquote') return block.blocks.map(textoDeBloque).join(' ');
  return '';
}

function textoDeLista(items) {
  return (items || [])
    .map((item) => `${item.text} ${(item.children || []).map((hijo) => textoDeLista(hijo.items)).join(' ')}`)
    .join(' ');
}

/** Renderiza nodos en línea ya parseados dentro de un párrafo escapado. */
function renderInlineComoParrafo(nodes, ctx) {
  return `<p>${renderInlineNodes(nodes, ctx)}</p>`;
}

function construirTablaActividades(modulo) {
  const wrap = document.createElement('div');
  wrap.className = 'tabla-actividades-wrap';

  const tabla = document.createElement('table');
  tabla.className = 'tabla-actividades';

  const caption = document.createElement('caption');
  caption.className = 'sr-only';
  caption.textContent = `Actividades del módulo ${modulo.number}`;

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const columnas = [
    ['Actividad', 'col-actividad'],
    ['Trabajo y evidencia', 'col-evidencia'],
  ];
  for (const [texto, clase] of columnas) {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = texto;
    if (clase) th.className = clase;
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);

  const tbody = document.createElement('tbody');
  for (const actividad of modulo.activities) {
    const fila = document.createElement('tr');
    fila.dataset.estudiada = 'false';

    const etiqueta = document.createElement('label');
    etiqueta.className = 'check';
    etiqueta.htmlFor = `cb-${actividad.id}`;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `cb-${actividad.id}`;
    input.dataset.actividad = actividad.id;
    input.setAttribute('aria-describedby', `desc-${actividad.id}`);

    const texto = document.createElement('span');
    texto.className = 'sr-only';
    texto.textContent = 'Estudiado';

    etiqueta.append(input, texto);

    const descripcion = document.createElement('span');
    descripcion.className = 'sr-only';
    descripcion.id = `desc-${actividad.id}`;
    descripcion.textContent = `Módulo ${modulo.number}, ${actividad.code}: ${actividad.titleText}`;

    const celdaActividad = document.createElement('td');
    celdaActividad.className = 'col-actividad';
    celdaActividad.innerHTML = renderInlineComoParrafo(actividad.labelNodes, app.contextoItinerario);
    celdaActividad.firstElementChild.prepend(etiqueta, descripcion);

    const celdaEvidencia = document.createElement('td');
    celdaEvidencia.className = 'col-evidencia';
    celdaEvidencia.innerHTML = renderInlineComoParrafo(actividad.task, app.contextoItinerario);

    fila.append(celdaActividad, celdaEvidencia);
    tbody.appendChild(fila);
    actividadIndex.set(actividad.id, { actividad, modulo });
  }

  tabla.append(caption, thead, tbody);
  wrap.appendChild(tabla);

  return wrap;
}

function construirNotas(modulo) {
  const caja = document.createElement('div');
  caja.className = 'notas';

  const etiqueta = document.createElement('label');
  etiqueta.htmlFor = `notas-${modulo.number}`;
  etiqueta.textContent = `Notas del módulo ${modulo.number} (opcional)`;

  const area = document.createElement('textarea');
  area.id = `notas-${modulo.number}`;
  area.dataset.notasModulo = String(modulo.number);
  area.maxLength = MAX_NOTE_CHARS;
  area.rows = 3;
  area.placeholder = 'Ideas, dudas, referencias de la evidencia…';

  const pie = document.createElement('div');
  pie.className = 'notas-pie';

  const ayuda = document.createElement('span');
  ayuda.textContent =
    'Se guardan solo en este navegador. Las notas no son evidencia ni sustituyen el Done de la actividad.';

  const estado = document.createElement('span');
  estado.className = 'nota-estado';
  estado.dataset.notaEstado = String(modulo.number);
  estado.setAttribute('role', 'status');

  pie.append(ayuda, estado);
  caja.append(etiqueta, area, pie);
  return caja;
}

/* -------------------------------------------------------------------------- */
/* Progreso                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Identificadores que el estado guardado puede contener: las actividades
 * actuales y los 140 registros del plan anterior (20 semanas × 7 días), que se
 * conservan tal cual pero no acreditan nada de la ruta actual.
 */
function idsConocidos() {
  const completedIds = new Set(actividadIndex.keys());
  for (const id of legacySessionIds()) completedIds.add(id);
  const noteIds = new Set(app.modulos.map((modulo) => `week-${modulo.number}`));
  return { completedIds, noteIds };
}

function actividadesCompletadas() {
  let cuenta = 0;
  for (const id of actividadIndex.keys()) {
    if (app.progreso.completed[id] === true) cuenta += 1;
  }
  return cuenta;
}

function modulosCompletados() {
  let cuenta = 0;
  for (const modulo of app.modulos) {
    const total = modulo.activities.length;
    const hechas = modulo.activities.filter((actividad) => app.progreso.completed[actividad.id] === true).length;
    if (total > 0 && hechas === total) cuenta += 1;
  }
  return cuenta;
}

function actualizarEstadisticas() {
  const total = { activities: actividadIndex.size, modules: app.modulos.length };
  const actividades = actividadesCompletadas();
  const modulos = modulosCompletados();

  dom.valorActividades.textContent = `${actividades} / ${total.activities}`;
  dom.valorModulos.textContent = `${modulos} / ${total.modules}`;

  dom.barraActividades.max = String(total.activities || 1);
  dom.barraActividades.value = String(actividades);
  dom.barraModulos.max = String(total.modules || 1);
  dom.barraModulos.value = String(modulos);

  actualizarContadoresFiltro();
  actualizarHistorial();
}

/** Contadores por estado: siempre sobre el total de la ruta, no sobre el filtro. */
function actualizarContadoresFiltro() {
  const cuentas = { todas: 0, pendientes: 0, 'en-curso': 0, estudiadas: 0 };
  for (const modulo of app.modulos) {
    const total = modulo.activities.length;
    const hechas = modulo.activities.filter((actividad) => app.progreso.completed[actividad.id] === true).length;
    cuentas.todas += 1;
    if (hechas === 0) cuentas.pendientes += 1;
    else if (hechas === total) cuentas.estudiadas += 1;
    else cuentas['en-curso'] += 1;
  }
  for (const [clave, valor] of Object.entries(cuentas)) {
    const nodo = document.querySelector(`[data-cuenta="${clave}"]`);
    if (nodo) nodo.textContent = String(valor);
  }
}

function actualizarContadorModulo(modulo) {
  const total = modulo.activities.length;
  const hechas = modulo.activities.filter((actividad) => app.progreso.completed[actividad.id] === true).length;
  modulo.contador.textContent = `${hechas}/${total}`;
  modulo.contador.dataset.completa = hechas === total ? 'true' : 'false';
  for (const actividad of modulo.activities) {
    const input = document.getElementById(`cb-${actividad.id}`);
    const fila = input ? input.closest('tr') : null;
    if (fila) fila.dataset.estudiada = app.progreso.completed[actividad.id] === true ? 'true' : 'false';
  }
}

/**
 * Historial del plan anterior: los registros por sesión de día que la versión
 * previa guardaba. Se conservan, pero no acreditan actividades nuevas ni
 * cuentan en las actividades ni en los módulos completados.
 */
function actualizarHistorial() {
  if (!dom.historial || !dom.historialCuerpo) return;

  const marcas = [];
  for (const id of Object.keys(app.progreso.completed)) {
    // Las actividades actuales no son historial: solo quedan los ids del plan
    // anterior (`week-N-<día>`).
    if (actividadIndex.has(id)) continue;
    if (!/^week-\d+-[a-z]+$/.test(id)) continue;
    marcas.push(id);
  }

  const notas = Object.keys(app.progreso.notes).length;

  if (!marcas.length) {
    dom.historialCuerpo.replaceChildren();
    dom.historial.hidden = true;
    return;
  }

  const porModulo = new Map();
  for (const id of marcas) {
    const match = /^week-(\d+)-([a-z]+)$/.exec(id);
    if (!match) continue;
    const numero = Number(match[1]);
    const dia = match[2];
    if (!porModulo.has(numero)) porModulo.set(numero, new Set());
    porModulo.get(numero).add(dia);
  }

  const caja = document.createElement('div');
  caja.className = 'historial-caja';

  const explicacion = document.createElement('p');
  explicacion.className = 'panel-nota';
  explicacion.textContent =
    'Registros de la versión anterior de la ruta (uno por sesión de día). No acreditan actividades nuevas: no cuentan en las actividades ni en los módulos completados. Las notas por módulo se conservan.';

  const conteo = document.createElement('p');
  conteo.className = 'historial-conteo';
  const totalMarcas = document.createElement('strong');
  totalMarcas.textContent = String(marcas.length);
  conteo.append(
    totalMarcas,
    document.createTextNode(
      ` marcas conservadas en ${porModulo.size} ${porModulo.size === 1 ? 'módulo' : 'módulos'} · ${notas} ${notas === 1 ? 'nota conservada' : 'notas conservadas'}`,
    ),
  );

  const lista = document.createElement('ul');
  lista.className = 'historial-lista';
  for (const [numero, dias] of [...porModulo.entries()].sort((a, b) => a[0] - b[0])) {
    const item = document.createElement('li');
    const etiqueta = document.createElement('span');
    etiqueta.className = 'historial-modulo';
    etiqueta.textContent = `Módulo ${numero}`;
    const detalle = document.createElement('span');
    detalle.className = 'historial-dias';
    const orden = LEGACY_DAY_SLUGS.filter((dia) => dias.has(dia));
    detalle.textContent = orden.map((dia) => ETIQUETAS_DIA[dia] || dia).join(', ');
    item.append(etiqueta, detalle);
    lista.appendChild(item);
  }

  caja.append(explicacion, conteo, lista);
  dom.historialCuerpo.replaceChildren(caja);
  dom.historial.hidden = false;
}

function aplicarProgresoAVista() {
  for (const id of actividadIndex.keys()) {
    const input = document.getElementById(`cb-${id}`);
    if (input) input.checked = app.progreso.completed[id] === true;
  }
  for (const modulo of app.modulos) {
    const area = document.getElementById(`notas-${modulo.number}`);
    if (area) area.value = app.progreso.notes[`week-${modulo.number}`] || '';
    actualizarContadorModulo(modulo);
  }
  actualizarEstadisticas();
}

let avisoBloqueoAlmacen = null;
let avisoFalloGuardado = null;

/** Quita el aviso de almacenamiento bloqueado y su acción (si sigue en el DOM). */
function retirarAvisoAlmacenBloqueado() {
  if (avisoBloqueoAlmacen) {
    avisoBloqueoAlmacen.remove();
    avisoBloqueoAlmacen = null;
  }
}

function tieneProgreso() {
  return Object.keys(app.progreso.completed).length > 0 || Object.keys(app.progreso.notes).length > 0;
}

/**
 * Acción del aviso de dato corrupto: borra el dato guardado y empieza de cero.
 * Si la corrupción ya se resolvió (importación o reinicio), la acción está
 * obsoleta: no debe borrar el progreso nuevo sin confirmación.
 */
async function accionBorrarDatoDanado() {
  if (!app.bloqueoAlmacen) {
    retirarAvisoAlmacenBloqueado();
    mostrarAviso('aviso', 'El dato dañado ya estaba resuelto: no se ha borrado nada.');
    return;
  }

  if (tieneProgreso()) {
    const aceptado = await askConfirm({
      titulo: 'Borrar el progreso guardado',
      mensaje:
        'Hay progreso marcado en esta página. Si lo borras, se perderán las marcas y las notas actuales. ¿Continuar?',
      aceptar: 'Borrar todo',
    });
    if (!aceptado) {
      // El aviso sigue en pantalla: se puede reintentar.
      mostrarAviso('aviso', 'No se ha borrado nada: el progreso se mantiene.');
      return;
    }
  }

  const borrado = app.store.clear();
  if (!borrado.ok) {
    // Tampoco se retira el aviso: el dato sigue ahí y se puede reintentar.
    mostrarAviso('error', borrado.error);
    return;
  }

  app.bloqueoAlmacen = false;
  retirarAvisoAlmacenBloqueado();
  app.progreso = createEmptyState();
  aplicarProgresoAVista();

  const guardado = persistir();
  if (guardado.ok) mostrarAviso('ok', 'Progreso reiniciado en este navegador.');
  else mostrarAviso('aviso', `El dato dañado se ha borrado, pero no se ha podido guardar: ${guardado.error}`);
}

/**
 * Guarda el progreso y devuelve el resultado real: `ok` solo es true si el
 * navegador ha aceptado persistir. La UI nunca debe prometer «guardado» si no.
 */
function persistir() {
  if (!app.store) {
    return { ok: false, error: 'El progreso aún no se puede guardar: el itinerario no está cargado.' };
  }
  if (app.bloqueoAlmacen) {
    if (!avisoBloqueoAlmacen) {
      avisoBloqueoAlmacen = mostrarAviso(
        'aviso',
        'El progreso se mantiene solo en memoria: el dato guardado en este navegador está dañado y no se sobrescribe. Resuélvelo desde el aviso de arriba.',
        { persistente: true },
      );
    }
    return { ok: false, error: 'El dato guardado está dañado: el progreso solo está en memoria.' };
  }
  const resultado = app.store.save(app.progreso);
  if (resultado.ok) {
    if (avisoFalloGuardado) {
      avisoFalloGuardado.remove();
      avisoFalloGuardado = null;
    }
    return { ok: true, error: '' };
  }
  if (!avisoFalloGuardado) {
    avisoFalloGuardado = mostrarAviso(
      'aviso',
      `${resultado.error} El progreso sigue visible en esta página y puedes exportarlo con «Exportar copia».`,
      { persistente: true },
    );
  }
  return { ok: false, error: resultado.error };
}

/* -------------------------------------------------------------------------- */
/* Filtro y búsqueda                                                          */
/* -------------------------------------------------------------------------- */

function aplicarFiltro() {
  const texto = app.filtro.texto.trim().toLowerCase();
  let visibles = 0;

  for (const modulo of app.modulos) {
    const coincideTexto = !texto || modulo.busqueda.includes(texto);
    const hechas = modulo.activities.filter((actividad) => app.progreso.completed[actividad.id] === true).length;
    const total = modulo.activities.length;
    let coincideEstado = true;
    if (app.filtro.modo === 'pendientes') coincideEstado = hechas === 0;
    else if (app.filtro.modo === 'en-curso') coincideEstado = hechas > 0 && hechas < total;
    else if (app.filtro.modo === 'estudiadas') coincideEstado = hechas === total && total > 0;

    const visible = coincideTexto && coincideEstado;
    modulo.element.hidden = !visible;
    if (visible) visibles += 1;
  }

  const total = app.modulos.length;
  dom.resultados.textContent = `${visibles} de ${total} módulos visibles.`;
  dom.resultados.hidden = false;

  const vacio = dom.resultados.parentElement.querySelector('.sin-resultados');
  if (visibles === 0) {
    if (!vacio) {
      const caja = document.createElement('p');
      caja.className = 'sin-resultados';
      const textoMensaje = document.createElement('span');
      textoMensaje.textContent = 'Ningún módulo coincide con la búsqueda o el filtro.';
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'btn';
      boton.textContent = 'Limpiar búsqueda y filtros';
      boton.addEventListener('click', () => {
        app.filtro.texto = '';
        app.filtro.modo = 'todas';
        dom.buscar.value = '';
        actualizarSegmentos();
        aplicarFiltro();
        dom.buscar.focus();
      });
      caja.append(textoMensaje, boton);
      dom.resultados.parentElement.appendChild(caja);
    }
  } else if (vacio) {
    vacio.remove();
  }
}

function actualizarSegmentos() {
  for (const boton of document.querySelectorAll('[data-filtro]')) {
    boton.setAttribute('aria-pressed', boton.dataset.filtro === app.filtro.modo ? 'true' : 'false');
  }
}

function primeraActividadPendiente() {
  for (const modulo of app.modulos) {
    for (const actividad of modulo.activities) {
      if (app.progreso.completed[actividad.id] !== true) return { modulo, actividad };
    }
  }
  return null;
}

/** Quita la búsqueda y el filtro de estado: la lista vuelve a estar completa. */
function limpiarFiltros() {
  app.filtro.texto = '';
  app.filtro.modo = 'todas';
  dom.buscar.value = '';
  actualizarSegmentos();
  aplicarFiltro();
}

function abrirModuloPendiente({ enfocar }) {
  const pendiente = primeraActividadPendiente();
  if (!pendiente) return false;

  if (pendiente.modulo.element.hidden) {
    limpiarFiltros();
  }

  pendiente.modulo.element.open = true;
  if (enfocar) {
    const input = document.getElementById(`cb-${pendiente.actividad.id}`);
    if (input) {
      input.focus();
      input.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  }
  return true;
}

/* -------------------------------------------------------------------------- */
/* Navegación                                                                 */
/* -------------------------------------------------------------------------- */

function activarVista(key) {
  app.vista = key;
  for (const doc of DOCS) {
    const vista = $(`vista-${doc.key}`);
    if (vista) vista.hidden = doc.key !== key;
  }
  for (const enlace of document.querySelectorAll('.nav-lista a')) {
    if (enlace.dataset.vista === key) enlace.setAttribute('aria-current', 'page');
    else enlace.removeAttribute('aria-current');
  }
  if (dom.lector.open) dom.lector.close();
  // Cambiar de sección es como cambiar de página: se vuelve arriba.
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function analizarRuta(hash) {
  const bruto = String(hash || '').replace(/^#/, '');
  if (bruto.startsWith('/doc?')) {
    const params = new URLSearchParams(bruto.slice('/doc?'.length));
    return { tipo: 'doc', path: params.get('path') || '', anchor: params.get('anchor') || '' };
  }
  const key = bruto.replace(/^\//, '');
  if (DOCS.some((doc) => doc.key === key)) return { tipo: 'vista', key };
  return { tipo: 'vista', key: 'itinerario' };
}

function rutaDeDoc(path, anchor) {
  const base = `#/doc?path=${encodeURIComponent(path)}`;
  return anchor ? `${base}&anchor=${encodeURIComponent(anchor)}` : base;
}

function buscarAncla(contenedor, ancla) {
  if (!ancla) return null;
  const nodos = [...contenedor.querySelectorAll('[data-anchor]')].filter((nodo) => nodo.tagName !== 'A');
  const opciones = [ancla, slugify(ancla)];
  for (const opcion of opciones) {
    for (const nodo of nodos) {
      if (nodo.dataset.anchor === opcion) return nodo;
    }
  }
  for (const nodo of nodos) {
    if (nodo.dataset.anchor.startsWith(ancla)) return nodo;
  }
  return null;
}

/**
 * Un ancla puede caer en un módulo que la búsqueda o el filtro de estado
 * esconde. Para poder enfocar el destino hay que quitar esas restricciones:
 * se limpian la búsqueda y el filtro (como hace «Continuar») y se vuelve a
 * aplicar el filtro. Si el módulo ya está visible, la búsqueda se respeta.
 */
function revelarModuloOculto(destino) {
  const modulo = destino.closest('#modulos details.modulo');
  if (!modulo || !modulo.hidden) return false;
  limpiarFiltros();
  return true;
}

/** Abre todos los plegables (`details`) que encierran el nodo. */
function abrirPlegables(nodo) {
  for (let actual = nodo; actual; actual = actual.parentElement) {
    if (actual.tagName === 'DETAILS' && !actual.open) actual.open = true;
  }
}

function desplazarAAncla(contenedor, ancla) {
  const destino = buscarAncla(contenedor, ancla);
  if (!destino) return;
  // Si el módulo del destino está oculto, se quitan las restricciones que lo
  // esconden: si no, el foco caería en un nodo que nadie ve.
  revelarModuloOculto(destino);
  // Si el ancla vive dentro de un bloque plegable (la introducción), se abren
  // todos los plegables que lo encierran.
  abrirPlegables(destino);
  if (!destino.hasAttribute('tabindex')) destino.setAttribute('tabindex', '-1');
  destino.focus({ preventScroll: true });
  destino.scrollIntoView({ block: 'start', behavior: 'auto' });
}

async function abrirLector(path, anchor) {
  dom.lectorTitulo.textContent = path.split('/').pop();
  dom.lectorRuta.textContent = path;
  dom.lectorCuerpo.replaceChildren();
  if (!dom.lector.open) dom.lector.showModal();

  try {
    const fuente = await leerDoc(path);
    const bloques = parseMarkdown(fuente);
    let cuerpo = bloques;
    let titulo = path.split('/').pop();
    const primero = bloques[0];
    if (primero && primero.type === 'heading' && primero.level === 1) {
      titulo = primero.text;
      cuerpo = bloques.slice(1);
    }
    const ctx = createContext({ docPath: path, docKey: docKeyDe(path) });
    dom.lectorTitulo.textContent = titulo;
    dom.lectorCuerpo.innerHTML = renderBlocks(cuerpo, ctx);
    desplazarAAncla(dom.lectorCuerpo, anchor);
  } catch (error) {
    dom.lectorTitulo.textContent = 'No se ha podido abrir el documento';
    dom.lectorCuerpo.innerHTML = '';
    const caja = document.createElement('div');
    caja.className = 'error-carga';
    const mensaje = document.createElement('p');
    mensaje.textContent = `${error.message} Comprueba la ruta y que el servidor siga en marcha.`;
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn';
    boton.textContent = 'Reintentar';
    boton.addEventListener('click', () => abrirLector(path, anchor));
    caja.append(mensaje, boton);
    dom.lectorCuerpo.appendChild(caja);
  }
}

function aplicarRuta(ruta) {
  if (ruta.tipo === 'doc') {
    const doc = docByPath(ruta.path);
    if (doc) {
      activarVista(doc.key);
      const vista = $(`vista-${doc.key}`);
      desplazarAAncla(vista, ruta.anchor);
      return;
    }
    if (ruta.path) abrirLector(ruta.path, ruta.anchor);
    return;
  }
  activarVista(ruta.key);
}

window.addEventListener('hashchange', () => {
  aplicarRuta(analizarRuta(window.location.hash));
});

/* -------------------------------------------------------------------------- */
/* Copiar prompts                                                             */
/* -------------------------------------------------------------------------- */

async function copiarTexto(texto) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(texto);
      return true;
    }
  } catch {
    /* se intenta el respaldo */
  }

  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '0';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let copiado = false;
  try {
    copiado = document.execCommand('copy');
  } catch {
    copiado = false;
  }
  area.remove();
  return copiado;
}

/* -------------------------------------------------------------------------- */
/* Eventos                                                                    */
/* -------------------------------------------------------------------------- */

document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-copiar]');
  if (boton) {
    const figura = boton.closest('.md-codigo');
    const codigo = figura ? figura.querySelector('code') : null;
    if (!codigo) return;
    copiarTexto(codigo.textContent || '').then((copiado) => {
      if (copiado) {
        mostrarAviso('ok', 'Prompt copiado al portapapeles.');
      } else {
        mostrarAviso(
          'aviso',
          'No se ha podido copiar automáticamente: selecciona el texto del bloque y cópialo con Ctrl+C (o ⌘C).',
          { duracion: 12000 },
        );
      }
    });
    return;
  }

  const enlace = evento.target.closest('a.enlace-doc');
  if (enlace) {
    evento.preventDefault();
    const path = enlace.dataset.docPath;
    const anchor = enlace.dataset.anchor || '';
    if (!path) return;
    const ruta = rutaDeDoc(path, anchor);
    const actual = analizarRuta(window.location.hash);
    const destino = analizarRuta(ruta);
    const mismoDestino =
      actual.tipo === destino.tipo &&
      (actual.path || '') === (destino.path || '') &&
      (actual.anchor || '') === (destino.anchor || '');
    if (mismoDestino) {
      // El hash no cambia y no hay hashchange: se aplica la ruta a mano para
      // que el mismo enlace vuelva a abrir el documento.
      aplicarRuta(destino);
      return;
    }
    window.location.hash = ruta;
  }
});

dom.buscar.addEventListener('input', () => {
  app.filtro.texto = dom.buscar.value;
  aplicarFiltro();
});

for (const boton of document.querySelectorAll('[data-filtro]')) {
  boton.addEventListener('click', () => {
    app.filtro.modo = boton.dataset.filtro;
    actualizarSegmentos();
    aplicarFiltro();
  });
}

dom.btnExpandir.addEventListener('click', () => {
  for (const modulo of app.modulos) {
    if (!modulo.element.hidden) modulo.element.open = true;
  }
});

dom.btnContraer.addEventListener('click', () => {
  for (const modulo of app.modulos) modulo.element.open = false;
});

dom.btnContinuar.addEventListener('click', () => {
  const abierta = abrirModuloPendiente({ enfocar: true });
  if (!abierta) {
    mostrarAviso(
      'ok',
      'Todas las actividades están marcadas. Eso no demuestra dominio: revisa el Done y la evidencia de cada módulo.',
    );
  }
});

const notasPendientes = new Set();
let temporizadorNotas = null;

/**
 * Vuelca las notas pendientes. Se llama al escribir (con retardo), al salir del
 * campo (`change`) y al abandonar la página (`pagehide`), para no perder la
 * última nota escrita menos de 400 ms antes de recargar.
 */
function guardarNotas() {
  window.clearTimeout(temporizadorNotas);
  temporizadorNotas = null;
  if (!notasPendientes.size) return null;

  const resultado = persistir();
  const texto = resultado.ok ? 'Guardado en este navegador' : 'Solo en memoria: no se pudo guardar';
  for (const modulo of notasPendientes) {
    const destino = dom.modulos.querySelector(`[data-nota-estado="${modulo}"]`);
    if (destino) destino.textContent = texto;
  }
  notasPendientes.clear();
  return resultado;
}

dom.modulos.addEventListener('change', (evento) => {
  const area = evento.target.closest('textarea[data-notas-modulo]');
  if (area) {
    guardarNotas();
    return;
  }

  const input = evento.target.closest('input[data-actividad]');
  if (!input) return;
  const id = input.dataset.actividad;
  if (input.checked) app.progreso.completed[id] = true;
  else delete app.progreso.completed[id];
  const info = actividadIndex.get(id);
  if (info) actualizarContadorModulo(info.modulo);
  persistir();
  actualizarEstadisticas();
  // El filtro no se re-aplica aquí: el módulo que estás marcando no debe
  // desaparecer bajo tus manos. Los contadores de estado sí se actualizan.
});

dom.modulos.addEventListener('input', (evento) => {
  const area = evento.target.closest('textarea[data-notas-modulo]');
  if (!area) return;
  const modulo = Number(area.dataset.notasModulo);
  const clave = `week-${modulo}`;
  const valor = area.value.slice(0, MAX_NOTE_CHARS);
  if (valor.trim()) app.progreso.notes[clave] = valor;
  else delete app.progreso.notes[clave];

  notasPendientes.add(modulo);
  const estado = dom.modulos.querySelector(`[data-nota-estado="${modulo}"]`);
  if (estado) estado.textContent = 'Guardando…';

  window.clearTimeout(temporizadorNotas);
  temporizadorNotas = window.setTimeout(guardarNotas, 400);
});

window.addEventListener('pagehide', () => {
  guardarNotas();
});

dom.btnExportar.addEventListener('click', () => {
  if (!app.listo) return;
  const contenido = serializeState(app.progreso);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `appsec-progreso-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  mostrarAviso('ok', 'Copia exportada. Guárdala como respaldo: vive en este navegador y no se sincroniza.');
});

dom.btnImportar.addEventListener('click', () => dom.inputImportar.click());

dom.inputImportar.addEventListener('change', async () => {
  const archivo = dom.inputImportar.files && dom.inputImportar.files[0];
  dom.inputImportar.value = '';
  if (!archivo) return;
  if (!app.listo) {
    mostrarAviso('error', 'El itinerario aún no está cargado: espera a que la lista de módulos esté disponible.');
    return;
  }

  if (archivo.size > MAX_IMPORT_CHARS) {
    mostrarAviso('error', 'El archivo supera el tamaño máximo admitido (1 MB). No se ha importado nada.');
    return;
  }

  let texto = '';
  try {
    texto = await archivo.text();
  } catch {
    mostrarAviso('error', 'No se ha podido leer el archivo. No se ha importado nada.');
    return;
  }

  const resultado = parseImport(texto, idsConocidos());
  if (!resultado.ok) {
    mostrarAviso('error', `No se ha importado nada: ${resultado.error} Tu progreso actual no ha cambiado.`);
    return;
  }

  const hayProgreso = tieneProgreso();
  if (hayProgreso) {
    const aceptado = await askConfirm({
      titulo: 'Reemplazar el progreso actual',
      mensaje:
        'Hay progreso guardado en este navegador. Si importas la copia, se reemplazarán las marcas de actividad, el historial del plan anterior y las notas actuales. ¿Continuar?',
      aceptar: 'Reemplazar',
    });
    if (!aceptado) {
      mostrarAviso('aviso', 'Importación cancelada: el progreso actual no ha cambiado.');
      return;
    }
  }

  app.progreso = resultado.state;
  app.bloqueoAlmacen = false;
  // La corrupción quedó resuelta: el aviso y su acción quedan obsoletos.
  retirarAvisoAlmacenBloqueado();
  aplicarProgresoAVista();
  const guardado = persistir();
  aplicarFiltro();
  for (const issue of resultado.issues) {
    mostrarAviso('aviso', issue.message, { persistente: true });
  }
  mostrarAviso(
    guardado.ok ? 'ok' : 'aviso',
    guardado.ok
      ? 'Copia importada correctamente.'
      : `Copia importada, pero no se ha podido guardar en este navegador: ${guardado.error}`,
  );
});

dom.btnReiniciar.addEventListener('click', async () => {
  if (!app.listo) return;
  const aceptado = await askConfirm({
    titulo: 'Reiniciar el progreso',
    mensaje:
      'Se borrarán las marcas de actividad, el historial del plan anterior y las notas guardadas en este navegador. Solo se borra la clave propia de esta web: el resto del almacenamiento del navegador no se toca.',
    aceptar: 'Borrar el progreso',
  });
  if (!aceptado) {
    mostrarAviso('aviso', 'Reinicio cancelado: el progreso no ha cambiado.');
    return;
  }

  const resultado = app.store.clear();
  if (!resultado.ok) {
    // Si no se pudo borrar lo guardado, no se finge un reinicio: el estado
    // actual se conserva y se avisa.
    mostrarAviso('error', `${resultado.error} El progreso de esta página no se ha reiniciado.`);
    return;
  }

  app.progreso = createEmptyState();
  app.bloqueoAlmacen = false;
  retirarAvisoAlmacenBloqueado();
  aplicarProgresoAVista();
  aplicarFiltro();
  mostrarAviso('ok', 'Progreso reiniciado en este navegador.');
});

dom.btnCerrarLector.addEventListener('click', () => dom.lector.close());

/* -------------------------------------------------------------------------- */
/* Arranque                                                                   */
/* -------------------------------------------------------------------------- */

async function cargarVistaDeDoc(doc) {
  const contenedor = $(`cuerpo-${doc.key}`);
  if (!contenedor) return;
  try {
    const fuente = await leerDoc(doc.path);
    const bloques = parseMarkdown(fuente);
    let cuerpo = bloques;
    let titulo = '';
    const primero = bloques[0];
    if (primero && primero.type === 'heading' && primero.level === 1) {
      titulo = primero.text;
      cuerpo = bloques.slice(1);
    }
    const ctx = createContext({ docPath: doc.path, docKey: doc.key });
    contenedor.innerHTML = renderBlocks(cuerpo, ctx);
    const cabecera = $(`titulo-${doc.key}`);
    if (cabecera && titulo) cabecera.textContent = titulo;
    const bloqueados = ctx.collect;
    for (const enlace of bloqueados) {
      mostrarAviso('aviso', `Enlace bloqueado por seguridad: ${enlace.href} (${enlace.reason}).`, { persistente: true });
    }
  } catch (error) {
    contenedor.replaceChildren();
    const caja = document.createElement('div');
    caja.className = 'error-carga';
    const mensaje = document.createElement('p');
    mensaje.textContent = `No se ha podido cargar ${doc.path}: ${error.message}`;
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn';
    boton.textContent = 'Reintentar';
    boton.addEventListener('click', () => {
      app.cache.delete(doc.path);
      cargarVistaDeDoc(doc);
    });
    caja.append(mensaje, boton);
    contenedor.appendChild(caja);
  }
}

async function cargarItinerario() {
  const doc = DOCS[0];
  try {
    const fuente = await leerDoc(doc.path);
    const parseado = parseItinerario(fuente);

    const ctx = createContext({ docPath: doc.path, docKey: 'itinerario' });
    dom.preambulo.innerHTML = renderBlocks(parseado.preamble, ctx);
    dom.cierre.innerHTML = renderBlocks(parseado.closing, ctx);
    if (parseado.title) dom.tituloItinerario.textContent = parseado.title;

    dom.horario.textContent =
      `${parseado.modules.length} módulos · ${parseado.modules.flatMap((modulo) => modulo.activities).length} actividades` +
      ' · referencia flexible: 2–3 horas semanales · avanza al poder explicar, aplicar y verificar';

    construirModulos(parseado);
    dom.errorItinerario.hidden = true;
    dom.errorItinerario.replaceChildren();
    return true;
  } catch (error) {
    mostrarErrorItinerario(error);
    return false;
  }
}

/** El error va fuera del bloque plegable para que se vea siempre. */
function mostrarErrorItinerario(error) {
  const caja = dom.errorItinerario;
  caja.replaceChildren();
  caja.hidden = false;

  const titulo = document.createElement('h2');
  titulo.textContent = 'No se ha podido leer el itinerario';

  const mensaje = document.createElement('p');
  mensaje.textContent = `${error.message}${error.detail ? ` ${error.detail}` : ''}`;

  const pista = document.createElement('p');
  pista.textContent =
    'El progreso guardado no se toca mientras el itinerario no esté disponible: se recupera en cuanto lo leas.';

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'btn';
  boton.textContent = 'Reintentar';
  boton.addEventListener('click', () => {
    reintentarItinerario();
  });

  caja.append(titulo, mensaje, pista, boton);
  // La vista del itinerario debe verse: sin ella el error quedaría oculto.
  activarVista('itinerario');
}

/** Reintento: mismo pipeline de arranque, sin duplicar listeners. */
async function reintentarItinerario() {
  app.cache.delete(DOCS[0].path);
  const ok = await cargarItinerario();
  if (!ok) return;
  await Promise.all(DOCS.slice(1).map((doc) => cargarVistaDeDoc(doc)));
  finalizarArranque();
}

/** Controles que solo tienen sentido con la lista de módulos cargada. */
function actualizarControlesDisponibles(listo) {
  app.listo = listo;
  for (const boton of [
    dom.btnExportar,
    dom.btnImportar,
    dom.btnReiniciar,
    dom.btnContinuar,
    dom.btnExpandir,
    dom.btnContraer,
  ]) {
    boton.disabled = !listo;
  }
  dom.buscar.disabled = !listo;
  for (const boton of document.querySelectorAll('[data-filtro]')) {
    boton.disabled = !listo;
  }
}

/** En pantallas pequeñas el texto secundario del lateral se pliega. */
function compactarPanelLateral() {
  // `matchMedia` existe en cualquier navegador que soporte módulos ES: la web
  // ya exige un navegador moderno, así que no hace falta una reserva.
  if (dom.detalleAlmacen && window.matchMedia('(max-width: 980px)').matches) {
    dom.detalleAlmacen.removeAttribute('open');
  }
}

/**
 * Arranque completo: solo se ejecuta con el itinerario ya validado, porque
 * sin él no se conocen los ids de actividad y de nota y el progreso se
 * descartaría.
 */
function finalizarArranque() {
  iniciarAlmacenamiento();
  aplicarProgresoAVista();
  aplicarFiltro();
  abrirModuloPendiente({ enfocar: false });
  const ruta = analizarRuta(window.location.hash);
  aplicarRuta(ruta);
  actualizarControlesDisponibles(true);
}

function iniciarAlmacenamiento() {
  if (app.almacenIniciado) return;
  app.almacenIniciado = true;

  let storage = null;
  try {
    storage = window.localStorage;
  } catch {
    storage = null;
  }
  app.store = createStore({ storage, known: idsConocidos() });
  const resultado = app.store.load();

  app.progreso = resultado.state;

  for (const issue of resultado.issues) {
    if (issue.type === 'corrupto') {
      app.bloqueoAlmacen = true;
      avisoBloqueoAlmacen = mostrarAviso(
        'aviso',
        `${issue.message} Puedes exportarlo o borrarlo para empezar de cero.`,
        {
          persistente: true,
          accion: {
            texto: 'Borrar el dato dañado y empezar de cero',
            hacer: accionBorrarDatoDanado,
          },
        },
      );
    } else if (issue.type === 'ids-desconocidos') {
      mostrarAviso('aviso', issue.message, { persistente: true });
    } else if (issue.type === 'almacen') {
      mostrarAviso(
        'aviso',
        `${issue.message} El progreso se mantendrá solo en memoria durante esta sesión y podrás exportarlo, pero no se guardará al recargar.`,
        { persistente: true },
      );
    } else if (issue.message) {
      mostrarAviso('aviso', issue.message, { persistente: true });
    }
  }

  if (resultado.available === false) {
    dom.notasAlmacen.textContent =
      'El almacenamiento local no está disponible en este navegador: el progreso solo existirá mientras esta pestaña permanezca abierta.';
  }
}

async function iniciar() {
  actualizarControlesDisponibles(false);
  compactarPanelLateral();

  if (window.location.protocol === 'file:') {
    // Camino defensivo: los módulos ES no se ejecutan con file://, así que el
    // aviso de «usa un servidor local» se muestra por CSS (data-servido).
    dom.horario.textContent = 'Servidor HTTP local necesario para leer los documentos.';
    document.body.dataset.ready = '1';
    return;
  }

  const okItinerario = await cargarItinerario();
  if (!okItinerario) {
    document.body.dataset.ready = '1';
    return;
  }

  await Promise.all(DOCS.slice(1).map((doc) => cargarVistaDeDoc(doc)));
  finalizarArranque();
  document.body.dataset.ready = '1';
}

iniciar().catch((error) => {
  const caja = document.createElement('div');
  caja.className = 'error-carga';
  const mensaje = document.createElement('p');
  mensaje.textContent = `La web no ha podido arrancar: ${error && error.message ? error.message : error}`;
  caja.appendChild(mensaje);
  dom.avisos.appendChild(caja);
  document.body.dataset.ready = '1';
});

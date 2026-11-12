/**
 * content.mjs — subconjunto acotado de Markdown (parser + render) para la web AppSec.
 *
 * Reglas del módulo:
 * - Sin dependencias y sin HTML crudo: todo el texto pasa por `esc()` antes de renderizar.
 * - El Markdown del repo es la fuente de verdad; aquí solo se interpreta.
 * - Las rutas de documento se resuelven SIEMPRE respecto al directorio del documento
 *   original (nunca respecto a `web/`), y solo se admiten `.md` dentro del repo.
 */

export const APP_SEC_DIR = 'Especializacioes/AppSec';

/** Los cuatro documentos AppSec, en orden de navegación. */
export const DOCS = [
  { key: 'itinerario', label: 'Itinerario', path: `${APP_SEC_DIR}/ITINERARIO.md` },
  { key: 'guia', label: 'Cómo estudiar', path: `${APP_SEC_DIR}/README.md` },
  { key: 'recursos', label: 'Recursos', path: `${APP_SEC_DIR}/RECURSOS.md` },
  { key: 'prompts', label: 'Prompts', path: `${APP_SEC_DIR}/PROMPTS.md` },
];

const DOC_BY_PATH = new Map(DOCS.map((d) => [d.path, d]));

export function docByPath(path) {
  return DOC_BY_PATH.get(path) || null;
}

/* -------------------------------------------------------------------------- */
/* Utilidades de texto                                                        */
/* -------------------------------------------------------------------------- */

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Normaliza a minúsculas sin acentos: sirve para claves y comparaciones. */
export function normalizeKey(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Slug de estilo GitHub: minúsculas, sin puntuación (incluye `/`), espacios -> `-`.
 * Los acentos se conservan porque GitHub los conserva.
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');
}

export function dirOf(path) {
  const parts = String(path).split('/');
  parts.pop();
  return parts.join('/');
}

/* -------------------------------------------------------------------------- */
/* Parser de bloque                                                           */
/* -------------------------------------------------------------------------- */

const FENCE_RE = /^(```|~~~)\s*(.*)$/;
const HEADING_RE = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const HR_RE = /^\s{0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/;
const LIST_RE = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const TABLE_DELIM_RE = /^\s*\|?\s*:?-{2,}:?\s*(?:\|\s*:?-{2,}:?\s*)*\|?\s*$/;

/** Error de estructura del itinerario: la app lo muestra en pantalla. */
export class ItineraryError extends Error {
  constructor(message, detail) {
    super(message);
    this.name = 'ItineraryError';
    this.detail = detail || '';
  }
}

function splitRow(line) {
  const cells = [];
  let current = '';
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '\\' && line[i + 1] === '|') {
      current += '|';
      i += 1;
      continue;
    }
    if (ch === '`') {
      const end = line.indexOf('`', i + 1);
      if (end > -1) {
        current += line.slice(i, end + 1);
        i = end;
        continue;
      }
    }
    if (ch === '|') {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  if (cells.length && cells[0] === '') cells.shift();
  if (cells.length && cells[cells.length - 1] === '') cells.pop();
  return cells;
}

function isTableStart(lines, index) {
  const line = lines[index];
  const next = lines[index + 1];
  if (!line || !next || !line.includes('|') || !next.includes('|')) return false;
  if (!next.includes('-')) return false;
  if (!TABLE_DELIM_RE.test(next)) return false;
  return splitRow(line).length === splitRow(next).length;
}

function isBlockStart(lines, index) {
  const line = lines[index];
  if (!line) return false;
  if (FENCE_RE.test(line)) return true;
  if (HEADING_RE.test(line)) return true;
  if (HR_RE.test(line)) return true;
  if (LIST_RE.test(line)) return true;
  if (/^\s*>/.test(line)) return true;
  return isTableStart(lines, index);
}

function parseList(lines, start) {
  const root = { ordered: false, items: [] };
  // El primer nivel fija su propia sangría: así una lista de sangría 0 no se
  // confunde con un nivel anidado.
  const stack = [{ indent: null, list: root }];
  let orderedKnown = false;
  let i = start;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
      if (j < lines.length && LIST_RE.test(lines[j])) {
        i = j;
        continue;
      }
      break;
    }
    const match = LIST_RE.exec(line);
    if (!match) break;

    const indent = match[1].replace(/\t/g, '    ').length;
    const ordered = /\d/.test(match[2]);
    if (!orderedKnown) {
      root.ordered = ordered;
      orderedKnown = true;
    }

    while (stack.length > 1 && indent < stack[stack.length - 1].indent) stack.pop();

    const top = stack[stack.length - 1];
    if (top.indent === null) top.indent = indent;

    let list = top.list;
    if (indent > top.indent) {
      const parent = list.items[list.items.length - 1];
      if (parent) {
        const nested = { ordered, items: [] };
        parent.children.push(nested);
        list = nested;
        stack.push({ indent, list });
      }
    }
    list.items.push({ text: match[3], children: [] });
    i += 1;
  }

  return { block: { type: 'list', ordered: root.ordered, items: root.items }, next: i };
}

function parseBlockquote(lines, start) {
  const buffer = [];
  let i = start;
  while (i < lines.length && /^\s*>/.test(lines[i])) {
    buffer.push(lines[i].replace(/^\s*>\s?/, ''));
    i += 1;
  }
  return { block: { type: 'blockquote', blocks: parseMarkdown(buffer.join('\n')) }, next: i };
}

function parseTable(lines, start) {
  const header = splitRow(lines[start]);
  const delimiter = splitRow(lines[start + 1]);
  const align = delimiter.map((cell) => {
    const left = cell.startsWith(':');
    const right = cell.endsWith(':');
    if (left && right) return 'center';
    if (right) return 'right';
    return 'left';
  });
  const rows = [];
  let i = start + 2;
  while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
    rows.push(splitRow(lines[i]));
    i += 1;
  }
  return { block: { type: 'table', header, align, rows }, next: i };
}

/** Convierte Markdown en un árbol de bloques (subconjunto acotado). */
export function parseMarkdown(source) {
  const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const fence = FENCE_RE.exec(line);
    if (fence) {
      const marker = fence[1];
      const lang = fence[2].trim();
      const buffer = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith(marker)) {
        buffer.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push({ type: 'code', lang, text: buffer.join('\n') });
      continue;
    }

    const heading = HEADING_RE.exec(line);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    if (HR_RE.test(line)) {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const parsed = parseBlockquote(lines, i);
      blocks.push(parsed.block);
      i = parsed.next;
      continue;
    }

    if (LIST_RE.test(line)) {
      const parsed = parseList(lines, i);
      blocks.push(parsed.block);
      i = parsed.next;
      continue;
    }

    if (isTableStart(lines, i)) {
      const parsed = parseTable(lines, i);
      blocks.push(parsed.block);
      i = parsed.next;
      continue;
    }

    const buffer = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines, i)) {
      buffer.push(lines[i].trim());
      i += 1;
    }
    if (!buffer.length) {
      i += 1;
      continue;
    }
    blocks.push({ type: 'paragraph', text: buffer.join('\n') });
  }

  return blocks;
}

/* -------------------------------------------------------------------------- */
/* Parser en línea                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Extrae un enlace `[texto](destino)` con paréntesis balanceados en el destino
 * (los paths del repo los contienen, p. ej. `... (Integración y Entrega Continua).md`).
 */
function parseLinkAt(source, start) {
  if (source[start] !== '[') return null;
  let depth = 1;
  let i = start + 1;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch === '`') {
      const end = source.indexOf('`', i + 1);
      if (end > -1) {
        i = end + 1;
        continue;
      }
    }
    if (ch === '[') depth += 1;
    else if (ch === ']') {
      depth -= 1;
      if (depth === 0) break;
    }
    i += 1;
  }
  if (depth !== 0) return null;

  const text = source.slice(start + 1, i);
  i += 1;
  if (source[i] !== '(') return null;
  i += 1;

  let href = '';
  let destDepth = 1;
  let inAngle = false;
  for (; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '\\') {
      href += source[i + 1] === undefined ? '' : source[i + 1];
      i += 1;
      continue;
    }
    if (!inAngle && ch === '<') {
      inAngle = true;
      continue;
    }
    if (inAngle && ch === '>') {
      inAngle = false;
      continue;
    }
    if (!inAngle) {
      if (ch === '(') {
        destDepth += 1;
        href += ch;
        continue;
      }
      if (ch === ')') {
        destDepth -= 1;
        if (destDepth === 0) break;
        href += ch;
        continue;
      }
    }
    if (ch === ' ' || ch === '\t' || ch === '\n') break;
    href += ch;
  }

  let title = '';
  let j = i;
  while (j < source.length && /\s/.test(source[j])) j += 1;
  const quote = source[j];
  if (quote === '"' || quote === "'") {
    const end = source.indexOf(quote, j + 1);
    if (end > -1) {
      title = source.slice(j + 1, end);
      j = end + 1;
      while (j < source.length && /\s/.test(source[j])) j += 1;
    }
  }
  if (source[j] !== ')') return null;

  return { href: href.trim(), title, text, end: j + 1 };
}

function findEmphasisEnd(source, start, marker) {
  for (let i = start + 1; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '\\') {
      i += 1;
      continue;
    }
    if (ch === '`') {
      const end = source.indexOf('`', i + 1);
      if (end > -1) {
        i = end;
        continue;
      }
    }
    if (ch === marker && source[i + 1] !== marker && source[i - 1] !== ' ') {
      return i;
    }
  }
  return -1;
}

/** Convierte texto en línea en nodos: text | strong | em | code | link. */
export function parseInline(source) {
  const nodes = [];
  let buffer = '';
  let i = 0;

  const flush = () => {
    if (buffer) {
      nodes.push({ type: 'text', text: buffer });
      buffer = '';
    }
  };

  while (i < source.length) {
    const ch = source[i];

    if (ch === '\\' && i + 1 < source.length) {
      buffer += source[i + 1];
      i += 2;
      continue;
    }

    if (ch === '`') {
      const end = source.indexOf('`', i + 1);
      if (end > -1) {
        flush();
        nodes.push({ type: 'code', text: source.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (ch === '[') {
      const link = parseLinkAt(source, i);
      if (link) {
        flush();
        nodes.push({
          type: 'link',
          href: link.href,
          title: link.title,
          children: parseInline(link.text),
        });
        i = link.end;
        continue;
      }
    }

    if (ch === '*' && source[i + 1] === '*') {
      const end = source.indexOf('**', i + 2);
      if (end > -1) {
        flush();
        nodes.push({ type: 'strong', children: parseInline(source.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    if (ch === '*' || ch === '_') {
      const prev = source[i - 1];
      const next = source[i + 1];
      if (next && !/\s/.test(next) && (!prev || !/[\wÀ-ÿ]/.test(prev))) {
        const end = findEmphasisEnd(source, i, ch);
        if (end > -1) {
          flush();
          nodes.push({ type: 'em', children: parseInline(source.slice(i + 1, end)) });
          i = end + 1;
          continue;
        }
      }
    }

    buffer += ch;
    i += 1;
  }

  flush();
  return nodes;
}

/* -------------------------------------------------------------------------- */
/* Rutas y esquemas                                                            */
/* -------------------------------------------------------------------------- */

/** Devuelve el esquema de una URL (`javascript`, `data`, `https`...) o null. */
export function schemeOf(url) {
  let text = String(url).trim();
  text = text.replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
  text = text.replace(/&#(\d+);?/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
  text = text.replace(/[\u0000-\u0020\u007f]/g, '');
  const match = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(text);
  return match ? match[1].toLowerCase() : null;
}

export function safeDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return null;
  }
}

/**
 * Resuelve un enlace relativo contra el directorio del documento original.
 * Devuelve la ruta del repo (`Especializacioes/AppSec/RECURSOS.md`) o null si
 * se sale del repo, apunta a algo oculto o no es un `.md`.
 */
export function resolveDocPath(baseDir, href) {
  const raw = String(href == null ? '' : href).trim();
  if (!raw) return null;
  if (schemeOf(raw)) return null;
  if (raw.startsWith('//')) return null;

  let relative = raw.startsWith('/') ? raw.replace(/^\/+/, '') : raw;
  const parts = baseDir ? String(baseDir).split('/').filter(Boolean) : [];
  for (const segment of relative.split('/')) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      if (!parts.length) return null;
      parts.pop();
      continue;
    }
    if (segment.includes('\0')) return null;
    parts.push(segment);
  }

  const path = parts.join('/');
  if (!path) return null;
  if (path.split('/').some((segment) => segment.startsWith('.'))) return null;
  if (!/\.md$/i.test(path)) return null;
  return path;
}

function splitAnchor(href) {
  const index = href.indexOf('#');
  if (index === -1) return [href, ''];
  return [href.slice(0, index), href.slice(index + 1)];
}

/* -------------------------------------------------------------------------- */
/* Render                                                                      */
/* -------------------------------------------------------------------------- */

export function createContext({ docPath, docKey, collect } = {}) {
  return {
    docPath: docPath || '',
    docKey: docKey || 'doc',
    baseDir: docPath ? dirOf(docPath) : '',
    collect: collect || [],
  };
}

/** Renderiza nodos en línea (escapados) a HTML. */
export function renderInlineNodes(nodes, ctx) {
  return nodes.map((node) => renderInlineNode(node, ctx)).join('');
}

function blockedLink(node, ctx, reason) {
  ctx.collect.push({ href: node.href, reason });
  const label = renderInlineNodes(node.children, ctx);
  return `<span class="enlace-bloqueado" title="Enlace bloqueado por seguridad: ${esc(reason)}">${label}</span>`;
}

function renderInlineNode(node, ctx) {
  switch (node.type) {
    case 'text':
      return esc(node.text);
    case 'strong':
      return `<strong>${renderInlineNodes(node.children, ctx)}</strong>`;
    case 'em':
      return `<em>${renderInlineNodes(node.children, ctx)}</em>`;
    case 'code':
      return `<code>${esc(node.text)}</code>`;
    case 'link':
      return renderLink(node, ctx);
    default:
      return '';
  }
}

function renderLink(node, ctx) {
  const href = String(node.href || '').trim();
  const scheme = schemeOf(href);

  if (scheme) {
    if (scheme === 'http' || scheme === 'https') {
      const label = renderInlineNodes(node.children, ctx);
      return `<a class="enlace-externo" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (se abre en una pestaña nueva)</span></a>`;
    }
    return blockedLink(node, ctx, `esquema «${scheme}» no permitido`);
  }

  if (href.startsWith('//')) {
    return blockedLink(node, ctx, 'dirección sin esquema');
  }

  const [rawPath, rawAnchor] = splitAnchor(href);
  const decodedPath = safeDecode(rawPath);
  if (decodedPath === null) {
    return blockedLink(node, ctx, 'ruta con codificación inválida');
  }

  let target = ctx.docPath;
  if (decodedPath !== '') {
    target = resolveDocPath(ctx.baseDir, decodedPath);
    if (!target) {
      return blockedLink(node, ctx, 'ruta fuera del repositorio o no permitida');
    }
  }

  const decodedAnchor = rawAnchor ? safeDecode(rawAnchor) : '';
  const anchor = decodedAnchor === null ? rawAnchor : decodedAnchor;
  const route = `#/doc?path=${encodeURIComponent(target)}${anchor ? `&anchor=${encodeURIComponent(anchor)}` : ''}`;
  return `<a class="enlace-doc" href="${esc(route)}" data-doc-path="${esc(target)}"${anchor ? ` data-anchor="${esc(anchor)}"` : ''}>${renderInlineNodes(node.children, ctx)}</a>`;
}

function renderList(items, ctx, ordered) {
  const tag = ordered ? 'ol' : 'ul';
  const html = items
    .map((item) => {
      // `children` es una lista de sublistas ({ ordered, items }), no de ítems.
      const children = (item.children || [])
        .map((child) => renderList(child.items, ctx, child.ordered))
        .join('');
      return `<li>${renderInlineNodes(parseInline(item.text), ctx)}${children}</li>`;
    })
    .join('');
  return `<${tag} class="md-lista">${html}</${tag}>`;
}

function renderTable(block, ctx) {
  const head = block.header
    .map((cell, index) => `<th scope="col" class="align-${block.align[index] || 'left'}">${renderInlineNodes(parseInline(cell), ctx)}</th>`)
    .join('');
  const body = block.rows
    .map((row) => {
      const cells = row
        .map((cell, index) => `<td class="align-${block.align[index] || 'left'}">${renderInlineNodes(parseInline(cell), ctx)}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');
  return `<div class="md-tabla-wrap"><table class="md-tabla"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderBlock(block, ctx) {
  switch (block.type) {
    case 'heading': {
      const slug = slugify(block.text);
      const id = `${ctx.docKey}-${slug}`;
      return `<h${block.level} id="${esc(id)}" data-anchor="${esc(slug)}">${renderInlineNodes(parseInline(block.text), ctx)}</h${block.level}>`;
    }
    case 'paragraph':
      return `<p>${renderInlineNodes(parseInline(block.text), ctx)}</p>`;
    case 'code': {
      const lang = block.lang ? `<span class="codigo-lengua">${esc(block.lang)}</span>` : '<span class="codigo-lengua">texto</span>';
      return `<figure class="md-codigo"><figcaption class="codigo-cabecera">${lang}<button type="button" class="btn-copiar" data-copiar>Copiar</button></figcaption><pre><code>${esc(block.text)}</code></pre></figure>`;
    }
    case 'list':
      return renderList(block.items, ctx, block.ordered);
    case 'table':
      return renderTable(block, ctx);
    case 'blockquote':
      return `<blockquote class="md-cita">${block.blocks.map((b) => renderBlock(b, ctx)).join('')}</blockquote>`;
    case 'hr':
      return '<hr class="md-hr" />';
    default:
      return '';
  }
}

/** Renderiza bloques ya parseados a HTML seguro. */
export function renderBlocks(blocks, ctx) {
  return blocks.map((block) => renderBlock(block, ctx)).join('\n');
}

/** Parsea + renderiza en un solo paso. Devuelve también los enlaces bloqueados. */
export function renderMarkdown(source, ctx) {
  const context = ctx || createContext({});
  const blocks = parseMarkdown(source);
  return {
    blocks,
    html: renderBlocks(blocks, context),
    blocked: context.collect,
  };
}

/** Bloques de código cercados (los prompts). */
export function extractCodeBlocks(source) {
  return parseMarkdown(source)
    .filter((block) => block.type === 'code')
    .map((block) => ({ lang: block.lang, text: block.text }));
}

/* -------------------------------------------------------------------------- */
/* Itinerario por módulos                                                     */
/* -------------------------------------------------------------------------- */

/** Encabezado de módulo: `## Módulo 12 — Título`. */
const MODULO_RE = /^M[oó]dulo\s+(\d+)\s*(?:[—–-]\s*(.*))?$/i;

/** Código de actividad al inicio de la primera columna: `A1 — Título`. */
const CODIGO_RE = /^A(\d+)(?=\s|$|[—–-])/;

/** Columnas exactas de la tabla de actividades de cada módulo. */
const COLUMNAS_ACTIVIDADES = ['actividad', 'trabajo y evidencia'];

const FIELD_LABELS = [
  { key: 'objetivo', pattern: /^Objetivo verificable:?$/ },
  { key: 'busca', pattern: /^Busca:?$/ },
  { key: 'recursos', pattern: /^Recursos:?$/ },
  { key: 'prerrequisitos', pattern: /^Prerrequisitos:?$/ },
  { key: 'entregable', pattern: /^Entregable\s*\/\s*Done:?$/ },
  { key: 'recuperacion', pattern: /^Recuperaci[oó]n:?$/ },
];

function fieldLabelOf(nodes) {
  const first = nodes[0];
  if (!first || first.type !== 'strong') return null;
  const label = first.children.map((child) => (child.type === 'text' ? child.text : '')).join('').trim();
  const found = FIELD_LABELS.find((entry) => entry.pattern.test(label));
  return found ? { key: found.key, label: label.replace(/:\s*$/, '') } : null;
}

function isActivityTable(block) {
  return block.type === 'table' && normalizeKey(block.header[0] || '') === 'actividad';
}

/** Texto plano de nodos en línea (para buscar y para describir). */
function inlineText(nodes) {
  return (nodes || [])
    .map((node) => {
      if (node.type === 'text' || node.type === 'code') return node.text;
      if (node.children) return inlineText(node.children);
      return '';
    })
    .join('');
}

/**
 * Parsea y valida módulos y tablas de actividades.
 * Lanza `ItineraryError` si el formato no encaja: la app lo muestra.
 */
export function parseItinerario(source) {
  const blocks = parseMarkdown(source);
  const modules = [];
  const preamble = [];
  const closing = [];
  let current = null;
  let title = '';
  let enCierre = false;

  for (const block of blocks) {
    if (block.type === 'heading' && block.level === 1) {
      title = block.text;
      continue;
    }
    if (block.type === 'heading' && block.level === 2) {
      const modulo = MODULO_RE.exec(block.text);
      if (modulo) {
        current = {
          number: Number(modulo[1]),
          title: (modulo[2] || '').trim(),
          headingSlug: slugify(block.text),
          items: [],
          activities: [],
        };
        modules.push(current);
        enCierre = false;
        continue;
      }
      // El cierre es explícito: `## Cierre de la ruta`. Nada se deduce del final.
      if (normalizeKey(block.text) === 'cierre de la ruta') {
        enCierre = true;
        current = null;
        closing.push(block);
        continue;
      }
    }
    if (enCierre) {
      closing.push(block);
      continue;
    }
    if (!current) {
      preamble.push(block);
      continue;
    }

    if (block.type === 'paragraph') {
      const inline = parseInline(block.text);
      const label = fieldLabelOf(inline);
      if (label) {
        current.items.push({ kind: 'field', key: label.key, label: label.label, value: inline.slice(1) });
        continue;
      }
    }
    if (isActivityTable(block)) {
      current.items.push({ kind: 'actividades', block });
      continue;
    }
    current.items.push({ kind: 'block', block });
  }

  if (!modules.length) {
    throw new ItineraryError('El itinerario no contiene ningún módulo.');
  }

  const declared = /(\d+)\s*m[oó]dulos?/i.exec(title);
  if (declared && Number(declared[1]) !== modules.length) {
    throw new ItineraryError(
      `El título declara ${declared[1]} módulos pero el documento contiene ${modules.length}.`,
      'Revisa el archivo ITINERARIO.md: la estructura no coincide con la fuente.',
    );
  }

  if (!closing.length) {
    throw new ItineraryError(
      'El itinerario no tiene la sección «## Cierre de la ruta».',
      'El cierre debe ir marcado con su propio encabezado, no deducido del final.',
    );
  }

  modules.forEach((module, index) => {
    if (module.number !== index + 1) {
      throw new ItineraryError(
        `Numeración de módulos discontinua: se esperaba el módulo ${index + 1} y se encontró el ${module.number}.`,
      );
    }
    const tables = module.items.filter((item) => item.kind === 'actividades');
    if (tables.length !== 1) {
      throw new ItineraryError(
        `El módulo ${module.number} no tiene una tabla de actividades única (${tables.length}).`,
        'Cada módulo debe tener una tabla «Actividad | Trabajo y evidencia».',
      );
    }
    module.activities = parseActivityTable(tables[0].block, module);
  });

  return { title, preamble, modules, closing };
}

function parseActivityTable(block, module) {
  const header = block.header.map((celda) => normalizeKey(celda));
  if (header.length !== COLUMNAS_ACTIVIDADES.length) {
    throw new ItineraryError(
      `La tabla del módulo ${module.number} tiene ${header.length} columnas en lugar de ${COLUMNAS_ACTIVIDADES.length}.`,
      'Las columnas son «Actividad» y «Trabajo y evidencia».',
    );
  }
  COLUMNAS_ACTIVIDADES.forEach((esperado, indice) => {
    if (header[indice] !== esperado) {
      throw new ItineraryError(
        `La tabla del módulo ${module.number} no tiene la columna «${esperado}» en la posición ${indice + 1}.`,
        'Las columnas son «Actividad» y «Trabajo y evidencia».',
      );
    }
  });

  const rows = block.rows;
  if (rows.length < 3 || rows.length > 5) {
    throw new ItineraryError(
      `El módulo ${module.number} tiene ${rows.length} actividades en lugar de 3 a 5.`,
      'Cada módulo de la ruta tiene entre 3 y 5 actividades.',
    );
  }

  const seen = new Set();
  const activities = rows.map((row, index) => {
    if (row.length !== COLUMNAS_ACTIVIDADES.length) {
      throw new ItineraryError(
        `La actividad ${index + 1} del módulo ${module.number} tiene ${row.length} columnas en lugar de ${COLUMNAS_ACTIVIDADES.length}.`,
      );
    }

    const [celdaActividad, celdaTrabajo] = row;
    const codigo = CODIGO_RE.exec(celdaActividad);
    if (!codigo) {
      throw new ItineraryError(
        `El módulo ${module.number} tiene una actividad sin código «A1…An»: «${celdaActividad}».`,
        'La primera columna empieza por el código de la actividad, por ejemplo «A1 — Título».',
      );
    }
    const numero = Number(codigo[1]);
    if (seen.has(numero)) {
      throw new ItineraryError(`El módulo ${module.number} repite el código «A${numero}».`);
    }
    seen.add(numero);

    const titulo = celdaActividad.slice(codigo[0].length).replace(/^\s*[—–-]\s*/, '').trim();
    if (!titulo) {
      throw new ItineraryError(`La actividad «A${numero}» del módulo ${module.number} no tiene título.`);
    }

    if (!celdaTrabajo.trim()) {
      throw new ItineraryError(
        `La actividad «A${numero}» del módulo ${module.number} no dice qué hay que hacer.`,
      );
    }

    return {
      id: `module-${module.number}-a${numero}`,
      module: module.number,
      code: `A${numero}`,
      index: numero,
      title: titulo,
      titleText: inlineText(parseInline(titulo)),
      label: celdaActividad,
      labelNodes: parseInline(celdaActividad),
      task: parseInline(celdaTrabajo),
      taskText: inlineText(parseInline(celdaTrabajo)),
    };
  });

  const reales = [...seen].sort((a, b) => a - b);
  const esperados = Array.from({ length: activities.length }, (_, indice) => indice + 1);
  if (reales.length !== esperados.length || reales.some((numero, indice) => numero !== esperados[indice])) {
    throw new ItineraryError(
      `El módulo ${module.number} no tiene los códigos A1…A${activities.length}: ${reales.map((n) => `A${n}`).join(', ')}.`,
    );
  }

  return activities;
}

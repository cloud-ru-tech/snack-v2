import { TOOLBAR_ITEM } from './constants';
import { HeadingLevel, ToolbarItemId } from './types';

// Чистые трансформации markdown-исходника для raw-режима редактора (textarea).
// Каждая возвращает новый текст и диапазон выделения, который надо восстановить.

export type RawEdit = { text: string; selStart: number; selEnd: number };

// Инлайн-обёртки (toggle): **bold**, *italic*, ~~strike~~, `code`.
const INLINE_MARKER: Partial<Record<ToolbarItemId, string>> = {
  [TOOLBAR_ITEM.Bold]: '**',
  [TOOLBAR_ITEM.Italic]: '*',
  [TOOLBAR_ITEM.Strikethrough]: '~~',
  [TOOLBAR_ITEM.InlineCode]: '`',
};

// Любой ведущий блок-маркер строки (heading/quote/bullet/ordered) — снимается при смене типа блока.
const BLOCK_MARKER_RE = /^(#{1,6}\s+|>\s+|[-*+]\s+|\d+\.\s+)/;

function getLineBounds(value: string, start: number, end: number): { lineStart: number; lineEnd: number } {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  let lineEnd = value.indexOf('\n', end);
  if (lineEnd === -1) lineEnd = value.length;
  return { lineStart, lineEnd };
}

function wrapInline(value: string, start: number, end: number, marker: string): RawEdit {
  const selected = value.slice(start, end);
  const before = value.slice(Math.max(0, start - marker.length), start);
  const after = value.slice(end, end + marker.length);

  // Уже обёрнуто — снимаем обёртку (toggle off).
  if (start >= marker.length && before === marker && after === marker) {
    const text = value.slice(0, start - marker.length) + selected + value.slice(end + marker.length);
    return { text, selStart: start - marker.length, selEnd: end - marker.length };
  }

  const text = value.slice(0, start) + marker + selected + marker + value.slice(end);
  return { text, selStart: start + marker.length, selEnd: end + marker.length };
}

function transformLines(value: string, start: number, end: number, transform: (lines: string[]) => string[]): RawEdit {
  const { lineStart, lineEnd } = getLineBounds(value, start, end);
  const block = value.slice(lineStart, lineEnd);
  const next = transform(block.split('\n')).join('\n');
  const text = value.slice(0, lineStart) + next + value.slice(lineEnd);
  return { text, selStart: lineStart, selEnd: lineStart + next.length };
}

function toggleLinePrefix(value: string, start: number, end: number, prefix: string): RawEdit {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const ownRe = new RegExp(`^${escaped}`);
  return transformLines(value, start, end, lines => {
    const allPrefixed = lines.every(line => ownRe.test(line));
    if (allPrefixed) return lines.map(line => line.replace(ownRe, ''));
    return lines.map(line => prefix + line.replace(BLOCK_MARKER_RE, ''));
  });
}

function toggleOrderedList(value: string, start: number, end: number): RawEdit {
  const orderedRe = /^\d+\.\s+/;
  return transformLines(value, start, end, lines => {
    const allPrefixed = lines.every(line => orderedRe.test(line));
    if (allPrefixed) return lines.map(line => line.replace(orderedRe, ''));
    return lines.map((line, index) => `${index + 1}. ${line.replace(BLOCK_MARKER_RE, '')}`);
  });
}

function setHeading(value: string, start: number, end: number, level: HeadingLevel): RawEdit {
  const marker = `${'#'.repeat(level)} `;
  const sameLevelRe = new RegExp(`^#{${level}}\\s+`);
  return transformLines(value, start, end, lines => {
    const allSame = lines.every(line => sameLevelRe.test(line));
    // Повторный выбор того же уровня снимает заголовок (toggle).
    if (allSame) return lines.map(line => line.replace(sameLevelRe, ''));
    return lines.map(line => marker + line.replace(BLOCK_MARKER_RE, ''));
  });
}

function setParagraph(value: string, start: number, end: number): RawEdit {
  return transformLines(value, start, end, lines => lines.map(line => line.replace(/^#{1,6}\s+/, '')));
}

function fenceBlock(value: string, start: number, end: number): RawEdit {
  const { lineStart, lineEnd } = getLineBounds(value, start, end);
  const block = value.slice(lineStart, lineEnd);
  const fenced = `\`\`\`\n${block}\n\`\`\``;
  const text = value.slice(0, lineStart) + fenced + value.slice(lineEnd);
  // Выделяем тело между fence'ами.
  const innerStart = lineStart + 4;
  return { text, selStart: innerStart, selEnd: innerStart + block.length };
}

function replaceSelection(
  value: string,
  start: number,
  end: number,
  insert: string,
  selStart: number,
  selEnd: number,
): RawEdit {
  const text = value.slice(0, start) + insert + value.slice(end);
  return { text, selStart, selEnd };
}

export function buildMarkdownTable(rows: number, cols: number, columnLabel: (index: number) => string): string {
  const header = `| ${Array.from({ length: cols }, (_, i) => columnLabel(i + 1)).join(' | ')} |`;
  const divider = `| ${Array.from({ length: cols }, () => '---').join(' | ')} |`;
  const bodyRow = `| ${Array.from({ length: cols }, () => ' ').join(' | ')} |`;
  const body = Array.from({ length: rows }, () => bodyRow);
  return [header, divider, ...body].join('\n');
}

/** Инлайн-toggle (bold/italic/strike/inline-code) или `null`, если id не инлайновый. */
export function applyInlineToggle(id: ToolbarItemId, value: string, start: number, end: number): RawEdit | null {
  const marker = INLINE_MARKER[id];
  return marker ? wrapInline(value, start, end, marker) : null;
}

/** Блочный toggle (bullet/ordered/quote/block-code) или `null`, если id не блочный. */
export function applyBlockToggle(id: ToolbarItemId, value: string, start: number, end: number): RawEdit | null {
  switch (id) {
    case TOOLBAR_ITEM.BulletList:
      return toggleLinePrefix(value, start, end, '- ');
    case TOOLBAR_ITEM.OrderedList:
      return toggleOrderedList(value, start, end);
    case TOOLBAR_ITEM.BlockQuote:
      return toggleLinePrefix(value, start, end, '> ');
    case TOOLBAR_ITEM.BlockCode:
      return fenceBlock(value, start, end);
    default:
      return null;
  }
}

export function applyHeading(value: string, start: number, end: number, level: HeadingLevel): RawEdit {
  return setHeading(value, start, end, level);
}

export function applyParagraph(value: string, start: number, end: number): RawEdit {
  return setParagraph(value, start, end);
}

export function applyLink(
  value: string,
  start: number,
  end: number,
  href: string,
  title: string,
  defaultText: string,
): RawEdit {
  const selected = title || value.slice(start, end) || defaultText;
  const insert = `[${selected}](${href})`;
  // Выделяем подпись ссылки внутри скобок.
  return replaceSelection(value, start, end, insert, start + 1, start + 1 + selected.length);
}

export function applyImage(value: string, start: number, end: number, src: string, alt: string): RawEdit {
  const insert = `![${alt}](${src})`;
  const cursor = start + insert.length;
  return replaceSelection(value, start, end, insert, cursor, cursor);
}

export function applyTable(
  value: string,
  start: number,
  end: number,
  rows: number,
  cols: number,
  columnLabel: (index: number) => string,
): RawEdit {
  const table = buildMarkdownTable(rows, cols, columnLabel);
  // Таблица — отдельный блок: добавляем переводы строк по краям, если рядом непустой текст.
  const prefix = start > 0 && value[start - 1] !== '\n' ? '\n\n' : '';
  const suffix = end < value.length && value[end] !== '\n' ? '\n\n' : '';
  const insert = prefix + table + suffix;
  const cursor = start + insert.length;
  return replaceSelection(value, start, end, insert, cursor, cursor);
}

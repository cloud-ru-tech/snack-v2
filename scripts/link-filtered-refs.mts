#!/usr/bin/env tsx
/**
 * Wraps component/prop references in props-refactoring/new/filtered/*.md
 * with markdown links to source locations (file:line).
 *
 * Run: pnpm link:filtered-refs
 */

import { sync as globSync } from 'glob';
import { basename, dirname, resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  ensurePropLocationIndex,
  getIndexStats,
  resolveFileLine,
  resolveRef,
  toMarkdownLink,
} from './props-refactoring/prop-locations.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const filteredDir = resolve(root, 'props-refactoring/new/filtered');

const REF_RE = /([a-z0-9-]+)\.([A-Z][A-Za-z0-9]*(?:OwnProps|Props)?)(?:\.([a-zA-Z0-9.-]+))?/g;
const FILE_LINE_RE = /(?<!\()([A-Za-z0-9.-]+\.tsx):(\d+)(?!\))/g;
const FULL_PATH_LINE_RE = /(?<!\()((?:\.\.\/)*packages\/[A-Za-z0-9./_-]+\.tsx):(\d+)(?!\))/g;
const INVENTORY_ROW_RE = /^\| ([^|]+?) \| `([^`|]+)` \|/gm;
const BARE_COMPONENT_RE = /\b(FieldMask|FieldPhone|FieldChat)\b/g;

const BARE_COMPONENT_PKG: Record<string, string> = {
  FieldMask: 'uikit-product-fields-predefined',
  FieldPhone: 'uikit-product-fields-predefined',
  FieldChat: 'uikit-product-fields-predefined',
};

function isInsideMarkdownLink(text: string, index: number): boolean {
  for (const match of text.matchAll(/\[([^\]]*)\]\(([^)]*)\)/g)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    if (index >= start && index < end) return true;
  }
  return false;
}

function extractComponentFromCell(cell: string, prop?: string): string | null {
  const linked = cell.match(/\[([a-z0-9-]+\.[A-Z][A-Za-z0-9.]*)\]\([^)]+\)/);
  if (linked) {
    let component = linked[1]!;
    if (prop && component.endsWith(`.${prop}`)) {
      component = component.slice(0, -(prop.length + 1));
    }
    return component;
  }
  const plain = cell.match(/`([a-z0-9-]+\.[A-Z][A-Za-z0-9.]*)`/);
  if (plain) return plain[1]!;
  const bare = cell.match(/([a-z0-9-]+\.[A-Z][A-Za-z0-9.]*)/);
  return bare?.[1] ?? null;
}

function isAlreadyLinkedRef(text: string, ref: string, index: number): boolean {
  const slice = text.slice(Math.max(0, index - 1), index + ref.length + 1);
  return slice.startsWith('[') || text.slice(index - 1, index) === '[';
}

function linkRef(fullMatch: string, offset: number, text: string): string {
  if (isInsideMarkdownLink(text, offset)) return fullMatch;
  if (isAlreadyLinkedRef(text, fullMatch, offset)) return fullMatch;
  if (fullMatch.includes('*')) return fullMatch;

  const loc = resolveRef(fullMatch);
  if (!loc) return fullMatch;
  return toMarkdownLink(fullMatch, loc);
}

function linkFileLine(fullMatch: string, file: string, line: string, offset: number, text: string): string {
  if (isInsideMarkdownLink(text, offset)) return fullMatch;
  const loc = resolveFileLine(file, Number(line));
  if (!loc) return fullMatch;
  return toMarkdownLink(`${basename(file)}:${line}`, loc);
}

function linkFullPathLine(fullMatch: string, file: string, line: string, offset: number, text: string): string {
  if (isInsideMarkdownLink(text, offset)) return fullMatch;
  const normalized = file.replace(/^(\.\.\/)+/, '');
  const loc = resolveFileLine(normalized.startsWith('packages/') ? normalized : file, Number(line));
  if (!loc) return fullMatch;
  return toMarkdownLink(`${basename(file)}:${line}`, loc);
}

function linkInventoryRows(content: string): { output: string; linked: number } {
  let linked = 0;
  const output = content.replace(INVENTORY_ROW_RE, (row, componentCell, prop) => {
    const escapedProp = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\[[^\\]]+\\.${escapedProp}\\]\\(`).test(componentCell)) return row;

    const component = extractComponentFromCell(componentCell.trim(), prop);
    if (!component || prop.includes('*')) return row;

    const ref = `${component}.${prop}`;
    const loc = resolveRef(ref);
    if (!loc) return row;

    const linkedComponent = toMarkdownLink(ref, loc);
    if (row.includes(linkedComponent)) return row;

    linked += 1;
    return row.replace(componentCell, linkedComponent);
  });

  return { output, linked };
}

function normalizePathLinks(content: string): string {
  return content.replace(/\(([^)]+\.(?:tsx?|mts)):\d+\)/g, '($1)');
}

function linkBareComponents(content: string): { output: string; linked: number } {
  let linked = 0;
  const output = content.replace(BARE_COMPONENT_RE, (match, name, offset) => {
    if (isInsideMarkdownLink(content, offset)) return match;
    const pkg = BARE_COMPONENT_PKG[name];
    if (!pkg) return match;
    const ref = `${pkg}.${name}`;
    const loc = resolveRef(ref);
    if (!loc) return match;
    linked += 1;
    return toMarkdownLink(ref, loc);
  });
  return { output, linked };
}

function processMarkdown(content: string): { output: string; linked: number } {
  let linked = 0;
  let output = normalizePathLinks(content);

  output = output.replace(FULL_PATH_LINE_RE, (match, file, line, offset) => {
    const next = linkFullPathLine(match, file, line, offset, output);
    if (next !== match) linked += 1;
    return next;
  });

  let pass = output;
  output = pass.replace(FILE_LINE_RE, (match, file, line, offset) => {
    if (file.startsWith('packages/')) return match;
    const next = linkFileLine(match, file, line, offset, pass);
    if (next !== match) linked += 1;
    return next;
  });

  pass = output;
  output = pass.replace(REF_RE, (match, _pkg, _name, _prop, offset) => {
    const next = linkRef(match, offset, pass);
    if (next !== match) linked += 1;
    return next;
  });

  const inventory = linkInventoryRows(output);
  output = inventory.output;
  linked += inventory.linked;

  const bare = linkBareComponents(output);
  output = bare.output;
  linked += bare.linked;

  output = normalizePathLinks(output);

  // `` `[link](url)` `` → `[link](url)` (backticks break markdown links in tables)
  output = output.replace(/`(\[[^\]]+\]\([^)]+\))`/g, '$1');

  return { output, linked };
}

function main(): void {
  ensurePropLocationIndex();
  const stats = getIndexStats();
  console.info(`Index: ${stats.components} components, ${stats.types} types, ${stats.props} prop locations`);

  const files = globSync('*.md', { cwd: filteredDir, absolute: true }).sort();
  let totalLinked = 0;

  for (const file of files) {
    if (file.endsWith('CATEGORY_SUMMARY.md')) continue;

    const original = readFileSync(file, 'utf8');
    const { output, linked } = processMarkdown(original);
    if (output !== original) {
      writeFileSync(file, output);
      console.info(`✓  ${file.split('/').slice(-1)[0]} — ${linked} links`);
      totalLinked += linked;
    } else {
      console.info(`—  ${file.split('/').slice(-1)[0]} — no changes`);
    }
  }

  console.info(`Done: ${totalLinked} links added`);
}

main();

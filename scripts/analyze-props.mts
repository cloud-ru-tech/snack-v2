#!/usr/bin/env tsx
/**
 * Analyzes props-refactoring inventories.
 * Current scope: 2.1 Code-only (public components, no Figma).
 *
 * Run: pnpm analyze:props
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  analyzeCodeProps,
  type BoundaryRename,
  type ObjectShapeGroup,
  renderCodeAnalysisMarkdown,
} from './props-refactoring/analyze-code-props.mts';
import { readPropsMarkdown } from './props-refactoring/parse-props-md.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const publicPropsPath = resolve(root, 'props-refactoring/new/public-props.md');
const boundaryRenamesPath = resolve(root, 'props-refactoring/new/prop-boundary-renames.md');
const objectShapesPath = resolve(root, 'props-refactoring/new/object-shapes.md');
const outPath = resolve(root, 'props-refactoring/new/ANALYSIS.md');

function loadBoundaryRenames(path: string): BoundaryRename[] {
  if (!existsSync(path)) return [];
  const content = readFileSync(path, 'utf8');
  const renames: BoundaryRename[] = [];
  let sourceProp = '';
  let targetProp = '';

  for (const line of content.split('\n')) {
    const pairHeader = line.match(/^### `([^`]+) → ([^`]+)`/);
    if (pairHeader) {
      sourceProp = pairHeader[1];
      targetProp = pairHeader[2];
      continue;
    }

    const match = line.match(/^- ([a-z0-9-]+)\.([A-Za-z0-9]+) — `([^`]+):(\d+)`/);
    if (!match || !sourceProp || !targetProp) continue;

    renames.push({
      pkg: match[1],
      component: match[2],
      file: match[3],
      line: Number(match[4]),
      sourceProp,
      targetProp,
    });
  }

  return renames;
}

function loadObjectShapeGroups(path: string): ObjectShapeGroup[] {
  if (!existsSync(path)) return [];
  const content = readFileSync(path, 'utf8');
  const groups: ObjectShapeGroup[] = [];
  let current: ObjectShapeGroup | null = null;

  for (const line of content.split('\n')) {
    const header = line.match(/^### (\{ .+ \}) \((\d+)\)$/);
    if (header) {
      current = { signature: header[1], entries: [] };
      groups.push(current);
      continue;
    }

    if (!current) continue;
    const entry = line.match(/^- ([a-z0-9-]+\.[A-Za-z0-9]+)/);
    if (entry) current.entries.push(entry[1]);
  }

  return groups.filter(group => group.entries.length >= 2);
}

const doc = readPropsMarkdown(publicPropsPath);
const result = analyzeCodeProps(doc, {
  boundaryRenames: loadBoundaryRenames(boundaryRenamesPath),
  objectShapeGroups: loadObjectShapeGroups(objectShapesPath),
});

const markdown = renderCodeAnalysisMarkdown({
  generatedAt: new Date().toISOString(),
  stats: result.stats,
  categorySummary: result.categorySummary,
  conflicts: result.conflicts,
});

writeFileSync(outPath, markdown);

console.info(`→ ${outPath}`);
console.info(
  `   conflicts: P0=${result.conflicts.filter(c => c.priority === 'P0').length}, P1=${result.conflicts.filter(c => c.priority === 'P1').length}, P2=${result.conflicts.filter(c => c.priority === 'P2').length}, P3=${result.conflicts.filter(c => c.priority === 'P3').length}`,
);
console.info(`   text-like props indexed: ${result.stats.textProps}`);

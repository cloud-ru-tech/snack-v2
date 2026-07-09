#!/usr/bin/env tsx
/**
 * Scans packages for object shapes with text-like fields.
 * Output: props-refactoring/new/object-shapes.md
 *
 * Run: pnpm extract:object-shapes
 */

import { sync as globSync } from 'glob';
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

import { TEXT_LIKE_NAMES } from './props-refactoring/text-props.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outPath = resolve(root, 'props-refactoring/new/object-shapes.md');

const TEXT_FIELDS = new Set<string>(TEXT_LIKE_NAMES);

type ShapeEntry = {
  pkg: string;
  file: string;
  typeName: string;
  fields: string[];
};

function collectShapes(sourceFile: ts.SourceFile, pkg: string, file: string, shapes: ShapeEntry[]): void {
  const visit = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      const typeName = node.name.text;
      const fields: string[] = [];

      if (ts.isInterfaceDeclaration(node)) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            if (TEXT_FIELDS.has(name)) fields.push(name);
          }
        }
      }

      if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
        for (const member of node.type.members) {
          if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            if (TEXT_FIELDS.has(name)) fields.push(name);
          }
        }
      }

      if (fields.length >= 2) {
        shapes.push({ pkg, file, typeName, fields: fields.sort() });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

const tsFiles = globSync('packages/*/src/**/*.{ts,tsx}', {
  cwd: root,
  absolute: true,
  ignore: ['**/node_modules/**', '**/*.spec.ts', '**/*.spec.tsx', '**/__test__/**'],
}).sort();

const program = ts.createProgram(tsFiles, {
  target: ts.ScriptTarget.Latest,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.React,
  skipLibCheck: true,
});

const shapes: ShapeEntry[] = [];

for (const file of tsFiles) {
  const pkg = file.split('/packages/')[1]?.split('/')[0] ?? 'unknown';
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) continue;
  collectShapes(sourceFile, pkg, file.replace(`${root}/`, ''), shapes);
}

shapes.sort((a, b) => a.pkg.localeCompare(b.pkg) || a.typeName.localeCompare(b.typeName));

const fieldSignature = (fields: string[]) => `{ ${fields.join(', ')} }`;

const driftGroups = new Map<string, ShapeEntry[]>();
for (const shape of shapes) {
  const sig = fieldSignature(shape.fields);
  const list = driftGroups.get(sig) ?? [];
  list.push(shape);
  driftGroups.set(sig, list);
}

const generatedAt = new Date().toISOString();
const lines = [
  '# Object shapes with text-like fields',
  '',
  `- Generated: ${generatedAt}`,
  '- Command: `pnpm extract:object-shapes`',
  `- Shapes: ${shapes.length}`,
  '',
  '## Shapes by package',
  '',
];

let currentPkg = '';
for (const shape of shapes) {
  if (shape.pkg !== currentPkg) {
    currentPkg = shape.pkg;
    lines.push(`### ${currentPkg}`, '');
  }
  lines.push(`- \`${shape.typeName}\` ${fieldSignature(shape.fields)} — \`${shape.file}\``);
}
lines.push('');

lines.push('## Field signature groups (object-shape drift candidates)', '');
for (const [sig, group] of [...driftGroups.entries()].sort((a, b) => b[1].length - a[1].length)) {
  if (group.length < 2) continue;
  lines.push(`### ${sig} (${group.length})`, '');
  for (const item of group.slice(0, 15)) {
    lines.push(`- ${item.pkg}.${item.typeName}`);
  }
  if (group.length > 15) lines.push(`- … +${group.length - 15} more`);
  lines.push('');
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, lines.join('\n'));
console.info(`→ ${outPath}`);
console.info(`   shapes: ${shapes.length}, drift groups: ${[...driftGroups.values()].filter(g => g.length >= 2).length}`);

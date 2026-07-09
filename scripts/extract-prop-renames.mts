#!/usr/bin/env tsx
/**
 * Detects JSX prop boundary renames (source prop → different child prop name).
 * Output: props-refactoring/new/prop-boundary-renames.md
 *
 * Run: pnpm extract:prop-renames
 */

import { sync as globSync } from 'glob';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outPath = resolve(root, 'props-refactoring/new/prop-boundary-renames.md');

type BoundaryRename = {
  pkg: string;
  component: string;
  file: string;
  line: number;
  sourceProp: string;
  targetProp: string;
  expression: string;
};

function extractSourceProp(expression: ts.Expression): string | null {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression)) {
    return expression.expression.text;
  }
  if (ts.isCallExpression(expression) && expression.arguments.length === 1) {
    const arg = expression.arguments[0];
    if (ts.isIdentifier(arg)) return arg.text;
    if (ts.isPropertyAccessExpression(arg) && ts.isIdentifier(arg.expression)) {
      return arg.expression.text;
    }
  }
  return null;
}

function scanJsxAttributes(
  sourceFile: ts.SourceFile,
  attrs: ts.JsxAttributes,
  component: string,
  pkg: string,
  renames: BoundaryRename[],
): void {
  for (const attr of attrs.properties) {
    if (!ts.isJsxAttribute(attr) || !attr.initializer || !ts.isJsxExpression(attr.initializer)) continue;
    if (!attr.name || !ts.isIdentifier(attr.name)) continue;

    const targetProp = attr.name.text;
    const expression = attr.initializer.expression;
    if (!expression) continue;

    const sourceProp = extractSourceProp(expression);
    if (!sourceProp || sourceProp === targetProp) continue;

    const { line } = sourceFile.getLineAndCharacterOfPosition(attr.name.getStart(sourceFile));
    renames.push({
      pkg,
      component,
      file: sourceFile.fileName.replace(`${root}/`, ''),
      line: line + 1,
      sourceProp,
      targetProp,
      expression: expression.getText(sourceFile).slice(0, 80),
    });
  }
}

function scanFile(sourceFile: ts.SourceFile, pkg: string, renames: BoundaryRename[]): void {
  const component = basename(sourceFile.fileName, '.tsx');

  const visit = (node: ts.Node) => {
    if (ts.isJsxSelfClosingElement(node)) {
      scanJsxAttributes(sourceFile, node.attributes, component, pkg, renames);
    } else if (ts.isJsxOpeningElement(node)) {
      scanJsxAttributes(sourceFile, node.attributes, component, pkg, renames);
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

const tsxFiles = globSync('packages/*/src/**/*.tsx', {
  cwd: root,
  absolute: true,
  ignore: ['**/*.spec.tsx', '**/__test__/**'],
}).sort();

const renames: BoundaryRename[] = [];

for (const file of tsxFiles) {
  const pkg = file.split('/packages/')[1]?.split('/')[0] ?? 'unknown';
  const sourceFile = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  scanFile(sourceFile, pkg, renames);
}

renames.sort((a, b) => a.pkg.localeCompare(b.pkg) || a.component.localeCompare(b.component) || a.line - b.line);

const pairs = new Map<string, BoundaryRename[]>();
for (const item of renames) {
  const key = `${item.sourceProp} → ${item.targetProp}`;
  const list = pairs.get(key) ?? [];
  list.push(item);
  pairs.set(key, list);
}

const generatedAt = new Date().toISOString();
const lines = [
  '# Prop boundary renames (JSX)',
  '',
  `- Generated: ${generatedAt}`,
  '- Command: `pnpm extract:prop-renames`',
  `- Total: ${renames.length}`,
  '',
  '## By source → target pair',
  '',
];

for (const [pair, group] of [...pairs.entries()].sort((a, b) => b[1].length - a[1].length)) {
  lines.push(`### \`${pair}\` (${group.length})`, '');
  for (const item of group.slice(0, 12)) {
    lines.push(`- ${item.pkg}.${item.component} — \`${item.file}:${item.line}\` (\`${item.expression}\`)`);
  }
  if (group.length > 12) lines.push(`- … +${group.length - 12} more`);
  lines.push('');
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, lines.join('\n'));
console.info(`→ ${outPath}`);
console.info(`   renames: ${renames.length}, unique pairs: ${pairs.size}`);

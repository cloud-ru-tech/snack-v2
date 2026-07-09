#!/usr/bin/env tsx
/**
 * Aggregates docs/props.json per package into:
 * - props-refactoring/new/public-props.md
 * - props-refactoring/new/private-props.md
 *
 * Run: pnpm aggregate:props
 */

import { sync as globSync } from 'glob';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  createPropsProgram,
  getPackageExportedNames,
  isPublicComponent,
} from './props-refactoring/export-graph.mts';
import { buildPropsTypeRegistry, flattenComponentProps } from './props-refactoring/flatten-props.mts';
import {
  formatComponentBlock,
  formatMarkdownHeader,
  formatTextCensusAppendix,
} from './props-refactoring/format-props.mts';
import { buildComponentPathMap, inferSurface } from './props-refactoring/surface.mts';
import { classifyTypeSignature, isTextLikePropName, TEXT_LIKE_NAMES } from './props-refactoring/text-props.mts';
import type { ComponentDoc, PropsJson } from './props-refactoring/types.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'props-refactoring/new');

const propsFiles = globSync('packages/*/docs/props.json', { cwd: root, absolute: true }).sort();
const program = createPropsProgram(root);

type Bucket = {
  pkgName: string;
  displayName: string;
  props: ReturnType<typeof flattenComponentProps>;
  surface: ReturnType<typeof inferSurface>;
};

const publicBuckets: Bucket[] = [];
const privateBuckets: Bucket[] = [];

for (const propsFile of propsFiles) {
  const pkgName = propsFile.split('/packages/')[1]?.split('/')[0];
  if (!pkgName) continue;

  let docs: PropsJson;
  try {
    docs = JSON.parse(readFileSync(propsFile, 'utf8')) as PropsJson;
  } catch (error) {
    console.warn(`⚠  ${pkgName}: failed to read props.json — ${error}`);
    continue;
  }

  if (Object.keys(docs).length === 0) {
    console.info(`—  ${pkgName}: empty props.json, skipped`);
    continue;
  }

  const pkgDir = resolve(root, 'packages', pkgName);
  const exportedNames = program ? getPackageExportedNames(program, pkgDir) : new Set<string>();
  const pathMap = buildComponentPathMap(pkgDir);
  const registry = buildPropsTypeRegistry(docs);

  if (!existsSync(resolve(pkgDir, 'src/index.ts'))) {
    console.warn(`⚠  ${pkgName}: no src/index.ts, all components treated as private`);
  }

  for (const [displayName, doc] of Object.entries(docs)) {
    const flatProps = flattenComponentProps(doc as ComponentDoc, registry);
    const surface = inferSurface(pathMap.get(displayName), displayName);
    const bucket: Bucket = { pkgName, displayName, props: flatProps, surface };

    if (isPublicComponent(displayName, exportedNames, pkgName)) {
      publicBuckets.push(bucket);
    } else {
      privateBuckets.push(bucket);
    }
  }

  console.info(`✓  ${pkgName}: ${Object.keys(docs).length} components`);
}

publicBuckets.sort((a, b) => a.pkgName.localeCompare(b.pkgName) || a.displayName.localeCompare(b.displayName));
privateBuckets.sort((a, b) => a.pkgName.localeCompare(b.pkgName) || a.displayName.localeCompare(b.displayName));

const generatedAt = new Date().toISOString();
const countProps = (buckets: Bucket[]) => buckets.reduce((sum, item) => sum + Object.keys(item.props).length, 0);

function buildTextCensus(buckets: Bucket[]) {
  const census = new Map<string, { count: number; types: Set<string>; packages: Set<string> }>();

  for (const name of TEXT_LIKE_NAMES) {
    census.set(name, { count: 0, types: new Set(), packages: new Set() });
  }

  for (const bucket of buckets) {
    for (const [propName, def] of Object.entries(bucket.props)) {
      if (!isTextLikePropName(propName)) continue;
      const base = propName.includes('.') ? propName.split('.').at(-1)! : propName;
      const entry = census.get(base);
      if (!entry) continue;
      entry.count += 1;
      entry.types.add(classifyTypeSignature(def.type));
      entry.packages.add(bucket.pkgName);
    }
  }

  return [...census.entries()]
    .map(([name, data]) => ({ name, count: data.count, types: [...data.types].sort(), packages: data.packages }))
    .filter(row => row.count > 0)
    .sort((a, b) => b.count - a.count);
}

const publicBody = publicBuckets
  .map(item => formatComponentBlock(item.pkgName, item.displayName, item.props, item.surface))
  .join('\n\n');
const privateBody = privateBuckets
  .map(item => formatComponentBlock(item.pkgName, item.displayName, item.props, item.surface))
  .join('\n\n');

const textCensus = buildTextCensus(publicBuckets);

mkdirSync(outDir, { recursive: true });

const publicPath = resolve(outDir, 'public-props.md');
const privatePath = resolve(outDir, 'private-props.md');

writeFileSync(
  publicPath,
  [
    formatMarkdownHeader({
      title: 'Public component props (Code)',
      generatedAt,
      command: 'pnpm aggregate:props',
      packages: new Set(publicBuckets.map(item => item.pkgName)).size,
      components: publicBuckets.length,
      props: countProps(publicBuckets),
    }),
    publicBody,
    publicBody ? '\n' : '',
    formatTextCensusAppendix(textCensus),
  ].join('\n'),
);

writeFileSync(
  privatePath,
  [
    formatMarkdownHeader({
      title: 'Private component props (Code)',
      generatedAt,
      command: 'pnpm aggregate:props',
      packages: new Set(privateBuckets.map(item => item.pkgName)).size,
      components: privateBuckets.length,
      props: countProps(privateBuckets),
    }),
    privateBody,
    privateBody ? '\n' : '',
  ].join('\n'),
);

console.info(`\n→ ${publicPath}`);
console.info(`   public: ${publicBuckets.length} components, ${countProps(publicBuckets)} props`);
console.info(`→ ${privatePath}`);
console.info(`   private: ${privateBuckets.length} components, ${countProps(privateBuckets)} props`);

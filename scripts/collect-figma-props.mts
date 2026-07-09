#!/usr/bin/env tsx
/**
 * Collects Figma variant properties for public components via FIGMA_NODES map.
 *
 * Run: pnpm collect:figma-props
 * Output: props-refactoring/new/figma/public-props.md
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractFigmaAxes, fetchFigmaNode, figmaDesignUrl, sleep } from './props-refactoring/figma-api.mts';
import { buildFigmaTargets } from './props-refactoring/figma-targets.mts';
import { formatMarkdownHeader } from './props-refactoring/format-props.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'props-refactoring/new/figma');
const cacheDir = resolve(outDir, '.cache');
const publicPropsPath = resolve(root, 'props-refactoring/new/public-props.md');

function readPublicPackages(): Set<string> {
  if (!existsSync(publicPropsPath)) {
    throw new Error(`Missing ${publicPropsPath}. Run pnpm aggregate:props first.`);
  }

  const content = readFileSync(publicPropsPath, 'utf8');
  const packages = new Set<string>();
  for (const line of content.split('\n')) {
    const match = line.match(/^([a-z0-9-]+) \(/);
    if (match) packages.add(match[1]);
  }
  return packages;
}

function formatBlock(label: string, axes: ReturnType<typeof extractFigmaAxes>, url: string): string {
  const lines = [label];
  for (const axis of axes) {
    lines.push(`- ${axis.name}: ${axis.values.join(', ')}`);
  }
  lines.push(`<!-- figma: ${url} -->`);
  return lines.join('\n');
}

async function main() {
  const publicPackages = readPublicPackages();
  const targets = buildFigmaTargets(publicPackages);

  mkdirSync(cacheDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  const blocks: string[] = [];
  const errors: string[] = [];
  const fetched = new Set<string>();
  let totalAxes = 0;

  console.info(`Collecting Figma props for ${targets.length} targets (${publicPackages.size} public packages)…`);

  for (const target of targets) {
    const cachePath = resolve(cacheDir, `${target.cacheKey}.json`);

    try {
      let document;
      if (existsSync(cachePath)) {
        document = JSON.parse(readFileSync(cachePath, 'utf8'));
        console.info(`·  ${target.pkg}/${target.label} (cache)`);
      } else {
        if (!fetched.has(target.cacheKey)) {
          document = await fetchFigmaNode(target.ref);
          if (!document) throw new Error('empty document');
          writeFileSync(cachePath, JSON.stringify(document, null, 2));
          fetched.add(target.cacheKey);
          await sleep(250);
        } else {
          document = JSON.parse(readFileSync(cachePath, 'utf8'));
        }
        console.info(`✓  ${target.pkg}/${target.label}`);
      }

      const axes = extractFigmaAxes(document, target.label);
      if (axes.length === 0) {
        errors.push(`${target.pkg}/${target.label}: no variant axes found`);
        continue;
      }

      totalAxes += axes.length;
      blocks.push(formatBlock(target.label, axes, figmaDesignUrl(target.ref)));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${target.pkg}/${target.label}: ${message}`);
      console.warn(`⚠  ${target.pkg}/${target.label}: ${message}`);
    }
  }

  const generatedAt = new Date().toISOString();
  const outPath = resolve(outDir, 'public-props.md');

  const appendix =
    errors.length > 0
      ? ['\n## Appendix: errors\n', ...errors.map(item => `- ${item}`)].join('\n')
      : '';

  writeFileSync(
    outPath,
    [
      formatMarkdownHeader({
        title: 'Public component props (Figma)',
        generatedAt,
        command: 'pnpm collect:figma-props',
        packages: new Set(targets.map(item => item.pkg)).size,
        components: blocks.length,
        props: totalAxes,
      }),
      blocks.join('\n\n'),
      appendix,
      '\n',
    ].join('\n'),
  );

  console.info(`\n→ ${outPath}`);
  console.info(`   components: ${blocks.length}, axes: ${totalAxes}, errors: ${errors.length}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

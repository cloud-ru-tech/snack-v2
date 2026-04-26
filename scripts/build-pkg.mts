#!/usr/bin/env node
/**
 * Selective package build: `pnpm build:pkg <name>`.
 *
 * Rebuilds ONE package (tsc incremental + CSS + cjs-css-modules).
 * Faster than `pnpm build:packages` when iterating on a single package.
 * `tsc -b` respects project references, so dependencies are rebuilt too if needed.
 *
 * Usage:
 *   pnpm build:pkg tabs
 *   pnpm build:pkg button,typography      # multiple
 *   pnpm build:pkg @ds/tabs               # scope prefix accepted
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const raw = process.argv.slice(2).join(',');
if (!raw) {
  console.error('Usage: pnpm build:pkg <name>[,<name>...]');
  process.exit(2);
}

const names = raw
  .split(',')
  .map((s) => s.trim().replace(/^@ds\//, ''))
  .filter(Boolean);

for (const name of names) {
  const pkgDir = resolve(ROOT, 'packages', name);
  if (!existsSync(resolve(pkgDir, 'tsconfig.esm.json'))) {
    console.error(`Package not found: packages/${name}`);
    process.exit(1);
  }
}

function run(cmd: string, args: string[]): void {
  console.info(`\n$ ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// tsc -b picks up project references, so dependents get built too.
for (const name of names) {
  const base = `./packages/${name}`;
  run('pnpm', ['exec', 'tspc', '-b', `${base}/tsconfig.esm.json`, `${base}/tsconfig.cjs.json`]);
}

// Only this package's SCSS + css-module transforms.
for (const name of names) {
  run('pnpm', ['exec', 'tsx', 'scripts/compileCSS.ts', `--pkg=${name}`]);
  run('pnpm', ['exec', 'tsx', 'scripts/compileJsCssModules.ts', `--pkg=${name}`]);
}

console.info('\n✓ selective build complete');

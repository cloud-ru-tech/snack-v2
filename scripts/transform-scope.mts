#!/usr/bin/env node
/**
 * Rename npm scope across the monorepo right before `lerna publish`.
 *
 * In the repo packages live under `@ds/*` (working scope for internal dev),
 * but they must be published under a different scope (`@sbercloud/*` for the
 * internal Artifactory). An optional name-prefix is prepended to each package
 * slug to namespace this design system inside the shared scope — e.g.
 * `@ds/button` → `@sbercloud/snack-v2-button`. This script rewrites:
 *
 *   1. `packages/<pkg>/package.json`:
 *      - `name`: `<from>/<pkg>` → `<to>/<prefix><pkg>`
 *      - `dependencies` / `devDependencies` / `peerDependencies` /
 *        `optionalDependencies` keys: `<from>/<x>` → `<to>/<prefix><x>`
 *      - dep VALUES are left untouched: `workspace:*` / `workspace:^` /
 *        `workspace:~` and `catalog:` stay as-is. The pipeline runs
 *        `pnpm install` right after this rename (so the lockfile / node_modules
 *        relink under the new names), then publishes with `pnpm publish`, which
 *        resolves both protocols natively. This script only renames the scope;
 *        it does NOT resolve any dependency protocol.
 *
 *   2. `packages/<pkg>/**` (excluding `node_modules`), for files with ext
 *      `.js`, `.mjs`, `.cjs`, `.d.ts`, `.d.mts`, `.d.cts`, `.map`, `.scss`,
 *      `.css`: replaces every occurrence of `<from>/<x>` with `<to>/<prefix><x>`.
 *      We match `<from>/` followed by package-name chars, so the replacement
 *      is precise and not accidentally hitting unrelated strings.
 *
 *      Scanning the whole package dir (not just `dist/`) matters because
 *      several packages publish raw `.scss` sources outside `dist` — e.g.
 *      `@ds/materials` exposes `index.scss` + `src/**\/*.scss` via the `sass`
 *      export condition, and `*.module.scss` files under `src/` are published
 *      as-is (`files: [..., "src"]`) for the consumer's own bundler to
 *      compile. Both contain literal `@use '@ds/<pkg>/...'` that must be
 *      rewritten to the target scope, same as compiled `dist` output.
 *
 * Operates only on `packages/*`. `apps/*` and the repo root are not touched.
 * Idempotent: re-running with the same args is a no-op.
 *
 * Usage:
 *   pnpm exec tsx scripts/transform-scope.mts <from-scope> <to-scope> [<name-prefix>]
 *   pnpm exec tsx scripts/transform-scope.mts @ds @sbercloud
 *   pnpm exec tsx scripts/transform-scope.mts @ds @sbercloud snack-v2-
 *
 * Both scope arguments may be passed with or without leading `@`. The
 * name-prefix is taken verbatim (include any trailing separator like `-`).
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PACKAGES_DIR = resolve(ROOT, 'packages');
// apps/* тоже depend на @ds/* через workspace:*, и их package.json'ы должны
// быть переименованы вместе с packages — иначе после rename'а в packages,
// pnpm install натыкается на "no package named @ds/fonts in workspace".
const APPS_DIR = resolve(ROOT, 'apps');
const WORKSPACE_DIRS = [PACKAGES_DIR, APPS_DIR];

const PATCHABLE_FILE_EXTS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.d.ts',
  '.d.mts',
  '.d.cts',
  '.map',
  '.scss',
  '.css',
]);

function normalizeScope(raw: string | undefined, fallback: string): string {
  const s = (raw ?? fallback).trim();
  return s.startsWith('@') ? s : `@${s}`;
}

const fromScope = normalizeScope(process.argv[2], '@ds');
const toScope = normalizeScope(process.argv[3], '@sbercloud');
const namePrefix = process.argv[4] ?? '';

if (fromScope === toScope && namePrefix === '') {
  console.info(`[transform-scope] from === to (${fromScope}); nothing to do.`);
  process.exit(0);
}

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

const packageDirs = WORKSPACE_DIRS.flatMap((root) => {
  try {
    return readdirSync(root)
      .map((name) => join(root, name))
      .filter(isDir);
  } catch {
    return [];
  }
});

type Pkg = { dir: string; pkgJsonPath: string; raw: Record<string, unknown> };

const allPackages: Pkg[] = [];
for (const dir of packageDirs) {
  const pkgJsonPath = join(dir, 'package.json');
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as Record<string, unknown>;
  } catch {
    continue;
  }
  allPackages.push({ dir, pkgJsonPath, raw });
}

const renames = new Map<string, string>();
for (const { raw } of allPackages) {
  const name = raw.name;
  if (typeof name !== 'string') continue;
  if (!name.startsWith(`${fromScope}/`)) continue;
  const slug = name.slice(fromScope.length + 1);
  const renamed = `${toScope}/${namePrefix}${slug}`;
  renames.set(name, renamed);
}

if (renames.size === 0) {
  console.info(
    `[transform-scope] no packages with scope ${fromScope}/* found; nothing to do.`,
  );
  process.exit(0);
}

function rewriteDeps(deps: Record<string, string> | undefined):
  | { changed: boolean; next: Record<string, string> | undefined } {
  if (!deps) return { changed: false, next: deps };
  let changed = false;
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(deps)) {
    const renamed = renames.get(k);
    if (renamed) {
      // Переименовываем только КЛЮЧ (@ds/x → @sbercloud/snack-v2-x). Значение
      // (`workspace:^` / `catalog:`) оставляем как есть — его развернёт
      // `pnpm publish` после `pnpm install` (который пере-линкует воркспейс
      // под новыми именами).
      next[renamed] = v;
      changed = true;
    } else {
      next[k] = v;
    }
  }
  return { changed, next };
}

let pkgJsonUpdated = 0;
const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

for (const pkg of allPackages) {
  let changed = false;
  const raw = pkg.raw;

  const name = raw.name;
  if (typeof name === 'string' && renames.has(name)) {
    raw.name = renames.get(name);
    changed = true;
  }

  for (const field of DEP_FIELDS) {
    const current = raw[field] as Record<string, string> | undefined;
    const { changed: depsChanged, next } = rewriteDeps(current);
    if (depsChanged) {
      raw[field] = next;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(pkg.pkgJsonPath, `${JSON.stringify(raw, null, 2)}\n`, 'utf8');
    pkgJsonUpdated++;
  }
}

const fromPrefix = `${fromScope}/`;
const toPrefix = `${toScope}/${namePrefix}`;
// Match `<from>/<package-name>` inside string content. Package names per npm
// can include letters, digits, dot, hyphen, underscore (no slash). This pattern
// captures the trailing slug so we can preserve it.
const replaceRegex = new RegExp(
  `${fromPrefix.replace(/[/@]/g, '\\$&')}([a-zA-Z0-9._-]+)`,
  'g',
);

function getExt(file: string): string {
  const lower = file.toLowerCase();
  if (lower.endsWith('.d.mts')) return '.d.mts';
  if (lower.endsWith('.d.cts')) return '.d.cts';
  if (lower.endsWith('.d.ts')) return '.d.ts';
  const dot = lower.lastIndexOf('.');
  return dot === -1 ? '' : lower.slice(dot);
}

function walk(dir: string, files: string[]): void {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry === 'node_modules') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (PATCHABLE_FILE_EXTS.has(getExt(entry))) {
      files.push(full);
    }
  }
}

let filesPatched = 0;
let occurrencesReplaced = 0;
for (const pkg of allPackages) {
  const files: string[] = [];
  walk(pkg.dir, files);
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    let count = 0;
    const next = content.replace(replaceRegex, (_, slug: string) => {
      count++;
      return `${toPrefix}${slug}`;
    });
    if (count > 0) {
      writeFileSync(file, next, 'utf8');
      filesPatched++;
      occurrencesReplaced += count;
    }
  }
}

const toLabel = namePrefix ? `${toScope}/${namePrefix}*` : `${toScope}/*`;
console.info(
  `[transform-scope] ${fromScope}/* → ${toLabel}: ` +
    `${renames.size} packages renamed; ` +
    `${pkgJsonUpdated} package.json files updated; ` +
    `${filesPatched} files patched (${occurrencesReplaced} occurrences).`,
);

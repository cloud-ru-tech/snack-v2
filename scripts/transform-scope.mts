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
 *      - dep values: `workspace:*` / `workspace:^` / `workspace:~` are resolved
 *        to semver ranges (`^` / `~`) from the sibling package.json version;
 *        `catalog:` / `catalog:<alias>` — to the concrete version from
 *        `pnpm-workspace.yaml::catalog`.
 *        After the scope rename the packages are no longer workspace members
 *        for pnpm, so neither `pnpm publish` nor `lerna publish` would resolve
 *        these protocols — we resolve them here so the published package.json
 *        are self-contained.
 *
 *   2. `packages/<pkg>/dist/**` (`.js`, `.mjs`, `.cjs`, `.d.ts`, `.d.mts`,
 *      `.d.cts`, `.map`): replaces every occurrence of `<from>/<x>` with
 *      `<to>/<prefix><x>`. We match `<from>/` followed by package-name chars,
 *      so the replacement is precise and not accidentally hitting unrelated
 *      strings.
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

const DIST_FILE_EXTS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.d.ts',
  '.d.mts',
  '.d.cts',
  '.map',
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

// Парсим `catalog:` секцию из pnpm-workspace.yaml в Map<name, version>.
// Используется для замены `catalog:` / `catalog:default` / `catalog:<name>`
// в deps на конкретную версию. Без этого после переименования scope (где
// пакеты перестают быть workspace-членами для pnpm) `pnpm publish` оставит
// `catalog:` в опубликованном package.json — потребитель получит
// ERR_PNPM_SPEC_NOT_SUPPORTED_BY_ANY_RESOLVER.
const catalogMap = new Map<string, string>();
try {
  const wsYaml = readFileSync(resolve(ROOT, 'pnpm-workspace.yaml'), 'utf8');
  const catalogStart = wsYaml.search(/^catalog\s*:\s*$/m);
  if (catalogStart !== -1) {
    const rest = wsYaml.slice(catalogStart).split('\n').slice(1);
    for (const rawLine of rest) {
      // Окончание блока: либо пустая строка, либо строка не с отступом.
      if (rawLine.trim() === '' || (!rawLine.startsWith(' ') && !rawLine.startsWith('\t'))) {
        if (rawLine.trim() === '') continue;
        break;
      }
      const match = rawLine.match(/^\s+['"]?([^'":]+?)['"]?\s*:\s*['"]?([^'"]+?)['"]?\s*$/);
      if (match) catalogMap.set(match[1], match[2]);
    }
  }
} catch {
  // pnpm-workspace.yaml отсутствует — не страшно, просто не резолвим catalog:.
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
// Карта `renamed → version` для резолва `workspace:*` ссылок в semver-диапазон
// из package.json соседнего пакета (он только что прошёл через
// `lerna version prerelease`, version актуальна). Без этого `pnpm publish`
// требует второй `pnpm install` после transform-scope, чтобы resolver мог
// найти workspace-пакеты под новыми именами в node_modules.
const versions = new Map<string, string>();
for (const { raw } of allPackages) {
  const name = raw.name;
  if (typeof name !== 'string') continue;
  if (!name.startsWith(`${fromScope}/`)) continue;
  const slug = name.slice(fromScope.length + 1);
  const renamed = `${toScope}/${namePrefix}${slug}`;
  renames.set(name, renamed);
  if (typeof raw.version === 'string') {
    versions.set(renamed, raw.version);
  }
}

if (renames.size === 0) {
  console.info(
    `[transform-scope] no packages with scope ${fromScope}/* found; nothing to do.`,
  );
  process.exit(0);
}

function resolveWorkspaceSpec(spec: string, version: string): string {
  const range = spec.slice('workspace:'.length);
  if (range === '~') return `~${version}`;
  // workspace:*, workspace:^, workspace: (bare) — semver-compatible.
  return `^${version}`;
}

function resolveCatalogSpec(name: string, spec: string): string | null {
  // Поддерживаемые формы catalog-протокола:
  //   catalog:          → имя из ключа deps
  //   catalog:default   → имя из ключа deps (default-каталог)
  //   catalog:<alias>   → имя — alias из каталога (не используем у себя, но поддержим)
  const colonAt = spec.indexOf(':');
  const tail = colonAt === -1 ? '' : spec.slice(colonAt + 1);
  const lookupName = tail === '' || tail === 'default' ? name : tail;
  return catalogMap.get(lookupName) ?? null;
}

function rewriteDeps(deps: Record<string, string> | undefined):
  | { changed: boolean; next: Record<string, string> | undefined } {
  if (!deps) return { changed: false, next: deps };
  let changed = false;
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(deps)) {
    // `catalog:` резолвим для ЛЮБОГО dep (а не только переименованных), потому
    // что после переименования scope пакеты перестают быть workspace-членами
    // для pnpm, и `pnpm publish` не подставит конкретную версию автоматически.
    let value = v;
    if (value.startsWith('catalog:')) {
      const resolved = resolveCatalogSpec(k, value);
      if (resolved) {
        value = resolved;
        changed = true;
      }
    }

    const renamed = renames.get(k);
    if (renamed) {
      // Резолвим `workspace:*` / `workspace:^` / `workspace:~` в semver-диапазон
      // из package.json соседнего workspace-пакета. Иначе `pnpm publish` после
      // transform-scope падает с ERR_PNPM_CANNOT_RESOLVE_WORKSPACE_PROTOCOL:
      // lockfile и node_modules ещё указывают на старые имена @ds/*, и резолвер
      // не находит пакет под новым именем @sbercloud/snack-v2-*.
      let resolved = value;
      if (value.startsWith('workspace:')) {
        const version = versions.get(renamed);
        if (version) resolved = resolveWorkspaceSpec(value, version);
      }
      next[renamed] = resolved;
      changed = true;
    } else {
      next[k] = value;
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
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (DIST_FILE_EXTS.has(getExt(entry))) {
      files.push(full);
    }
  }
}

let distFilesPatched = 0;
let distOccurrencesReplaced = 0;
for (const pkg of allPackages) {
  const distDir = join(pkg.dir, 'dist');
  if (!isDir(distDir)) continue;
  const files: string[] = [];
  walk(distDir, files);
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    let count = 0;
    const next = content.replace(replaceRegex, (_, slug: string) => {
      count++;
      return `${toPrefix}${slug}`;
    });
    if (count > 0) {
      writeFileSync(file, next, 'utf8');
      distFilesPatched++;
      distOccurrencesReplaced += count;
    }
  }
}

const toLabel = namePrefix ? `${toScope}/${namePrefix}*` : `${toScope}/*`;
console.info(
  `[transform-scope] ${fromScope}/* → ${toLabel}: ` +
    `${renames.size} packages renamed; ` +
    `${pkgJsonUpdated} package.json files updated; ` +
    `${distFilesPatched} dist files patched (${distOccurrencesReplaced} occurrences).`,
);

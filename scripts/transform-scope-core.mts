/**
 * Core logic for `transform-scope.mts`, split out so it can be unit-tested
 * without executing the CLI (mirrors the `gen-props` / `gen-props-output` split).
 *
 * The CLI wrapper parses argv and calls {@link transformScope}; the tests build
 * a throwaway fixture tree and call the same function, plus exercise the pure
 * helpers (`normalizeScope`, `buildRenames`, `rewriteDeps`, `replaceScopeInText`)
 * directly. See `transform-scope.mts` for the full behavioural contract.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';

// Text extensions whose CONTENT may carry a `<from>/<pkg>` scope reference and
// therefore needs the raw replace. Covers both the built `dist/**` output
// (`.js`/`.d.ts`/`.map`) and the shipped `src/**` sources (`.ts`/`.tsx` imports,
// `.scss`/`.css` `@use`). Anything not listed here is copied to the tarball
// verbatim (audited: shipped `.css`/`.json`/`.svg` under `dist` carry no
// scope refs, and `figma-variables/build/**` is scope-clean).
export const PATCH_FILE_EXTS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.d.ts',
  '.d.mts',
  '.d.cts',
  '.map',
  '.ts',
  '.tsx',
  '.scss',
  '.css',
  '.md',
]);

// Basenames that are shipped but must NOT get the text replace:
// - `package.json` is rewritten structurally (keeps dep VALUES intact).
// - `CHANGELOG.md` is a historical commit log; per repo policy we leave old
//   `@ds/*` mentions in history untouched (rewriting bloats the diff and
//   rewrites the past for no consumer-facing benefit).
export const PATCH_SKIP_BASENAMES = new Set(['package.json', 'CHANGELOG.md']);

const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

export type TransformScopeOptions = {
  /** Monorepo root; `<rootDir>/packages` and `<rootDir>/apps` are scanned. */
  rootDir: string;
  /** Source scope, normalized with a leading `@` (e.g. `@ds`). */
  fromScope: string;
  /** Target scope, normalized with a leading `@` (e.g. `@cloud-ru`). */
  toScope: string;
  /** Slug prefix prepended after the target scope (e.g. `ds-`). Verbatim. */
  namePrefix?: string;
};

export type TransformScopeSummary = {
  /** `<from>/<slug>` → `<to>/<prefix><slug>` for every workspace package. */
  renames: Map<string, string>;
  pkgJsonUpdated: number;
  shippedFilesPatched: number;
  shippedOccurrencesReplaced: number;
};

/** Add a leading `@` if the caller passed the scope bare (`ds` → `@ds`). */
export function normalizeScope(raw: string | undefined, fallback: string): string {
  const s = (raw ?? fallback).trim();
  return s.startsWith('@') ? s : `@${s}`;
}

/**
 * Map every workspace package name under `<fromScope>/` to its published name.
 * Only names actually present in the workspace are mapped — this drives the
 * package.json dep-KEY rename (the tarball text replace is broader; see
 * {@link makeReplaceRegex}).
 */
export function buildRenames(
  pkgNames: Iterable<string>,
  fromScope: string,
  toScope: string,
  namePrefix = '',
): Map<string, string> {
  const renames = new Map<string, string>();
  const prefix = `${fromScope}/`;
  for (const name of pkgNames) {
    if (typeof name !== 'string' || !name.startsWith(prefix)) continue;
    const slug = name.slice(prefix.length);
    renames.set(name, `${toScope}/${namePrefix}${slug}`);
  }
  return renames;
}

/**
 * Rename dependency KEYS (`@ds/x` → `@to/prefix-x`) using {@link buildRenames}.
 * Values (`workspace:^`, `catalog:`, …) are preserved verbatim — `pnpm publish`
 * resolves them after the post-rename `pnpm install`.
 */
export function rewriteDeps(
  deps: Record<string, string> | undefined,
  renames: Map<string, string>,
): { changed: boolean; next: Record<string, string> | undefined } {
  if (!deps) return { changed: false, next: deps };
  let changed = false;
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(deps)) {
    const renamed = renames.get(k);
    if (renamed) {
      next[renamed] = v;
      changed = true;
    } else {
      next[k] = v;
    }
  }
  return { changed, next };
}

/**
 * Match `<from>/<package-name>` inside string content. Package names per npm
 * can include letters, digits, dot, hyphen, underscore (no slash), so the
 * captured slug stops at the first `/` — preserving any subpath after it
 * (`@ds/figma-variables/build/scss` → `@to/prefix-figma-variables/build/scss`).
 */
export function makeReplaceRegex(fromScope: string): RegExp {
  const fromPrefix = `${fromScope}/`.replace(/[/@]/g, '\\$&');
  return new RegExp(`${fromPrefix}([a-zA-Z0-9._-]+)`, 'g');
}

/** Apply {@link makeReplaceRegex} to text, returning the count of replacements. */
export function replaceScopeInText(
  content: string,
  regex: RegExp,
  toPrefix: string,
): { count: number; next: string } {
  let count = 0;
  const next = content.replace(regex, (_, slug: string) => {
    count++;
    return `${toPrefix}${slug}`;
  });
  return { count, next };
}

/** Last path segment, cross-platform (handles both `/` and `\`). */
export function basename(p: string): string {
  const idx = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
  return idx === -1 ? p : p.slice(idx + 1);
}

/** File extension, treating `.d.ts` / `.d.mts` / `.d.cts` as single units. */
export function getExt(file: string): string {
  const lower = file.toLowerCase();
  if (lower.endsWith('.d.mts')) return '.d.mts';
  if (lower.endsWith('.d.cts')) return '.d.cts';
  if (lower.endsWith('.d.ts')) return '.d.ts';
  const dot = lower.lastIndexOf('.');
  return dot === -1 ? '' : lower.slice(dot);
}

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function isFile(p: string): boolean {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
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
    if (isDir(full)) {
      walk(full, files);
    } else if (PATCH_FILE_EXTS.has(getExt(entry)) && !PATCH_SKIP_BASENAMES.has(entry)) {
      files.push(full);
    }
  }
}

/**
 * The exact tarball contents to text-patch, derived from the package's own
 * `files` field so this tracks packaging changes. Directory entries (`dist`,
 * `src`, `build/css`, …) are walked; explicit file entries (`index.scss`,
 * `README.md`, …) are collected directly. npm always ships `README.md`
 * regardless of `files`, so it is added unconditionally. `package.json` /
 * `CHANGELOG.md` are filtered out by {@link PATCH_SKIP_BASENAMES}.
 */
export function collectShippedFiles(
  pkgDir: string,
  filesField: unknown,
): string[] {
  const roots = new Set<string>([
    ...(Array.isArray(filesField) ? (filesField as string[]) : ['dist', 'src']),
    'README.md',
  ]);
  const collected: string[] = [];
  for (const entry of roots) {
    const full = join(pkgDir, entry);
    if (isDir(full)) {
      walk(full, collected);
    } else if (
      isFile(full) &&
      PATCH_FILE_EXTS.has(getExt(full)) &&
      !PATCH_SKIP_BASENAMES.has(basename(full))
    ) {
      collected.push(full);
    }
  }
  // Dedup in case two `files` roots overlap (idempotent anyway, but avoids
  // double IO and inflated counts).
  return [...new Set(collected)];
}

type Pkg = { dir: string; pkgJsonPath: string; raw: Record<string, unknown> };

function readWorkspacePackages(dirs: string[]): Pkg[] {
  const found: Pkg[] = [];
  for (const root of dirs) {
    let entries: string[];
    try {
      entries = readdirSync(root);
    } catch {
      continue;
    }
    for (const name of entries) {
      const dir = join(root, name);
      if (!isDir(dir)) continue;
      const pkgJsonPath = join(dir, 'package.json');
      let raw: Record<string, unknown>;
      try {
        raw = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as Record<string, unknown>;
      } catch {
        continue;
      }
      found.push({ dir, pkgJsonPath, raw });
    }
  }
  return found;
}

/**
 * Full rename pass over `<rootDir>/packages` and `<rootDir>/apps`. Returns a
 * summary; performs no logging (the CLI wrapper prints it). See the
 * `transform-scope.mts` docblock for the behavioural contract.
 *
 * `renames.size === 0` (nothing under `<fromScope>/`) short-circuits to an
 * empty summary — this is what makes a second run a clean no-op.
 */
export function transformScope(opts: TransformScopeOptions): TransformScopeSummary {
  const { rootDir, fromScope, toScope, namePrefix = '' } = opts;
  const packagesDir = join(rootDir, 'packages');
  // apps/* also depend on @ds/* via workspace:*, so their package.json must be
  // renamed alongside packages — otherwise the post-rename `pnpm install` hits
  // "no package named @ds/fonts in workspace". Their sources never ship, so
  // only the package.json is touched, not their file contents.
  const appsDir = join(rootDir, 'apps');

  const allPackages = readWorkspacePackages([packagesDir, appsDir]);
  const renames = buildRenames(
    allPackages.map((p) => p.raw.name).filter((n): n is string => typeof n === 'string'),
    fromScope,
    toScope,
    namePrefix,
  );

  const empty: TransformScopeSummary = {
    renames,
    pkgJsonUpdated: 0,
    shippedFilesPatched: 0,
    shippedOccurrencesReplaced: 0,
  };
  if (renames.size === 0) return empty;

  // 1. Rewrite package.json name + dep KEYS (structural, values preserved).
  let pkgJsonUpdated = 0;
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
      const { changed: depsChanged, next } = rewriteDeps(current, renames);
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

  // 2. Text-patch every shipped file of each PUBLISHED package.
  const regex = makeReplaceRegex(fromScope);
  const toPrefix = `${toScope}/${namePrefix}`;
  const packagesPrefix = packagesDir + sep;
  let shippedFilesPatched = 0;
  let shippedOccurrencesReplaced = 0;
  for (const pkg of allPackages) {
    // Only `packages/*` produce tarballs. `apps/*` are private (not published),
    // so their sources never ship.
    if (!pkg.dir.startsWith(packagesPrefix)) continue;
    for (const file of collectShippedFiles(pkg.dir, pkg.raw.files)) {
      const content = readFileSync(file, 'utf8');
      const { count, next } = replaceScopeInText(content, regex, toPrefix);
      if (count > 0) {
        writeFileSync(file, next, 'utf8');
        shippedFilesPatched++;
        shippedOccurrencesReplaced += count;
      }
    }
  }

  return { renames, pkgJsonUpdated, shippedFilesPatched, shippedOccurrencesReplaced };
}

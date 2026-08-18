/**
 * Core logic for `transform-static-scope.mts`, split out so it can be unit-tested
 * without executing the CLI (mirrors the `transform-scope` / `transform-scope-core`
 * split). See the CLI file for the full behavioural contract.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

import { buildRenames, getExt } from './transform-scope-core.mts';

/**
 * Text extensions of the built static output that may carry a scope reference:
 * pre-rendered pages (`.html`), client bundles and Storybook's story sources
 * (`.js` / `.mjs` / `.cjs`), Storybook manifests and docgen payloads (`.json`),
 * `llms.txt` (`.txt`), and content served as-is (`.css` / `.md`).
 */
export const PATCH_FILE_EXTS = new Set(['.html', '.js', '.mjs', '.cjs', '.json', '.txt', '.css', '.md']);

/**
 * Output paths left untouched. The contribution guide is written for people who
 * develop the design system itself, so `@ds/*` there is the WORKING scope and
 * renaming it to the published one makes the text wrong.
 */
export const SKIP_PATH_FRAGMENTS = ['patterns/contribution-guide'];

/** Where pagefind ≥1 writes its index inside the site root. */
export const PAGEFIND_DIR = 'pagefind';

/** What `apps/docs/scripts/precompress.mjs` compresses: same extensions, same floor. */
const PRECOMPRESS_EXTS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt']);
const PRECOMPRESS_MIN_SIZE = 1024;

export type TransformStaticScopeOptions = {
  /** Built static output to patch in place (docs + Storybook, already merged). */
  staticDir: string;
  /** Workspace package names, e.g. `['@ds/button', …]` — the only slugs replaced. */
  packageNames: Iterable<string>;
  /** Source scope with a leading `@` (e.g. `@ds`). */
  fromScope: string;
  /** Target scope with a leading `@` (e.g. `@cloud-ru`). */
  toScope: string;
  /** Slug prefix prepended after the target scope (e.g. `ds-`). Verbatim. */
  namePrefix?: string;
};

export type TransformStaticScopeSummary = {
  renames: Map<string, string>;
  filesScanned: number;
  filesPatched: number;
  occurrencesReplaced: number;
  /** `.gz` / `.br` siblings regenerated after their source file changed. */
  precompressedRefreshed: number;
  /** Whether the pagefind search index was rebuilt from the patched pages. */
  pagefindReindexed: boolean;
};

/** Every `@ds/*` name that lives in `packages/` — `apps/*` never reach the site. */
export function collectWorkspacePackageNames(packagesDir: string): string[] {
  const names: string[] = [];
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifest = join(packagesDir, entry.name, 'package.json');
    try {
      const pkg = JSON.parse(readFileSync(manifest, 'utf8')) as { name?: string };
      if (typeof pkg.name === 'string') names.push(pkg.name);
    } catch {
      // No manifest (or unreadable) — not a workspace package, skip.
    }
  }
  return names;
}

/**
 * Replace `<from>/<slug>` only for slugs that exist in `renames`. Unknown slugs
 * are left as-is, which is what keeps intact both the prose about the working
 * scope itself (`пакеты @ds/*`, `--keep-scope` — `*` is not a package) and
 * runtime identifiers that merely look scoped (`Symbol.for('@ds/supports-inner-ref')`
 * from `withInnerRefSupport`).
 *
 * The slug excludes `.` even though npm allows it: no workspace package uses a
 * dot, while prose ends sentences with one (`обёртка над @ds/card.`), and
 * capturing it would push the name out of the map.
 */
export function replaceKnownScope(
  content: string,
  renames: Map<string, string>,
  fromScope: string,
): { count: number; next: string } {
  const escaped = `${fromScope}/`.replace(/[/@]/g, '\\$&');
  const regex = new RegExp(`${escaped}([a-zA-Z0-9_-]+)`, 'g');
  let count = 0;
  const next = content.replace(regex, (match, slug: string) => {
    const renamed = renames.get(`${fromScope}/${slug}`);
    if (!renamed) return match;
    count++;
    return renamed;
  });
  return { count, next };
}

function writeCompressedSiblings(file: string, buf: Buffer): number {
  writeFileSync(`${file}.gz`, gzipSync(buf, { level: 9 }));
  writeFileSync(
    `${file}.br`,
    brotliCompressSync(buf, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 10,
        [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
      },
    }),
  );
  return 2;
}

/**
 * `apps/docs/scripts/precompress.mjs` writes `.gz` / `.br` siblings for nginx
 * `gzip_static` / `brotli_static`, so patching a file makes them stale. Rebuilt
 * with the same settings the docs build uses; files the build did not compress
 * (Storybook output, anything under the size floor) are left without siblings.
 */
function refreshPrecompressed(file: string, content: string): number {
  if (!existsSync(`${file}.gz`) && !existsSync(`${file}.br`)) return 0;
  return writeCompressedSiblings(file, Buffer.from(content));
}

/**
 * pagefind indexes the pages during the Astro build, so its index still carries
 * the working scope after the patch — search would not match the published name.
 * The index is a binary format keyed by byte offsets, so it is rebuilt from the
 * patched pages instead of edited. Only pages carrying `data-pagefind-body`
 * (set by the docs layout) are indexed, so Storybook under `storybook/` stays out
 * of the index exactly as it was during the build.
 */
function reindexPagefind(staticDir: string): boolean {
  const indexDir = join(staticDir, PAGEFIND_DIR);
  if (!existsSync(indexDir)) return false;
  // pagefind writes hash-named chunks and does not clear the directory, so the
  // stale index would ship alongside the new one.
  rmSync(indexDir, { recursive: true });
  execFileSync('pnpm', ['exec', 'pagefind', '--site', staticDir], { stdio: 'inherit' });
  return true;
}

function isSkipped(path: string): boolean {
  const normalized = path.split(sep).join('/');
  return SKIP_PATH_FRAGMENTS.some(fragment => normalized.includes(fragment));
}

function walk(dir: string, files: string[], exts: Set<string>): void {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files, exts);
    else if (exts.has(getExt(entry))) files.push(full);
  }
}

export function transformStaticScope(opts: TransformStaticScopeOptions): TransformStaticScopeSummary {
  const { staticDir, packageNames, fromScope, toScope, namePrefix = '' } = opts;
  const renames = buildRenames(packageNames, fromScope, toScope, namePrefix);
  const summary: TransformStaticScopeSummary = {
    renames,
    filesScanned: 0,
    filesPatched: 0,
    occurrencesReplaced: 0,
    precompressedRefreshed: 0,
    pagefindReindexed: false,
  };
  if (renames.size === 0) return summary;

  const files: string[] = [];
  walk(staticDir, files, PATCH_FILE_EXTS);

  for (const file of files) {
    if (isSkipped(file)) continue;
    summary.filesScanned++;
    const content = readFileSync(file, 'utf8');
    const { count, next } = replaceKnownScope(content, renames, fromScope);
    if (count === 0) continue;
    writeFileSync(file, next);
    summary.filesPatched++;
    summary.occurrencesReplaced += count;
    summary.precompressedRefreshed += refreshPrecompressed(file, next);
  }

  if (summary.filesPatched > 0) {
    summary.pagefindReindexed = reindexPagefind(staticDir);
    if (summary.pagefindReindexed) {
      // The index was rebuilt from scratch, so its siblings are gone with the old
      // directory — recreate them the way the docs build would have.
      const indexFiles: string[] = [];
      walk(join(staticDir, PAGEFIND_DIR), indexFiles, PRECOMPRESS_EXTS);
      for (const file of indexFiles) {
        const buf = readFileSync(file);
        if (buf.length < PRECOMPRESS_MIN_SIZE) continue;
        summary.precompressedRefreshed += writeCompressedSiblings(file, buf);
      }
    }
  }

  return summary;
}

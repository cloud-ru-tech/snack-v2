#!/usr/bin/env node
/**
 * Rename the npm scope inside the ALREADY BUILT static site (documentation +
 * Storybook) right before it is deployed to GitHub Pages.
 *
 * `transform-scope.mts` covers the npm tarball only: it patches what each
 * package's `files` field ships (`dist`, `src`, `README.md`). The site is built
 * from sources that never ship — `packages/<pkg>/docs/*.mdx` (prose and the
 * `pnpm add @ds/<pkg>` snippet), `demos/**` (rendered through `?raw`) and
 * `stories/**` (Storybook Source panel) — so a reader of the published site is
 * told to install a package name that does not exist on the registry.
 *
 * Running `transform-scope.mts` before the build is not an option: both alias
 * collectors key off `name.startsWith('@ds/')` (`apps/docs/astro.config.mjs`,
 * `apps/storybook/.storybook/main.ts`), so renaming the manifests first leaves
 * the build with zero aliases and it fails. After the build every module is
 * already resolved and bundled, so `@ds/*` survives only inside display text —
 * a text replace there is safe.
 *
 * Only slugs that exist as workspace packages are replaced, and the contribution
 * guide is skipped entirely (see `SKIP_PATH_FRAGMENTS`): both keep text ABOUT
 * the working scope intact.
 *
 * The pagefind search index is rebuilt afterwards, otherwise search would keep
 * matching the working scope only (see `reindexPagefind`).
 *
 * Usage:
 *   pnpm exec tsx scripts/transform-static-scope.mts <static-dir> [<from>] [<to>] [<prefix>]
 *   pnpm run transform:static-scope
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeScope } from './transform-scope-core.mts';
import { collectWorkspacePackageNames, transformStaticScope } from './transform-static-scope-core.mts';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const staticDirArg = process.argv[2];
if (!staticDirArg) {
  console.error('[transform-static-scope] usage: transform-static-scope.mts <static-dir> [<from>] [<to>] [<prefix>]');
  process.exit(1);
}
const staticDir = resolve(rootDir, staticDirArg);

const fromScope = normalizeScope(process.argv[3], '@ds');
const toScope = normalizeScope(process.argv[4], '@cloud-ru');
const namePrefix = process.argv[5] ?? '';

if (fromScope === toScope && namePrefix === '') {
  console.info(`[transform-static-scope] from === to (${fromScope}); nothing to do.`);
  process.exit(0);
}

const packageNames = collectWorkspacePackageNames(resolve(rootDir, 'packages'));
const summary = transformStaticScope({ staticDir, packageNames, fromScope, toScope, namePrefix });

if (summary.renames.size === 0) {
  console.info(`[transform-static-scope] no packages with scope ${fromScope}/* found; nothing to do.`);
  process.exit(0);
}

const toLabel = namePrefix ? `${toScope}/${namePrefix}*` : `${toScope}/*`;
console.info(
  `[transform-static-scope] ${fromScope}/* → ${toLabel} in ${staticDirArg}: ` +
    `${summary.filesPatched} of ${summary.filesScanned} files patched ` +
    `(${summary.occurrencesReplaced} occurrences, ` +
    `${summary.precompressedRefreshed} precompressed siblings refreshed, ` +
    `pagefind index ${summary.pagefindReindexed ? 'rebuilt' : 'absent'}).`,
);

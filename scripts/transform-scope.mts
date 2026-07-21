#!/usr/bin/env node
/**
 * Rename npm scope across the monorepo right before `pnpm publish`.
 *
 * In the repo packages live under `@ds/*` (working scope for internal dev),
 * but they must be published under a different scope (`@cloud-ru/ds-*` for the
 * public registry). An optional name-prefix is prepended to each package slug
 * to namespace this design system inside the shared scope — e.g.
 * `@ds/button` → `@cloud-ru/ds-button`. This script rewrites:
 *
 *   1. `packages/<pkg>/package.json` (and `apps/<app>/package.json`):
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
 *   2. Every OTHER shipped file of each `packages/*` — the actual tarball
 *      contents — gets a raw text replace of `<from>/<x>` → `<to>/<prefix><x>`.
 *      We match `<from>/` followed by package-name chars, so the replacement is
 *      precise and not accidentally hitting unrelated strings.
 *
 *      The set of shipped files is derived from each package's own `files`
 *      field (plus npm's implicit `README.md`), so this stays correct as
 *      packaging changes. It matters because most packages ship BOTH `dist`
 *      AND `src` (`files: ["dist","src"]`, with `exports.source`/`exports.sass`
 *      pointing straight into `src`). Without patching `src/**`, consumers who
 *      resolve the `source`/`sass` conditions — or read the shipped `README.md`
 *      — would see the un-rewritten `@ds/*` scope, which does not exist on the
 *      registry. Concretely we patch, per shipped root:
 *      - `dist/**` — `.js`, `.mjs`, `.cjs`, `.d.ts`, `.d.mts`, `.d.cts`, `.map`
 *      - `src/**`  — `.ts`, `.tsx` (`import … from '@ds/*'`) and `.scss`/`.css`
 *        (`@use '@ds/figma-variables/…'`, `@use '@ds/materials/…'`)
 *      - package-root shipped files listed in `files` (e.g. `materials/index.scss`)
 *      - `README.md` (shipped by npm regardless of `files`)
 *
 *      `package.json` (handled structurally in step 1) and `CHANGELOG.md`
 *      (historical log — left as-is, matching the repo's changelog policy) are
 *      never touched by the text replace. `apps/*` are private, so only their
 *      package.json is renamed (step 1) — their sources never ship.
 *
 * Idempotent: re-running with the same args is a no-op (no `<from>/` package
 * names left in the workspace to build renames from).
 *
 * The actual work lives in `transform-scope-core.mts` so it can be unit-tested
 * (`scripts/__tests__/transform-scope.test.ts`); this file is the CLI shell.
 *
 * Usage:
 *   pnpm exec tsx scripts/transform-scope.mts <from-scope> <to-scope> [<name-prefix>]
 *   pnpm exec tsx scripts/transform-scope.mts @ds @cloud-ru
 *   pnpm exec tsx scripts/transform-scope.mts @ds @cloud-ru ds-
 *
 * Both scope arguments may be passed with or without leading `@`. The
 * name-prefix is taken verbatim (include any trailing separator like `-`).
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeScope, transformScope } from './transform-scope-core.mts';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const fromScope = normalizeScope(process.argv[2], '@ds');
// Bare-invocation fallback only — the pipeline always passes scope args
// explicitly (see the `transform:scope` script in package.json). Defaults match
// the public publish target `@cloud-ru` + `ds-` (`@ds/button` → `@cloud-ru/ds-button`).
const toScope = normalizeScope(process.argv[3], '@cloud-ru');
const namePrefix = process.argv[4] ?? '';

if (fromScope === toScope && namePrefix === '') {
  console.info(`[transform-scope] from === to (${fromScope}); nothing to do.`);
  process.exit(0);
}

const summary = transformScope({ rootDir, fromScope, toScope, namePrefix });

if (summary.renames.size === 0) {
  console.info(
    `[transform-scope] no packages with scope ${fromScope}/* found; nothing to do.`,
  );
  process.exit(0);
}

const toLabel = namePrefix ? `${toScope}/${namePrefix}*` : `${toScope}/*`;
console.info(
  `[transform-scope] ${fromScope}/* → ${toLabel}: ` +
    `${summary.renames.size} packages renamed; ` +
    `${summary.pkgJsonUpdated} package.json files updated; ` +
    `${summary.shippedFilesPatched} shipped files patched ` +
    `(${summary.shippedOccurrencesReplaced} occurrences).`,
);

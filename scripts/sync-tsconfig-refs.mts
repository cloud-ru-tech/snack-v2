#!/usr/bin/env node
/**
 * Sync the root build references (`packages/tsconfig.{esm,cjs}.json`) with
 * the actual workspace-dep graph, topologically sorted.
 *
 * Why: `tsc -b` builds the projects in the order they appear in `references`
 * (no per-project references exist in this repo, by design). On a cold CI
 * `tsc` then tries to resolve `@ds/status` from `node_modules/@ds/status/
 * dist/esm/index.d.ts` — which is empty if `status` is built **after** its
 * downstream consumer (`@ds/avatar`). The fix is to keep the root list in a
 * valid topological order: workspace-upstream packages come first.
 *
 * What it does:
 *   1. Reads every `packages/<pkg>/package.json` that has `tsconfig.esm.json`
 *      (so private SCSS-only `@ds/fonts` is skipped — nothing to build).
 *   2. Builds a graph: pkg → its workspace:* deps (only `dependencies` and
 *      `peerDependencies`, devDeps don't affect build order).
 *   3. Topological sort (Kahn's algorithm, ties broken alphabetically for
 *      deterministic output).
 *   4. Rewrites `references` in `packages/tsconfig.esm.json` and
 *      `packages/tsconfig.cjs.json` with this order.
 *   5. Per-package `tsconfig.{esm,cjs}.json` are NOT touched.
 *
 * Idempotent. Run after adding a new package or a new workspace dep.
 *
 * Usage:
 *   pnpm exec tsx scripts/sync-tsconfig-refs.mts
 *   pnpm gen:tsconfig-refs
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PACKAGES_DIR = resolve(ROOT, 'packages');

type PkgJson = {
  name?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

const packageDirs = readdirSync(PACKAGES_DIR)
  .map((name) => join(PACKAGES_DIR, name))
  .filter(isDir);

type Pkg = { slug: string; name: string };
const pkgs: Pkg[] = [];
const nameToSlug = new Map<string, string>();
const slugToDeps = new Map<string, string[]>();

for (const dir of packageDirs) {
  if (!existsSync(join(dir, 'tsconfig.esm.json'))) continue;
  const pjPath = join(dir, 'package.json');
  let pj: PkgJson;
  try {
    pj = JSON.parse(readFileSync(pjPath, 'utf8')) as PkgJson;
  } catch {
    continue;
  }
  if (!pj.name) continue;
  const slug = dir.slice(PACKAGES_DIR.length + 1);
  pkgs.push({ slug, name: pj.name });
  nameToSlug.set(pj.name, slug);
}

for (const { slug, name } of pkgs) {
  const dir = join(PACKAGES_DIR, slug);
  const pj = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as PkgJson;
  const deps = new Set<string>();
  // devDependencies count too — they influence tsc build order if there's
  // any `import` from the dep's source, even if it won't end up in the
  // published runtime (e.g. `@ds/materials` uses `@ds/utils` for SCSS-side
  // helpers and keeps it in devDeps).
  for (const field of ['dependencies', 'peerDependencies', 'devDependencies'] as const) {
    const block = pj[field];
    if (!block) continue;
    for (const [depName, version] of Object.entries(block)) {
      if (version === 'workspace:*') {
        const depSlug = nameToSlug.get(depName);
        if (depSlug) deps.add(depSlug);
      }
    }
  }
  slugToDeps.set(slug, [...deps].sort());
  void name;
}

// Kahn's topological sort with stable (alphabetical) tie-breaking.
const slugs = [...slugToDeps.keys()].sort();
const inDegree = new Map<string, number>();
const dependents = new Map<string, string[]>();
for (const slug of slugs) {
  inDegree.set(slug, 0);
  dependents.set(slug, []);
}
for (const slug of slugs) {
  for (const dep of slugToDeps.get(slug)!) {
    inDegree.set(slug, (inDegree.get(slug) ?? 0) + 1);
    dependents.get(dep)!.push(slug);
  }
}

const ordered: string[] = [];
const ready = slugs.filter((s) => inDegree.get(s) === 0).sort();
while (ready.length > 0) {
  const slug = ready.shift()!;
  ordered.push(slug);
  for (const dep of dependents.get(slug)!) {
    const next = (inDegree.get(dep) ?? 0) - 1;
    inDegree.set(dep, next);
    if (next === 0) {
      // Insert preserving alphabetical order so the result is deterministic.
      const idx = ready.findIndex((s) => s > dep);
      if (idx === -1) ready.push(dep);
      else ready.splice(idx, 0, dep);
    }
  }
}

if (ordered.length !== slugs.length) {
  const stuck = slugs.filter((s) => !ordered.includes(s));
  console.error(`[sync-tsconfig-refs] cycle detected, stuck packages: ${stuck.join(', ')}`);
  process.exit(1);
}

function writeRoot(variant: 'esm' | 'cjs'): void {
  const file = join(PACKAGES_DIR, `tsconfig.${variant}.json`);
  const cfg = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  cfg.references = ordered.map((slug) => ({ path: `./${slug}/tsconfig.${variant}.json` }));
  writeFileSync(file, `${JSON.stringify(cfg, null, 2)}\n`, 'utf8');
}

writeRoot('esm');
writeRoot('cjs');

console.info(
  `[sync-tsconfig-refs] reordered ${ordered.length} references (esm + cjs) by workspace-dep topology.`,
);

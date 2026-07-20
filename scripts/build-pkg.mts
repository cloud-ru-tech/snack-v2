#!/usr/bin/env node
/**
 * Selective package build: `pnpm build:pkg <name>[,<name>...]`.
 *
 * Compiles ONLY the requested packages and their transitive workspace deps —
 * a much smaller set than `pnpm build:packages` (which builds all 58). On a
 * cold CI working tree this is the fastest way to produce dist/ for a release
 * subset: tsc -b is invoked once with the topologically sorted list of
 * tsconfig files, so each package is built after its workspace deps.
 *
 * Per-package `tsconfig.{esm,cjs}.json` files have no `references` field — by
 * design (keeping them flat). The dep graph is reconstructed here from each
 * `package.json`'s workspace: deps.
 *
 * Usage:
 *   pnpm build:pkg tabs
 *   pnpm build:pkg button,typography      # multiple
 *   pnpm build:pkg @ds/tabs               # scope prefix accepted
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PACKAGES_DIR = resolve(ROOT, 'packages');

const raw = process.argv.slice(2).join(',');
if (!raw) {
  console.error('Usage: pnpm build:pkg <name>[,<name>...]');
  process.exit(2);
}

const requestedRaw = raw
  .split(',')
  .map((s) => s.trim().replace(/^@ds\//, ''))
  .filter(Boolean);

// A changed-packages set (CI `$SLUGS`) can legitimately include source-only /
// prebuilt packages — `@ds/figma-variables` ships a committed `build/`, `@ds/fonts`
// ships `src` + `fonts` — which have no `tsconfig.{esm,cjs}.json` and thus no tsc
// step. Those are skipped (nothing to build), NOT treated as errors. A hard error
// is reserved for a genuinely missing directory (a typo in the requested name).
const requested: string[] = [];
for (const name of requestedRaw) {
  const pkgDir = resolve(PACKAGES_DIR, name);
  if (!existsSync(pkgDir) || !statSync(pkgDir).isDirectory()) {
    console.error(`Package not found: packages/${name}`);
    process.exit(1);
  }
  if (!existsSync(join(pkgDir, 'tsconfig.esm.json'))) {
    console.info(`[build-pkg] skipping ${name}: source-only/prebuilt package (no tsconfig.esm.json)`);
    continue;
  }
  requested.push(name);
}

if (requested.length === 0) {
  console.info('[build-pkg] nothing to build — all requested packages are source-only/prebuilt.');
  process.exit(0);
}

type PkgJson = {
  name?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const dirs = readdirSync(PACKAGES_DIR)
  .map((s) => join(PACKAGES_DIR, s))
  .filter((p) => {
    try {
      return statSync(p).isDirectory() && existsSync(join(p, 'tsconfig.esm.json'));
    } catch {
      return false;
    }
  });

const nameToSlug = new Map<string, string>();
const slugDeps = new Map<string, string[]>();

for (const dir of dirs) {
  const slug = dir.slice(PACKAGES_DIR.length + 1);
  let pj: PkgJson;
  try {
    pj = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as PkgJson;
  } catch {
    continue;
  }
  if (!pj.name) continue;
  nameToSlug.set(pj.name, slug);
  const deps = new Set<string>();
  for (const field of ['dependencies', 'peerDependencies', 'devDependencies'] as const) {
    const block = pj[field];
    if (!block) continue;
    for (const [depName, ver] of Object.entries(block)) {
      // Match any workspace protocol (`workspace:*`, `workspace:^`, `workspace:~`).
      if (ver.startsWith('workspace:')) deps.add(depName);
    }
  }
  slugDeps.set(slug, [...deps]);
}

// Resolve a slug's deps (recursively) into a set of slugs.
function closureFor(slugs: string[]): Set<string> {
  const visited = new Set<string>();
  const stack = [...slugs];
  while (stack.length > 0) {
    const slug = stack.pop()!;
    if (visited.has(slug)) continue;
    visited.add(slug);
    const deps = slugDeps.get(slug) ?? [];
    for (const depName of deps) {
      const depSlug = nameToSlug.get(depName);
      if (depSlug && !visited.has(depSlug)) stack.push(depSlug);
    }
  }
  return visited;
}

const closure = closureFor(requested);

// Topo-sort the closure (Kahn's, alphabetical ties for determinism).
const subgraph = [...closure].sort();
const inDegree = new Map<string, number>();
const dependents = new Map<string, string[]>();
for (const slug of subgraph) {
  inDegree.set(slug, 0);
  dependents.set(slug, []);
}
for (const slug of subgraph) {
  for (const depName of slugDeps.get(slug) ?? []) {
    const depSlug = nameToSlug.get(depName);
    if (!depSlug || !closure.has(depSlug)) continue;
    inDegree.set(slug, (inDegree.get(slug) ?? 0) + 1);
    dependents.get(depSlug)!.push(slug);
  }
}
const ordered: string[] = [];
const ready = subgraph.filter((s) => inDegree.get(s) === 0).sort();
while (ready.length > 0) {
  const slug = ready.shift()!;
  ordered.push(slug);
  for (const dep of dependents.get(slug)!) {
    const next = (inDegree.get(dep) ?? 0) - 1;
    inDegree.set(dep, next);
    if (next === 0) {
      const idx = ready.findIndex((s) => s > dep);
      if (idx === -1) ready.push(dep);
      else ready.splice(idx, 0, dep);
    }
  }
}
if (ordered.length !== subgraph.length) {
  console.error(`[build-pkg] cycle in workspace deps, stuck: ${subgraph.filter((s) => !ordered.includes(s)).join(', ')}`);
  process.exit(1);
}

console.info(`[build-pkg] requested: ${requested.join(', ')}`);
console.info(`[build-pkg] build order (${ordered.length}): ${ordered.join(' → ')}`);

function run(cmd: string, args: string[]): void {
  console.info(`\n$ ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function spawnAsync(cmd: string, args: string[], label: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`[build-pkg] ${label} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

const tscArgs = ['exec', 'tspc', '-b'];
for (const slug of ordered) {
  tscArgs.push(`./packages/${slug}/tsconfig.esm.json`);
  tscArgs.push(`./packages/${slug}/tsconfig.cjs.json`);
}
run('pnpm', tscArgs);

// SCSS + css-module transforms — компилируются для requested-пакетов параллельно
// (compileCSS и compileJsCssModules независимы между пакетами и друг от друга:
// читают `src/`, пишут в свои `dist/`). Последовательный цикл занимал ~30s на
// 25 пакетов; параллельный — ~3-5s. Bounded concurrency через `concurrency`,
// чтобы не упереть CPU/diskIO в CI runner'е.
const concurrency = Math.max(4, Math.min(requested.length, 8));
const tasks: Array<{ slug: string; script: 'compileCSS' | 'compileJsCssModules' }> = [];
for (const slug of requested) {
  tasks.push({ slug, script: 'compileCSS' });
  tasks.push({ slug, script: 'compileJsCssModules' });
}

console.info(`\n[build-pkg] CSS transforms in parallel (concurrency=${concurrency}, tasks=${tasks.length})`);

let nextTask = 0;
async function worker(workerId: number): Promise<void> {
  while (nextTask < tasks.length) {
    const taskIndex = nextTask++;
    const { slug, script } = tasks[taskIndex];
    const label = `${script}(${slug})`;
    console.info(`  [w${workerId}] ${label}`);
    await spawnAsync('pnpm', ['exec', 'tsx', `scripts/${script}.ts`, `--pkg=${slug}`], label);
  }
}

const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
await Promise.all(workers).catch((e) => {
  console.error(e);
  process.exit(1);
});

console.info('\n✓ selective build complete');

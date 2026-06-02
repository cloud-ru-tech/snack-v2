/**
 * Печатает space-separated slug'и пакетов под `packages/*`, изменённых против
 * base-ref. Используется в CI для селективного coverage прогона.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts                       # base=origin/master, без транзитивных
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts --base=origin/main
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts --transitive          # включить depender'ов
 *
 * Реализация — прямой `git diff` + транзитивное замыкание по графу
 * dependencies/devDependencies из package.json. pnpm `--filter '[ref]'` в
 * pnpm 10 в некоторых сетапах возвращает пустой список даже при явных diff'ах,
 * поэтому от него отказались.
 *
 * Exit codes:
 *   0 — выведен список (даже пустой)
 *   1 — git diff упал (broken setup)
 */
import { execSync } from 'child_process';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, resolve } from 'path';

const args = process.argv.slice(2);
const base = args.find(a => a.startsWith('--base='))?.split('=')[1] ?? 'origin/master';
const transitive = args.includes('--transitive');

const ROOT = resolve(process.cwd());
const PACKAGES_DIR = join(ROOT, 'packages');

let diff: string;
try {
  diff = execSync(`git diff --name-only ${base}...HEAD -- packages/`, {
    encoding: 'utf8',
    cwd: ROOT,
  });
} catch (e) {
  console.error('[coverage-changed-pkgs] git diff failed:', (e as Error).message);
  process.exit(1);
}

const SLUG_RE = /^packages\/([^/]+)\//;
const directlyChanged = new Set<string>();
for (const file of diff.split('\n')) {
  const m = file.match(SLUG_RE);
  if (m) directlyChanged.add(m[1]);
}

type PkgMeta = { slug: string; name: string };
const allPkgs: PkgMeta[] = [];
for (const entry of readdirSync(PACKAGES_DIR)) {
  const dir = join(PACKAGES_DIR, entry);
  try {
    if (!statSync(dir).isDirectory()) continue;
    const pkgJson = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
    if (typeof pkgJson.name === 'string') {
      allPkgs.push({ slug: entry, name: pkgJson.name });
    }
  } catch {
    // packages/tsconfig.{esm,cjs}.json и прочие не-пакетные файлы — пропускаем.
  }
}
const nameToSlug = new Map(allPkgs.map(p => [p.name, p.slug]));

const result = new Set(directlyChanged);
if (transitive) {
  const dependentsOf = new Map<string, Set<string>>();
  for (const { slug } of allPkgs) dependentsOf.set(slug, new Set());
  for (const { slug } of allPkgs) {
    let deps: Record<string, string> = {};
    try {
      const pkgJson = JSON.parse(readFileSync(join(PACKAGES_DIR, slug, 'package.json'), 'utf8'));
      deps = {
        ...pkgJson.dependencies,
        ...pkgJson.devDependencies,
        ...pkgJson.peerDependencies,
        ...pkgJson.optionalDependencies,
      };
    } catch {
      continue;
    }
    for (const depName of Object.keys(deps)) {
      const depSlug = nameToSlug.get(depName);
      if (depSlug) dependentsOf.get(depSlug)?.add(slug);
    }
  }
  const queue = [...directlyChanged];
  while (queue.length) {
    const slug = queue.shift()!;
    for (const dependent of dependentsOf.get(slug) ?? []) {
      if (!result.has(dependent)) {
        result.add(dependent);
        queue.push(dependent);
      }
    }
  }
}

const pkgs = [...result].sort();
process.stdout.write(pkgs.join(' '));

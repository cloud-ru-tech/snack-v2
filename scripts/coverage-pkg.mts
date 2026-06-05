/**
 * Селективный coverage по пакетам. Поднимает e2e-spec'и пакетов И harvester
 * play-функций (через STORIES_FILTER), мерджит, печатает сводку.
 *
 * Usage:
 *   pnpm test:coverage:pkg button drawer
 *   pnpm test:coverage:pkg uikit-product-info-row
 *
 * Требование: storybook-static (с sourcemaps) собран и поднят на :6006 —
 * coverage снимается рантаймом (V8/CDP) и маппится по sourcemaps:
 *   pnpm exec tsx scripts/coverage-serve.mts &
 */
import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { resolve } from 'path';

const pkgs = process.argv.slice(2);
if (pkgs.length === 0) {
  console.error('usage: pnpm test:coverage:pkg <pkg> [<pkg2> ...]');
  process.exit(1);
}

const repoRoot = process.cwd();
const coverageDir = resolve(repoRoot, 'coverage');

for (const p of pkgs) {
  if (!existsSync(resolve(repoRoot, 'packages', p))) {
    console.error(`packages/${p} not found`);
    process.exit(1);
  }
}

if (existsSync(coverageDir)) rmSync(coverageDir, { recursive: true, force: true });

const e2ePaths = pkgs.map(p => `packages/${p}`);
const storiesFilter = `(${pkgs.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`;

console.log(`\n[1/3] e2e specs + harvester (filter: ${storiesFilter})\n`);
// Используем spawnSync с shell:false и массивом аргументов вместо строки —
// чтобы имена пакетов и storiesFilter не попадали в shell-парсер. ENV
// передаём через `env`, а не через `VAR=val cmd`-префикс (требует shell).
const playwrightRun = spawnSync(
  'pnpm',
  ['exec', 'playwright', 'test', '--project=chrome', ...e2ePaths, 'playwright/coverage'],
  {
    stdio: 'inherit',
    env: { ...process.env, COVERAGE: 'true', STORIES_FILTER: storiesFilter },
  },
);
if (playwrightRun.status !== 0) {
  console.warn('\n[coverage-pkg] some tests failed — продолжаем merge, coverage всё равно собран.');
}

console.log(`\n[2/3] merge\n`);
execSync('pnpm coverage:merge', { stdio: 'inherit' });

console.log(`\n[3/3] summary\n`);
const summary = JSON.parse(readFileSync(resolve(coverageDir, 'report', 'coverage-summary.json'), 'utf8'));
const { total: _t, ...files } = summary;
type Agg = { sc: number; st: number; fc: number; ft: number; bc: number; bt: number; lc: number; lt: number };
const agg: Record<string, Agg> = {};
for (const [path, m] of Object.entries(files as Record<string, Record<string, { covered: number; total: number }>>)) {
  const seg = path.split('/packages/')[1];
  if (!seg) continue;
  const pkg = seg.split('/')[0];
  if (!pkgs.includes(pkg)) continue;
  const a = (agg[pkg] ??= { sc: 0, st: 0, fc: 0, ft: 0, bc: 0, bt: 0, lc: 0, lt: 0 });
  a.sc += m.statements.covered; a.st += m.statements.total;
  a.fc += m.functions.covered; a.ft += m.functions.total;
  a.bc += m.branches.covered; a.bt += m.branches.total;
  a.lc += m.lines.covered; a.lt += m.lines.total;
}
const pct = (c: number, t: number) => (t ? `${((100 * c) / t).toFixed(1)}%` : '  n/a');
console.log(`${'package'.padEnd(28)} ${'stmts'.padStart(8)} ${'funcs'.padStart(8)} ${'branches'.padStart(10)} ${'lines'.padStart(8)}`);
for (const p of pkgs) {
  const a = agg[p];
  if (!a) { console.log(`${p.padEnd(28)} (no data)`); continue; }
  console.log(`${p.padEnd(28)} ${pct(a.sc, a.st).padStart(8)} ${pct(a.fc, a.ft).padStart(8)} ${pct(a.bc, a.bt).padStart(10)} ${pct(a.lc, a.lt).padStart(8)}`);
}
console.log(`\nfull report: file://${resolve(coverageDir, 'report', 'index.html')}\n`);

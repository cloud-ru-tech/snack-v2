/**
 * Проверяет coverage указанных пакетов против порога. Падает с exit 1 при недоборе.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-gate.mts button drawer
 *   pnpm exec tsx scripts/coverage-gate.mts --min-stmts=90 --min-funcs=80 button
 *
 * Источник — coverage/report/coverage-summary.json (см. coverage-merge.mts).
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

type Metric = { covered: number; total: number; pct: number };
type FileSummary = { statements: Metric; branches: Metric; functions: Metric; lines: Metric };

// Per-package coverage gate. Дефолты согласованы с `.claude/rules/coverage-standard.md`.
const DEFAULT_MIN = { stmts: 80, branches: 70, funcs: 75, lines: 80 };

const args = process.argv.slice(2);
const min = { ...DEFAULT_MIN };
const pkgs: string[] = [];

for (const a of args) {
  const m = a.match(/^--min-(stmts|branches|funcs|lines)=(\d+(?:\.\d+)?)$/);
  if (m) {
    min[m[1] as keyof typeof min] = Number(m[2]);
  } else if (a.startsWith('--')) {
    console.error(`unknown flag: ${a}`);
    process.exit(2);
  } else {
    pkgs.push(a);
  }
}

if (pkgs.length === 0) {
  console.error('usage: coverage-gate.mts [--min-stmts=N] [--min-branches=N] [--min-funcs=N] [--min-lines=N] <pkg> [<pkg2> ...]');
  process.exit(2);
}

const summaryPath = resolve(process.cwd(), 'coverage', 'report', 'coverage-summary.json');
const raw = JSON.parse(readFileSync(summaryPath, 'utf8')) as Record<string, FileSummary>;
delete (raw as Record<string, unknown>).total;

type Agg = { sc: number; st: number; fc: number; ft: number; bc: number; bt: number; lc: number; lt: number };
const agg: Record<string, Agg> = {};
for (const [path, m] of Object.entries(raw)) {
  const seg = path.split('/packages/')[1];
  if (!seg) continue;
  const pkg = seg.split('/')[0];
  if (!pkgs.includes(pkg)) continue;
  const a = (agg[pkg] ??= { sc: 0, st: 0, fc: 0, ft: 0, bc: 0, bt: 0, lc: 0, lt: 0 });
  a.sc += m.statements.covered; a.st += m.statements.total;
  a.fc += m.functions.covered;  a.ft += m.functions.total;
  a.bc += m.branches.covered;   a.bt += m.branches.total;
  a.lc += m.lines.covered;      a.lt += m.lines.total;
}

const pct = (c: number, t: number) => (t ? (100 * c) / t : 100);
let failed = 0;
console.log(`thresholds: stmts≥${min.stmts}% branches≥${min.branches}% funcs≥${min.funcs}% lines≥${min.lines}%\n`);
console.log(`${'package'.padEnd(28)} ${'stmts'.padStart(8)} ${'branches'.padStart(10)} ${'funcs'.padStart(8)} ${'lines'.padStart(8)} status`);

for (const p of pkgs) {
  const a = agg[p];
  if (!a) {
    console.log(`${p.padEnd(28)} ${'(no data)'.padStart(46)} FAIL`);
    failed++;
    continue;
  }
  const s = pct(a.sc, a.st), b = pct(a.bc, a.bt), f = pct(a.fc, a.ft), l = pct(a.lc, a.lt);
  const fails: string[] = [];
  if (s < min.stmts) fails.push(`stmts ${s.toFixed(1)}<${min.stmts}`);
  if (b < min.branches) fails.push(`branches ${b.toFixed(1)}<${min.branches}`);
  if (f < min.funcs) fails.push(`funcs ${f.toFixed(1)}<${min.funcs}`);
  if (l < min.lines) fails.push(`lines ${l.toFixed(1)}<${min.lines}`);
  const status = fails.length ? `FAIL (${fails.join(', ')})` : 'OK';
  console.log(`${p.padEnd(28)} ${(s.toFixed(1)+'%').padStart(8)} ${(b.toFixed(1)+'%').padStart(10)} ${(f.toFixed(1)+'%').padStart(8)} ${(l.toFixed(1)+'%').padStart(8)} ${status}`);
  if (fails.length) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} package(s) below threshold.`);
  process.exit(1);
}
console.log('\nall packages meet thresholds.');

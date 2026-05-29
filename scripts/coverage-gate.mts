/**
 * Проверяет coverage указанных пакетов против порога. Падает с exit 1 при недоборе.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-gate.mts button drawer
 *   pnpm exec tsx scripts/coverage-gate.mts --min-stmts=90 --min-funcs=80 button
 *   pnpm exec tsx scripts/coverage-gate.mts --format=markdown button
 *   pnpm exec tsx scripts/coverage-gate.mts --format=markdown --compact
 *   pnpm exec tsx scripts/coverage-gate.mts --format=markdown
 *
 * Источник — coverage/report/coverage-summary.json (см. coverage-merge.mts).
 */
import { existsSync } from 'fs';
import { resolve } from 'path';

import {
  aggregatePackages,
  DEFAULT_MIN,
  evaluatePackage,
  formatMarkdownCompact,
  formatMarkdownReport,
  listPackagesFromSummary,
  type MinThresholds,
  readCoverageSummary,
} from './coverage-utils.mts';

const args = process.argv.slice(2);
const min: MinThresholds = { ...DEFAULT_MIN };
const pkgs: string[] = [];
let format: 'ascii' | 'markdown' = 'ascii';
let compact = false;

for (const a of args) {
  const minMatch = a.match(/^--min-(stmts|branches|funcs|lines)=(\d+(?:\.\d+)?)$/);
  if (minMatch) {
    min[minMatch[1] as keyof MinThresholds] = Number(minMatch[2]);
  } else if (a === '--format=markdown') {
    format = 'markdown';
  } else if (a === '--compact') {
    compact = true;
  } else if (a.startsWith('--')) {
    console.error(`unknown flag: ${a}`);
    process.exit(2);
  } else {
    pkgs.push(a);
  }
}

const summaryPath = resolve(process.cwd(), 'coverage', 'report', 'coverage-summary.json');
if (!existsSync(summaryPath)) {
  console.error('coverage/report/coverage-summary.json not found — run pnpm test:coverage:pkg <pkg> first');
  process.exit(2);
}

const raw = readCoverageSummary(summaryPath);
const allPkgsInSummary = listPackagesFromSummary(raw);
const targetPkgs = pkgs.length > 0 ? pkgs : allPkgsInSummary;

if (targetPkgs.length === 0) {
  console.error('no packages in coverage summary — run pnpm test:coverage:pkg <pkg> first');
  process.exit(2);
}

const agg = aggregatePackages(raw, targetPkgs);

if (format === 'markdown') {
  if (compact || pkgs.length === 0) {
    console.log(formatMarkdownCompact(targetPkgs, agg, min));
  } else {
    for (const pkg of targetPkgs) {
      console.log(formatMarkdownReport(pkg, agg, min));
      if (targetPkgs.length > 1) console.log('');
    }
  }

  let failed = 0;
  for (const p of targetPkgs) {
    const { status } = evaluatePackage(p, agg[p], min);
    if (status === 'fail' || status === 'no-data') failed++;
  }
  process.exit(failed > 0 ? 1 : 0);
}

let failed = 0;
console.log(`thresholds: stmts≥${min.stmts}% branches≥${min.branches}% funcs≥${min.funcs}% lines≥${min.lines}%\n`);
console.log(
  `${'package'.padEnd(28)} ${'stmts'.padStart(8)} ${'branches'.padStart(10)} ${'funcs'.padStart(8)} ${'lines'.padStart(8)} status`,
);

for (const p of targetPkgs) {
  const { status, metrics, fails } = evaluatePackage(p, agg[p], min);

  if (status === 'exempt') {
    console.log(`${p.padEnd(28)} ${'(exempt)'.padStart(46)} EXEMPT`);
    continue;
  }

  if (status === 'no-data') {
    console.log(`${p.padEnd(28)} ${'(no data)'.padStart(46)} FAIL`);
    failed++;
    continue;
  }

  if (!metrics) {
    console.log(`${p.padEnd(28)} ${'(no data)'.padStart(46)} FAIL`);
    failed++;
    continue;
  }

  const { stmts: s, branches: b, funcs: f, lines: l } = metrics;
  const statusLabel = fails.length ? `FAIL (${fails.join(', ')})` : 'OK';
  console.log(
    `${p.padEnd(28)} ${(s.toFixed(1) + '%').padStart(8)} ${(b.toFixed(1) + '%').padStart(10)} ${(f.toFixed(1) + '%').padStart(8)} ${(l.toFixed(1) + '%').padStart(8)} ${statusLabel}`,
  );
  if (fails.length) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} package(s) below threshold.`);
  process.exit(1);
}
console.log('\nall packages meet thresholds.');

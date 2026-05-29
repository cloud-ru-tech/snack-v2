/**
 * Селективный coverage по пакетам. Поднимает e2e-spec'i пакетов И harvester
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
import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';

import { aggregatePackages, formatAsciiSummary, readCoverageSummary } from './coverage-utils.mts';

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

console.log('\n[0/4] prefetch story index\n');
execSync('pnpm exec tsx scripts/coverage-prefetch-stories.mts', { stdio: 'inherit' });

const e2ePaths = pkgs.map(p => `packages/${p}`);
const storiesFilter = `(${pkgs.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`;

console.log(`\n[1/4] e2e specs + harvester (filter: ${storiesFilter})\n`);
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

console.log(`\n[2/4] merge\n`);
execSync('pnpm coverage:merge', { stdio: 'inherit' });

console.log(`\n[3/4] summary\n`);
const raw = readCoverageSummary(resolve(coverageDir, 'report', 'coverage-summary.json'));
const agg = aggregatePackages(raw, pkgs);
console.log(formatAsciiSummary(pkgs, agg));
console.log(`\nfull report: file://${resolve(coverageDir, 'report', 'index.html')}\n`);

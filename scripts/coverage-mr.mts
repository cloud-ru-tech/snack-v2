/**
 * MR-friendly coverage: детект changed-пакетов против base-ветки, селективный прогон, gate.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-mr.mts                      # base = master
 *   pnpm exec tsx scripts/coverage-mr.mts --base=origin/main
 *   pnpm exec tsx scripts/coverage-mr.mts --transitive         # включить depender'ов
 *   pnpm exec tsx scripts/coverage-mr.mts --min-stmts=90
 *
 * Требует, чтобы storybook на :6006 уже отвечал (см. coverage-serve.mts).
 */
import { execSync, spawnSync } from 'child_process';

const args = process.argv.slice(2);
const base = args.find(a => a.startsWith('--base='))?.split('=')[1] ?? 'origin/master';
const transitive = args.includes('--transitive');
const gateArgs = args.filter(a => a.startsWith('--min-'));

const filter = transitive ? `'...[${base}]'` : `'[${base}]'`;

console.log(`[coverage-mr] base=${base} transitive=${transitive}`);

let changedJson: string;
try {
  changedJson = execSync(
    `pnpm --filter ${filter} --filter './packages/*' ls --depth -1 --json --parseable=false`,
    { encoding: 'utf8' },
  );
} catch (e) {
  console.error('[coverage-mr] pnpm filter failed:', (e as Error).message);
  process.exit(1);
}

type LsEntry = { name: string };
let pkgs: string[] = [];
try {
  pkgs = (JSON.parse(changedJson) as LsEntry[])
    .map(e => e.name)
    .filter(n => n.startsWith('@ds/'))
    .map(n => n.slice('@ds/'.length))
    .filter(n => n !== 'storybook' && n !== 'docs');
} catch {
  console.error('[coverage-mr] failed to parse pnpm ls output');
  process.exit(1);
}

if (pkgs.length === 0) {
  console.log('[coverage-mr] no @ds/* packages changed — nothing to measure.');
  process.exit(0);
}

console.log(`[coverage-mr] changed packages (${pkgs.length}): ${pkgs.join(', ')}`);

const cov = spawnSync('pnpm', ['test:coverage:pkg', ...pkgs], { stdio: 'inherit' });
if (cov.status !== 0) process.exit(cov.status ?? 1);

if (gateArgs.length === 0) {
  console.log('[coverage-mr] no --min-* flags — skipping gate.');
  process.exit(0);
}

const gate = spawnSync('pnpm', ['exec', 'tsx', 'scripts/coverage-gate.mts', ...gateArgs, ...pkgs], {
  stdio: 'inherit',
});
process.exit(gate.status ?? 0);

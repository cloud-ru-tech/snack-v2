/**
 * Печатает space-separated имена @ds/* пакетов, изменённых против base-ref.
 * Используется в CI для селективного coverage прогона.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts                       # base=origin/master, без транзитивных
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts --base=origin/main
 *   pnpm exec tsx scripts/coverage-changed-pkgs.mts --transitive          # включить depender'ов
 *
 * Exit codes:
 *   0 — выведен список (даже пустой)
 *   1 — pnpm filter упал (broken setup)
 */
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const base = args.find(a => a.startsWith('--base='))?.split('=')[1] ?? 'origin/master';
const transitive = args.includes('--transitive');
const filter = transitive ? `'...[${base}]'` : `'[${base}]'`;

let raw: string;
try {
  raw = execSync(
    `pnpm --filter ${filter} --filter './packages/*' ls --depth -1 --json --parseable=false`,
    { encoding: 'utf8' },
  );
} catch (e) {
  console.error('[coverage-changed-pkgs] pnpm filter failed:', (e as Error).message);
  process.exit(1);
}

type LsEntry = { name: string };
let pkgs: string[] = [];
try {
  pkgs = (JSON.parse(raw) as LsEntry[])
    .map(e => e.name)
    .filter(n => n.startsWith('@ds/'))
    .map(n => n.slice('@ds/'.length))
    .filter(n => n !== 'storybook' && n !== 'docs');
} catch {
  console.error('[coverage-changed-pkgs] failed to parse pnpm ls output');
  process.exit(1);
}

process.stdout.write(pkgs.join(' '));

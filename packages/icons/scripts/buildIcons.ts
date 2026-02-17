/**
 * Orchestrates the full icon build: fix → sprite → standalone → sprite files → export index.
 * Runs Prettier on generated files so git diff stays minimal.
 */
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from './iconGroups';

const ICONS_ROOT = join(__dirname, '..');
const REPO_ROOT = join(ICONS_ROOT, '..', '..');

function run(cmd: string, env?: Record<string, string>): void {
  const envFull = { ...process.env, ...env };
  execSync(cmd, { cwd: ICONS_ROOT, env: envFull, stdio: 'inherit' });
}

function runFromRepoRoot(cmd: string): void {
  execSync(cmd, { cwd: REPO_ROOT, stdio: 'inherit' });
}

function formatGeneratedFiles(): void {
  const patterns = [
    'packages/icons/src/components/**/*.tsx',
    'packages/icons/src/components/**/*.ts',
    'packages/icons/src/sprite/index.ts',
  ];
  const iconFontDir = join(ICONS_ROOT, 'src', 'icon-font');
  if (existsSync(iconFontDir)) {
    patterns.push('packages/icons/src/icon-font/*.css', 'packages/icons/src/icon-font/*.json');
  }
  runFromRepoRoot(`pnpm exec prettier --write ${patterns.map(p => `"${p}"`).join(' ')}`);
}

async function main(): Promise<void> {
  run('rimraf svgs-fixed && ts-node scripts/fixIcons.ts');

  const groups = getIconGroups();

  for (const group of groups) {
    const groupId = getSpriteGroupId(group);
    const symbolPrefix = `snack-uikit-${groupId}-`;
    const fixedPath = getGroupFixedPath(group);

    run(
      `rimraf src/components/${group}/sprite && svgr -d src/components/${group}/sprite ${fixedPath} --config-file templates/.svgrrc.sprite.js`,
      { SYMBOL_PREFIX: symbolPrefix },
    );
  }

  run('ts-node scripts/postProcessIconFallback.ts');

  for (const group of groups) {
    const fixedPath = getGroupFixedPath(group);
    run(
      `rimraf src/components/${group}/standalone && svgr -d src/components/${group}/standalone ${fixedPath} --config-file templates/.svgrrc.standalone.js`,
    );
  }

  run('ts-node scripts/createSprite.ts');
  run('ts-node scripts/syncGeneratedIcons.ts');

  formatGeneratedFiles();

  // eslint-disable-next-line no-console
  console.log('Icon build complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

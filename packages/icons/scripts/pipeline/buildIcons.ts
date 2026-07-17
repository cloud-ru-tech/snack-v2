/**
 * Оркестрирует полную сборку иконок: fix → sprite → standalone (только для групп без
 * needsSprite) → sprite-файлы → индекс экспортов. В конце запускает Prettier по сгенерированным
 * файлам, чтобы git diff оставался минимальным.
 */
import { existsSync, readdirSync } from 'fs';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from '../shared/iconGroups';
import { getGroupConfig } from '../shared/groupConfig';

const ICONS_ROOT = join(import.meta.dirname, '..', '..');
const REPO_ROOT = join(ICONS_ROOT, '..', '..');

const execAsync = promisify(exec);

/**
 * Сколько svgr-вызовов выполняется одновременно. Группы пишут в разные директории и между собой
 * изолированы; больше — быстрее, но выше конкуренция за ресурсы, из-за которой svgr иногда
 * недогенерирует файлы (см. runSvgrWithRetry). Повторные попытки по сверке счётчиков гарантируют
 * корректность независимо от параллелизма, поэтому умеренный пул безопасен.
 */
const SVGR_CONCURRENCY = 4;

function run(cmd: string, env?: Record<string, string>): void {
  const envFull = { ...process.env, ...env };
  execSync(cmd, { cwd: ICONS_ROOT, env: envFull, stdio: 'inherit' });
}

async function runAsync(cmd: string, env?: Record<string, string>): Promise<void> {
  const envFull = { ...process.env, ...env };
  await execAsync(cmd, { cwd: ICONS_ROOT, env: envFull, maxBuffer: 64 * 1024 * 1024 });
}

/** Обрабатывает items через fn пулом не больше limit параллельных задач; дожидается завершения всех. */
async function mapWithConcurrency<T>(items: T[], limit: number, fn: (item: T) => Promise<void>): Promise<void> {
  let cursor = 0;
  const worker = async (): Promise<void> => {
    while (cursor < items.length) {
      await fn(items[cursor++]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

function countFilesRecursive(dir: string, predicate: (name: string) => boolean): number {
  if (!existsSync(dir)) return 0;
  let count = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      count += countFilesRecursive(full, predicate);
    } else if (e.isFile() && predicate(e.name)) {
      count += 1;
    }
  }
  return count;
}

/**
 * svgr иногда молча недогенерирует часть файлов для больших групп (например 232→228) под
 * нагрузкой в рамках одного прогона; первопричина не установлена, похоже на конкуренцию за
 * ресурсы во внутренней батчинг-логике @svgr/core, а не на что-то в шаблонах или конфиге этого
 * пакета. Именно эти повторные попытки делают безопасным параллельный запуск групп
 * (mapWithConcurrency): сверяют количество результата с количеством источников и повторяют
 * генерацию вместо того, чтобы молча отдать неполный набор иконок.
 */
async function runSvgrWithRetry(
  cmd: string,
  env: Record<string, string> | undefined,
  sourceDir: string,
  outputDir: string,
): Promise<void> {
  const sourceCount = countFilesRecursive(sourceDir, name => name.endsWith('.svg'));
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await runAsync(cmd, env);
    const generatedCount = countFilesRecursive(outputDir, name => name.endsWith('.tsx') && name !== 'index.tsx');
    if (generatedCount === sourceCount) return;
    // eslint-disable-next-line no-console
    console.warn(
      `[buildIcons] ${outputDir}: ожидалось ${sourceCount} сгенерированных файлов, получено ${generatedCount} (попытка ${attempt}/${maxAttempts}) — повторяю`,
    );
  }
  throw new Error(
    `svgr недогенерировал ${outputDir} после ${maxAttempts} попыток (в источнике ${sourceCount} .svg файлов)`,
  );
}

function runFromRepoRoot(cmd: string): void {
  execSync(cmd, { cwd: REPO_ROOT, stdio: 'inherit' });
}

function formatGeneratedFiles(): void {
  const patterns = [
    'packages/icons/src/components/**/*.tsx',
    'packages/icons/src/components/**/*.ts',
    'packages/icons/src/sprite/index.ts',
    'packages/icons/src/sprite/manifest.ts',
    'packages/icons/src/**/index.ts',
  ];
  const iconFontDir = join(ICONS_ROOT, 'src', 'icon-font');
  if (existsSync(iconFontDir)) {
    patterns.push('packages/icons/src/icon-font/*.css', 'packages/icons/src/icon-font/*.json');
  }
  runFromRepoRoot(`pnpm exec prettier --write ${patterns.map(p => `"${p}"`).join(' ')}`);
}

async function main(): Promise<void> {
  run('rimraf svgs-fixed && tsx scripts/pipeline/fixIcons.ts');

  const groups = getIconGroups();
  const spriteGroups = groups.filter(group => getGroupConfig(group).needsSprite);
  const standaloneGroups = groups.filter(group => !getGroupConfig(group).needsSprite);

  await mapWithConcurrency(spriteGroups, SVGR_CONCURRENCY, async group => {
    const groupId = getSpriteGroupId(group);
    const symbolPrefix = `snack-uikit-${groupId}-`;
    const fixedPath = getGroupFixedPath(group);
    const outputDir = join(ICONS_ROOT, 'src', 'components', group, 'sprite');

    await runSvgrWithRetry(
      `rimraf src/components/${group}/sprite && svgr -d src/components/${group}/sprite ${fixedPath} --config-file templates/.svgrrc.sprite.cjs`,
      { SYMBOL_PREFIX: symbolPrefix },
      fixedPath,
      outputDir,
    );
  });

  run('tsx scripts/pipeline/postProcessIconFallback.ts');

  // Группы со спрайтом отдают ровно один вариант компонента (sprite + инлайн-fallback,
  // см. flatIndexTemplateSprite.cjs) — standalone для них не генерируется вовсе. Чистим
  // возможный устаревший standalone/ от предыдущей сборки (до этого изменения он существовал
  // для всех групп), иначе осиротевшая директория останется висеть на диске.
  for (const group of spriteGroups) {
    run(`rimraf src/components/${group}/standalone`);
  }

  await mapWithConcurrency(standaloneGroups, SVGR_CONCURRENCY, async group => {
    const config = getGroupConfig(group);
    const fixedPath = getGroupFixedPath(group);
    const outputDir = join(ICONS_ROOT, 'src', 'components', group, 'standalone');
    await runSvgrWithRetry(
      `rimraf src/components/${group}/standalone && svgr -d src/components/${group}/standalone ${fixedPath} --config-file templates/.svgrrc.standalone.cjs`,
      { ICON_COLOR_MODE: config.colorMode },
      fixedPath,
      outputDir,
    );
  });

  run('tsx scripts/pipeline/createSprite.ts');
  run('tsx scripts/pipeline/pairLogoVariants.ts');
  run('tsx scripts/pipeline/syncGeneratedIcons.ts');
  run('tsx scripts/pipeline/syncTypesVersions.ts');

  formatGeneratedFiles();

  // eslint-disable-next-line no-console
  console.log('Сборка иконок завершена.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

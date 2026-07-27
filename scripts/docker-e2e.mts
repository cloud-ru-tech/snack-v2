#!/usr/bin/env node
/**
 * Playwright e2e в Docker — Linux-рендеринг как на CI.
 *
 * Образ по умолчанию: локальный `snack-v2-e2e:local`, собирается из docker/e2e/Dockerfile
 * (Debian bookworm + pnpm + вшитые OS-deps и chromium). Собирается один раз, дальше берётся
 * из кэша слоёв Docker (повторный build ~1-2 сек). Override — через DOCKER_E2E_IMAGE (тогда build
 * пропускается: используется чужой готовый образ, например CI-приватный).
 *
 * Usage:
 *   pnpm test:e2e:docker                              # chrome, все spec'и
 *   pnpm test:e2e:docker packages/calendar            # один пакет
 *   pnpm test:e2e:docker:update-snapshots             # переснять baseline'ы
 *   pnpm test:e2e:docker:update-snapshots packages/accordion
 *   pnpm test:e2e:docker:visual                       # только visual.spec.ts
 *   pnpm test:e2e:docker:visual packages/calendar     # visual одного пакета
 *   pnpm test:e2e:docker -- --no-install packages/foo # без pnpm install
 *
 * Перед первым запуском:
 *   ~/.npmrc с доступом к pkg.sbercloud.tech (монтируется в контейнер автоматически)
 *
 * Порядок внутри контейнера:
 *   pnpm install → build:storybook → http-server → тесты (chromium уже вшит в образ;
 *   build:packages по умолчанию НЕ запускается — форс через DOCKER_E2E_BUILD_PACKAGES=1)
 *
 * Env:
 *   DOCKER_E2E_IMAGE                  — override образа (пропускает docker build; для CI-образа)
 *   DOCKER_E2E_NO_BUILD_IMAGE=1       — не пересобирать локальный образ (взять уже собранный тег)
 *   DOCKER_E2E_PLATFORM               — default linux/amd64; пустая строка = без --platform
 *   DOCKER_E2E_INSTALL=0              — пропустить pnpm install (или флаг --no-install)
 *   DOCKER_E2E_NPMRC                  — путь к npmrc (default ~/.npmrc)
 *   DOCKER_E2E_SKIP_STORYBOOK_BUILD=1 — не пересобирать storybook static (reuse предыдущей сборки)
 *   SB_PACKAGES=<pkg>[,<pkg2>]        — собрать storybook static только по этим пакетам
 *                                       (пересъёмка baseline'а одного пакета: секунды вместо минут)
 *   DOCKER_E2E_BUILD_PACKAGES=1       — форсить build:packages (по умолчанию НЕ собирается: storybook
 *                                       static резолвит @ds/* → packages/<pkg>/src через алиасы, dist не нужен)
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const RUN_SCRIPT = resolve(ROOT, 'docker/e2e/run.sh');

const DEFAULT_IMAGE = 'snack-v2-e2e:local';
const DOCKERFILE_DIR = resolve(ROOT, 'docker/e2e');

/** Задаются скриптом явно — не пробрасываем из хоста/.env. */
const DOCKER_E2E_VARS_MANAGED = new Set(['DOCKER_E2E_INSTALL', 'DOCKER_E2E_MODE', 'DOCKER_E2E_VISUAL_PATH']);

/** Подхватывает `.env` в корне (только ключи, которых нет в shell env). */
function loadDotEnv(): void {
  const envPath = resolve(ROOT, '.env');
  if (!existsSync(envPath)) {
    return;
  }
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    if (process.env[key] !== undefined) {
      continue;
    }
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

/**
 * Не-`DOCKER_E2E_*` переменные, которые всё равно нужны внутри контейнера.
 * `SB_PACKAGES` сужает набор stories при сборке storybook static (см. `.storybook/main.ts`):
 * для пересъёмки baseline'ов одного пакета это разница между минутами и десятками секунд.
 */
const PASSTHROUGH_ENV = ['SB_PACKAGES'];

function appendDockerE2eEnv(dockerArgs: string[]): void {
  for (const [key, value] of Object.entries(process.env)) {
    const managed = key.startsWith('DOCKER_E2E_') && !DOCKER_E2E_VARS_MANAGED.has(key);

    if (value === undefined || !(managed || PASSTHROUGH_ENV.includes(key))) {
      continue;
    }

    dockerArgs.push('-e', `${key}=${value}`);
  }
}

/** node_modules маскируем volume'ами — linux deps не затирают macOS на хосте. */
const NODE_MODULES_VOLUMES = [
  { host: 'snack-v2-e2e-root-node-modules', container: '/work/node_modules' },
  { host: 'snack-v2-e2e-storybook-node-modules', container: '/work/apps/storybook/node_modules' },
  { host: 'snack-v2-e2e-docs-node-modules', container: '/work/apps/docs/node_modules' },
  { host: 'snack-v2-e2e-astro-node-modules', container: '/work/astro/node_modules' },
] as const;

type ParsedArgs = {
  updateSnapshots: boolean;
  visualOnly: boolean;
  noInstall: boolean;
  pathFilter?: string;
  playwrightArgs: string[];
};

function parseArgs(argv: string[]): ParsedArgs {
  const playwrightArgs: string[] = [];
  let updateSnapshots = false;
  let visualOnly = false;
  let noInstall = false;
  let pathFilter: string | undefined;

  for (const arg of argv) {
    if (arg === '--update-snapshots') {
      updateSnapshots = true;
      playwrightArgs.push('--update-snapshots=all');
      continue;
    }
    if (arg === '--update-snapshots=all' || arg === '--update-snapshots=changed') {
      updateSnapshots = true;
      playwrightArgs.push(arg);
      continue;
    }
    if (arg === '--visual') {
      visualOnly = true;
      continue;
    }
    if (arg === '--no-install') {
      noInstall = true;
      continue;
    }
    if (!arg.startsWith('-') && !pathFilter) {
      pathFilter = arg;
      continue;
    }
    playwrightArgs.push(arg);
  }

  return { updateSnapshots, visualOnly, playwrightArgs, noInstall, pathFilter };
}

function assertDockerReady(): void {
  const which = spawnSync('which', ['docker'], { encoding: 'utf8' });
  if (which.status !== 0) {
    console.error('Docker не найден в PATH. Установите Docker Desktop: https://docs.docker.com/desktop/');
    process.exit(1);
  }

  const info = spawnSync('docker', ['info'], { encoding: 'utf8', stdio: 'pipe' });
  if (info.status === 0) {
    return;
  }

  const stderr = `${info.stderr ?? ''}${info.stdout ?? ''}`;
  if (stderr.includes('Cannot connect to the Docker daemon')) {
    console.error(
      [
        'Docker daemon не запущен.',
        '',
        'На Mac: откройте Docker Desktop и дождитесь статуса "Running", затем повторите команду.',
        'Проверка: docker info',
      ].join('\n'),
    );
    process.exit(1);
  }

  console.error(stderr.trim() || 'docker info failed');
  process.exit(info.status ?? 1);
}

function resolveNpmrcPath(install: string): string | undefined {
  const npmrcPath = process.env.DOCKER_E2E_NPMRC ?? resolve(homedir(), '.npmrc');
  if (existsSync(npmrcPath)) {
    return npmrcPath;
  }
  if (install === '1') {
    console.error(
      [
        `Не найден ${npmrcPath} — без него pnpm не скачает @sbercloud/* из Artifactory.`,
        'Скопируйте npmrc с CI или задайте DOCKER_E2E_NPMRC=/path/to/.npmrc',
      ].join('\n'),
    );
    process.exit(1);
  }
  return undefined;
}

/** Версия @playwright/test из package.json — прокидывается в Dockerfile, чтобы ревизия chromium совпадала. */
function readPlaywrightVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
    const v = pkg.devDependencies?.['@playwright/test'] ?? pkg.dependencies?.['@playwright/test'];
    return typeof v === 'string' ? v.replace(/^[\^~]/, '') : '';
  } catch {
    return '';
  }
}

/** Сборка локального образа. Кэш слоёв Docker → повторный build мгновенный, если Dockerfile/версия не менялись. */
function buildLocalImage(tag: string, platform: string): void {
  const pwVersion = readPlaywrightVersion();
  const args = ['build', '-t', tag];
  if (platform) {
    args.push('--platform', platform);
  }
  if (pwVersion) {
    args.push('--build-arg', `PLAYWRIGHT_VERSION=${pwVersion}`);
  }
  args.push(DOCKERFILE_DIR);
  console.error(`→ docker build -t ${tag}${pwVersion ? ` (playwright ${pwVersion})` : ''} — кэшируется, повторно мгновенно`);
  const res = spawnSync('docker', args, { stdio: 'inherit', cwd: ROOT });
  if (res.status !== 0) {
    console.error('docker build не удался — см. лог выше.');
    process.exit(res.status ?? 1);
  }
}

function main(): void {
  if (!existsSync(RUN_SCRIPT)) {
    console.error(`Missing entrypoint: ${RUN_SCRIPT}`);
    process.exit(1);
  }

  loadDotEnv();
  assertDockerReady();

  const { updateSnapshots, visualOnly, playwrightArgs, noInstall, pathFilter } = parseArgs(process.argv.slice(2));

  if (updateSnapshots && !playwrightArgs.some(a => a.startsWith('--update-snapshots'))) {
    playwrightArgs.unshift('--update-snapshots=all');
  }

  if (pathFilter && !visualOnly) {
    playwrightArgs.push(pathFilter);
  }

  const image = process.env.DOCKER_E2E_IMAGE ?? DEFAULT_IMAGE;
  const platform = process.env.DOCKER_E2E_PLATFORM ?? 'linux/amd64';
  const install = noInstall || process.env.DOCKER_E2E_INSTALL === '0' ? '0' : '1';
  const npmrcPath = resolveNpmrcPath(install);

  // Собираем локальный образ (кэш слоёв → повторно мгновенно). Пропускаем, если задан свой образ
  // (DOCKER_E2E_IMAGE, напр. CI-приватный) или явный DOCKER_E2E_NO_BUILD_IMAGE=1.
  if (!process.env.DOCKER_E2E_IMAGE && process.env.DOCKER_E2E_NO_BUILD_IMAGE !== '1') {
    buildLocalImage(image, platform);
  }

  const dockerArgs = [
    'run',
    '--rm',
    '--init',
    '-v',
    `${ROOT}:/work`,
    '-w',
    '/work',
    '-e',
    `DOCKER_E2E_INSTALL=${install}`,
    '-e',
    `PW_CI_WORKERS=${process.env.PW_CI_WORKERS ?? '2'}`,
  ];

  appendDockerE2eEnv(dockerArgs);

  if (npmrcPath) {
    dockerArgs.push('-v', `${npmrcPath}:/root/.npmrc:ro`);
  }

  for (const { host, container } of NODE_MODULES_VOLUMES) {
    dockerArgs.push('-v', `${host}:${container}`);
  }

  dockerArgs.push('-v', 'snack-v2-e2e-pnpm-store:/root/.local/share/pnpm/store');
  // Браузер вшит в образ (/root/.cache/ms-playwright) — volume сюда НЕ монтируем,
  // иначе пустой том перекрыл бы вшитый chromium.

  if (visualOnly) {
    dockerArgs.push('-e', 'DOCKER_E2E_MODE=visual');
    if (pathFilter) {
      dockerArgs.push('-e', `DOCKER_E2E_VISUAL_PATH=${pathFilter}`);
    }
  }

  if (platform) {
    dockerArgs.push('--platform', platform);
  }

  if (process.stdout.isTTY) {
    dockerArgs.push('-it');
  }

  dockerArgs.push(image, 'bash', '/work/docker/e2e/run.sh', ...playwrightArgs);

  console.error(`→ docker ${dockerArgs.join(' ')}`);

  const result = spawnSync('docker', dockerArgs, { stdio: 'inherit', cwd: ROOT });
  process.exit(result.status ?? 1);
}

main();

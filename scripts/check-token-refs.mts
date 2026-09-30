#!/usr/bin/env node
/**
 * Ищет пакеты, чей собранный CSS/JS ссылается на токены `--sn-*`, которых больше нет
 * в `@ds/figma-variables`: `pnpm check:token-refs`.
 *
 * Зачем: SCSS-переменные из `figma-variables` при сборке превращаются в цепочки
 * `var(--sn-a, var(--sn-b, value))` и попадают в `dist` при сборке. Когда токен переименовывают или удаляют,
 * пакет, в коде которого ничего не менялось, lerna не переиздаёт — и в registry остаётся сборка
 * со старыми именами. Поднимать все пакеты на каждый релиз токенов избыточно: значения токенов
 * приходят в рантайме, пересборка нужна только тем, кто ссылается на пропавшие имена.
 * Скрипт находит ровно их.
 *
 * В режиме registry пакеты, которые и так попадут в следующий релиз (`scripts/changed-packages.mts`:
 * изменённые с последнего тега плюс их dependents), не считаются ошибкой: lerna пересоберёт их
 * на текущих токенах. Иначе проверка не проходила бы в любом MR с переименованием токенов —
 * registry обновляется только после релиза.
 *
 * Источник известных токенов — объявления `--sn-*` в `packages/figma-variables/build/css/**\/*.css`
 * плюс то, что объявляют сами пакеты (локальные переменные, рантайм-токены `@ds/theme`).
 *
 * Режимы:
 *   pnpm check:token-refs                   # последние версии из registry (то, что у потребителей)
 *   pnpm check:token-refs --local           # локальные packages/*\/dist (после build:packages)
 *   pnpm check:token-refs --pkg typography,button   # только эти пакеты (slug = папка в packages/)
 *   pnpm check:token-refs --verbose         # печатать все пропавшие токены, а не первые 5
 *
 * Код выхода 1 — есть пакеты со ссылками на несуществующие токены, которые не попадут в следующий релиз.
 * Что с ними делать (изменить код пакета, переиздать, принять), решает автор изменения.
 */
import { globSync } from 'glob';
import minimist from 'minimist';
import { execFile } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import {
  findMissing,
  formatStaleReport,
  hasMissing,
  MissingRefs,
  Paint,
  parseSlugList,
  plainPaint,
  scanTexts,
  toPublishedName,
} from './check-token-refs-core.mts';

const execFileAsync = promisify(execFile);

// Совпадает с аргументами `transform-scope.mts` в публикационном пайплайне.
const FROM_SCOPE = '@ds';
const TO_SCOPE = '@cloud-ru';
const NAME_PREFIX = 'ds-';

const TOKENS_PKG = '@ds/figma-variables';
const SCANNED_FILES = '**/*.{css,js,mjs,cjs}';
const CONCURRENCY = 8;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagesDir = join(root, 'packages');

const argv = minimist(process.argv.slice(2), {
  boolean: ['local', 'verbose'],
  string: ['pkg'],
});
const mode = argv.local ? 'local' : 'registry';
const onlySlugs = argv.pkg
  ? new Set(
      String(argv.pkg)
        .split(',')
        .map(s => s.trim()),
    )
  : null;

type Pkg = { slug: string; name: string };
/** `label` — имя, под которым пакет виден потребителям: `@ds/*` локально, `@cloud-ru/ds-*` в registry. */
type Checked = Pkg & { label: string; version: string; texts: string[] };
type Skipped = Pkg & { label: string; reason: string };

function readText(files: string[]): string[] {
  return files.map(f => readFileSync(f, 'utf8'));
}

function listPackages(): Pkg[] {
  return readdirSync(packagesDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(join(packagesDir, d.name, 'package.json')))
    .map(d => {
      const json = JSON.parse(readFileSync(join(packagesDir, d.name, 'package.json'), 'utf8'));
      return { slug: d.name, name: json.name as string, private: Boolean(json.private) };
    })
    .filter(p => !p.private && p.name !== TOKENS_PKG && (!onlySlugs || onlySlugs.has(p.slug)))
    .map(({ slug, name }) => ({ slug, name }));
}

function loadKnownTokens(): Set<string> {
  const files = globSync('**/*.css', { cwd: join(packagesDir, 'figma-variables', 'build', 'css'), absolute: true });
  if (files.length === 0) {
    throw new Error('Нет packages/figma-variables/build/css — сначала pnpm build:tokens.');
  }
  return scanTexts(readText(files)).declared;
}

function loadLocal(pkg: Pkg): Checked | Skipped {
  const dist = join(packagesDir, pkg.slug, 'dist');
  if (!existsSync(dist)) return { ...pkg, label: pkg.name, reason: 'нет dist — соберите пакет' };

  const version = JSON.parse(readFileSync(join(packagesDir, pkg.slug, 'package.json'), 'utf8')).version;
  return { ...pkg, label: pkg.name, version, texts: readText(globSync(SCANNED_FILES, { cwd: dist, absolute: true })) };
}

async function loadPublished(pkg: Pkg, tmp: string): Promise<Checked | Skipped> {
  const published = toPublishedName(pkg.name, FROM_SCOPE, TO_SCOPE, NAME_PREFIX);
  const dest = mkdtempSync(join(tmp, `${pkg.slug}-`));

  try {
    // Без `--json`: у пакетов с тысячами файлов (icons) JSON-листинг переполняет буфер stdout.
    await execFileAsync('npm', ['pack', `${published}@latest`, '--pack-destination', dest], {
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch (e) {
    const notFound = /E404|404 Not Found/.test(String((e as { stderr?: string }).stderr ?? e));
    return {
      ...pkg,
      label: published,
      reason: notFound ? 'ещё не опубликован' : `npm pack завершился с ошибкой: ${String(e).split('\n')[0]}`,
    };
  }

  const tarball = readdirSync(dest).find(f => f.endsWith('.tgz'));
  if (!tarball) return { ...pkg, label: published, reason: 'npm pack не создал архив' };

  await execFileAsync('tar', ['-xzf', join(dest, tarball), '-C', dest]);
  const unpacked = join(dest, 'package');
  const { version } = JSON.parse(readFileSync(join(unpacked, 'package.json'), 'utf8'));
  const dist = join(unpacked, 'dist');
  const texts = existsSync(dist) ? readText(globSync(SCANNED_FILES, { cwd: dist, absolute: true })) : [];

  return { ...pkg, label: published, version, texts };
}

/** Slug'и пакетов следующего релиза — тот же набор, что публикует пайплайн. */
async function loadReleaseSlugs(): Promise<Set<string>> {
  const { stdout } = await execFileAsync('pnpm', ['exec', 'tsx', join(root, 'scripts', 'changed-packages.mts')], {
    cwd: root,
  });
  return parseSlugList(stdout);
}

/** Пути, изменения в которых lerna не считает поводом для выпуска пакета. */
function loadIgnoreChanges(): string[] {
  const lerna = JSON.parse(readFileSync(join(root, 'lerna.json'), 'utf8'));
  return lerna.command?.version?.ignoreChanges ?? [];
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

/** ANSI-цвета в терминале и в CI (лог GitLab их понимает); `NO_COLOR` отключает. */
function createPaint(): Paint {
  const enabled = !process.env.NO_COLOR && (Boolean(process.stdout.isTTY) || Boolean(process.env.CI));
  if (!enabled) return plainPaint;
  const wrap = (code: string) => (text: string) => `\x1b[${code}m${text}\x1b[0m`;
  return { error: wrap('1;31'), accent: wrap('1'), dim: wrap('2') };
}

// Весь отчёт — в stdout: при записи в два потока CI может перемешать строки. Об ошибке сообщает код выхода.
const print = (line = '') => process.stdout.write(`${line}\n`);

async function main() {
  const known = loadKnownTokens();
  const pkgs = listPackages();

  const tmp = mode === 'registry' ? mkdtempSync(join(tmpdir(), 'check-token-refs-')) : '';
  let loaded: (Checked | Skipped)[];
  try {
    loaded = mode === 'local' ? pkgs.map(loadLocal) : await mapLimit(pkgs, CONCURRENCY, p => loadPublished(p, tmp));
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }

  const checked = loaded.filter((p): p is Checked => 'texts' in p);
  const skipped = loaded.filter((p): p is Skipped => 'reason' in p);

  const scans = checked.map(p => ({ pkg: p, scan: scanTexts(p.texts) }));

  // Токен, объявленный любым пакетом (например, рантайм-токены темы), считается существующим для всех.
  for (const { scan } of scans) for (const name of scan.declared) known.add(name);

  const stale = scans
    .map(({ pkg, scan }) => ({ pkg, missing: findMissing(scan, known) }))
    .filter((r): r is { pkg: Checked; missing: MissingRefs } => hasMissing(r.missing));

  const paint = createPaint();
  const source = mode === 'local' ? 'локальный dist' : 'registry';
  print(
    `check-token-refs: проверено пакетов — ${checked.length} (${source}), токенов в figma-variables — ${known.size}`,
  );
  for (const s of skipped) print(paint.dim(`  – ${s.label}: пропущен, ${s.reason}`));

  // Устаревшие пакеты, которые выйдут в следующем релизе, пересоберутся сами — они не ошибка.
  const release = mode === 'registry' && stale.length > 0 ? await loadReleaseSlugs() : new Set<string>();
  const inRelease = stale.filter(({ pkg }) => release.has(pkg.slug));
  const failed = stale.filter(({ pkg }) => !release.has(pkg.slug));

  for (const { pkg } of inRelease) {
    print(`  ↻ ${pkg.label}@${pkg.version}: ссылается на удалённые токены, пересоберётся в следующем релизе`);
  }

  if (failed.length === 0) {
    print(inRelease.length ? '✓ Выпускать вручную ничего не нужно.' : '✓ Ссылок на удалённые токены нет.');
    return;
  }

  const report = formatStaleReport(
    failed.map(({ pkg, missing }) => ({ slug: pkg.slug, label: pkg.label, version: pkg.version, missing })),
    { mode, ignoreChanges: mode === 'registry' ? loadIgnoreChanges() : [], verbose: argv.verbose, paint },
  );
  for (const line of report) print(line);

  process.exitCode = 1;
}

main().catch(e => {
  console.error(`check-token-refs: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});

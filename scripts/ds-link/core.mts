/**
 * Ядро локального подключения пакетов: сборка → staging-копия под published-именем →
 * доставка в подключённые приложения.
 *
 * Раньше эту часть делал yalc (`publish --push` + `add`), но от него требовались
 * ровно три вещи: скопировать папку потребителю, помнить список подключённых
 * проектов и уметь всё это снять. Остальное — переименование скоупа, резолв
 * `workspace:` / `catalog:`, pnpm-overrides и досинк в `node_modules` —
 * всё равно реализовано здесь, потому что yalc рассчитан на символические
 * ссылки npm/yarn. Плюс он заморожен с 2021 года и содержит
 * баги, которые никто не починит. Поэтому три оставшиеся операции живут здесь.
 */
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

import {
  CONSUMER_LINK_DIR,
  DEP_FIELDS,
  LINK_DIR,
  mustGet,
  PkgJson,
  publishedNameOf,
  ROOT,
  ScopeConfig,
  STAGE_DIR,
  WorkspacePackage,
} from './workspace.mts';

export type LinkContext = {
  packages: Map<string, WorkspacePackage>;
  catalog: Map<string, string>;
  scope: ScopeConfig;
};

// --------------------------------------------------------------- процессы ---

export function run(cmd: string, args: string[], cwd: string, label: string): boolean {
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: false });
  if (r.status !== 0) {
    console.error(`[ds-link] ${label} завершился с кодом ${r.status}`);
    return false;
  }
  return true;
}

export function buildPackages(slugs: string[]): boolean {
  return run('pnpm', ['exec', 'tsx', 'scripts/build-pkg.mts', slugs.join(',')], ROOT, 'build:pkg');
}

// ------------------------------------------------- реестр подключений ---

/** Что и куда подключено: `{ '<путь-до-приложения>': ['@cloud-ru/ds-button', …] }`. */
export type Registry = Record<string, string[]>;

const REGISTRY_PATH = join(LINK_DIR, 'consumers.json');

export function readRegistry(): Registry {
  if (!existsSync(REGISTRY_PATH)) return {};
  try {
    return JSON.parse(readFileSync(REGISTRY_PATH, 'utf8')) as Registry;
  } catch {
    return {};
  }
}

export function writeRegistry(registry: Registry): void {
  mkdirSync(LINK_DIR, { recursive: true });
  writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
}

// ------------------------------------------------------------------ файлы ---

/**
 * Приводит `dest` к содержимому `source`: лишнее удаляет, остальное копирует.
 * `node_modules` в `dest` не трогаем — внутри виртуального стора pnpm там
 * лежат символические ссылки на соседние пакеты, их удаление сломает резолв.
 */
function mirrorDir(source: string, dest: string): void {
  mkdirSync(dest, { recursive: true });
  const keep = new Set(readdirSync(source));
  for (const entry of readdirSync(dest)) {
    if (entry === 'node_modules' || keep.has(entry)) continue;
    rmSync(join(dest, entry), { recursive: true, force: true });
  }
  for (const entry of keep) {
    if (entry === 'node_modules') continue;
    rmSync(join(dest, entry), { recursive: true, force: true });
    cpSync(join(source, entry), join(dest, entry), { recursive: true });
  }
}

function readDeps(pkgJsonPath: string): string {
  if (!existsSync(pkgJsonPath)) return '';
  try {
    const raw = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as PkgJson;
    return JSON.stringify(DEP_FIELDS.map((field) => raw[field] ?? {}));
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------- staging ---

const TEXT_EXTS = new Set([
  '.js', '.mjs', '.cjs', '.jsx',
  '.ts', '.tsx', '.mts', '.cts',
  '.map', '.json', '.scss', '.css', '.md',
]);

function rewriteFilesInPlace(dir: string, scope: ScopeConfig): void {
  if (scope.fromScope === scope.toScope && scope.namePrefix === '') return;
  // Тот же матч `@ds/<slug>`, что в `transform-scope.mts`.
  const regex = new RegExp(`${scope.fromScope.replace(/[/@]/g, '\\$&')}/([a-zA-Z0-9._-]+)`, 'g');

  const walk = (current: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const dot = entry.name.lastIndexOf('.');
      if (dot === -1 || !TEXT_EXTS.has(entry.name.slice(dot))) continue;
      const content = readFileSync(full, 'utf8');
      const next = content.replace(regex, (_, slug: string) => `${scope.toScope}/${scope.namePrefix}${slug}`);
      if (next !== content) writeFileSync(full, next, 'utf8');
    }
  };

  walk(dir);
}

function resolveDepSpec(depName: string, spec: string, pkgSlug: string, ctx: LinkContext): string {
  if (spec.startsWith('workspace:')) return '*';
  if (spec === 'catalog:' || spec === 'catalog:default') {
    const range = ctx.catalog.get(depName);
    if (!range) {
      throw new Error(`[ds-link] ${pkgSlug}: ${depName} ссылается на catalog:, но записи в pnpm-workspace.yaml нет`);
    }
    return range;
  }
  if (spec.startsWith('catalog:')) {
    throw new Error(`[ds-link] ${pkgSlug}: именованные каталоги не поддерживаются (${depName}: ${spec})`);
  }
  return spec;
}

/**
 * package.json staging-копии:
 *   - `name` и ключи зависимостей — в published-скоуп;
 *   - `workspace:*` / `workspace:^` → `*`. Потребитель не воркспейс, а точную
 *     копию всё равно навязывают pnpm-overrides. `^<локальная версия>` был бы
 *     хуже: такой версии может не быть в реестре, и install падал бы;
 *   - `catalog:` → диапазон из `pnpm-workspace.yaml`;
 *   - `devDependencies` и `scripts` вырезаются: потребителю они не ставятся,
 *     а неразрешённый `catalog:` внутри них только шумит.
 */
function stagePackageJson(pkg: WorkspacePackage, ctx: LinkContext): PkgJson {
  const raw = JSON.parse(JSON.stringify(pkg.raw)) as PkgJson;
  raw.name = pkg.publishedName;
  delete raw.devDependencies;
  delete raw.scripts;

  for (const field of DEP_FIELDS) {
    const block = raw[field];
    if (!block) continue;
    const next: Record<string, string> = {};
    for (const [depName, spec] of Object.entries(block)) {
      next[publishedNameOf(depName, ctx.scope)] = resolveDepSpec(depName, spec, pkg.slug, ctx);
    }
    raw[field] = next;
  }

  return raw;
}

export function stagePackage(slug: string, ctx: LinkContext): string {
  const pkg = mustGet(ctx.packages, slug);
  const dest = join(STAGE_DIR, slug);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });

  // `files` из package.json — тот же набор, что попал бы в npm-tarball.
  const entries = new Set([...(pkg.raw.files ?? ['dist', 'src']), 'README.md', 'LICENSE', 'CHANGELOG.md']);
  for (const entry of entries) {
    const from = join(pkg.dir, entry);
    if (existsSync(from)) cpSync(from, join(dest, entry), { recursive: true });
  }

  if (!existsSync(join(dest, 'dist'))) {
    throw new Error(`[ds-link] packages/${slug}/dist отсутствует — собери пакет: pnpm build:pkg ${slug}`);
  }

  rewriteFilesInPlace(dest, ctx.scope);
  writeFileSync(join(dest, 'package.json'), `${JSON.stringify(stagePackageJson(pkg, ctx), null, 2)}\n`, 'utf8');

  return dest;
}

// --------------------------------------------------------------- доставка ---

export type DeliverResult = { delivered: boolean; depsChanged: boolean };

/**
 * Каталог в виртуальном сторе pnpm, развёрнутый из нашей `.ds-link`-копии.
 * pnpm кодирует путь зависимости в имя каталога, заменяя разделители на `+`:
 * `.pnpm/@cloud-ru+ds-modal@file+.ds-link+@cloud-ru+ds-modal_react@18/…`.
 */
function isLinkBackedDir(path: string): boolean {
  return path.includes(`@file+${CONSUMER_LINK_DIR}+`);
}

/**
 * Кладёт staging-копию в `<приложение>/.ds-link/<name>` и, если pnpm уже развернул
 * из неё пакет в `node_modules`, доливает файлы туда же.
 *
 * Почему второй шаг нужен: npm и yarn разворачивают `file:`-зависимость
 * символической ссылкой, а pnpm — физической копией в `node_modules/.pnpm/…`.
 * Без второго копирования потребитель видел бы старые файлы до `pnpm install`.
 *
 * Почему второй шаг под проверкой: пока override не прописан и `pnpm install` не
 * прошёл, `node_modules/<name>` ведёт в каталог версии ИЗ РЕЕСТРА. Запись туда
 * подменяет реестровую копию содержимым локальной сборки, и это не лечится ни
 * `ds:unlink`, ни повторным install: pnpm видит каталог на месте и не
 * распаковывает его заново. Поэтому доливаем только в каталог, развёрнутый из
 * `.ds-link` (или в симлинк прямо на неё — случай npm/yarn).
 */
export function deliver(publishedName: string, stageDir: string, consumerDir: string): DeliverResult {
  const dest = join(consumerDir, CONSUMER_LINK_DIR, publishedName);
  const depsBefore = readDeps(join(dest, 'package.json'));
  mirrorDir(stageDir, dest);
  const depsChanged = depsBefore !== '' && depsBefore !== readDeps(join(dest, 'package.json'));

  const installed = join(consumerDir, 'node_modules', publishedName);
  if (existsSync(installed)) {
    const realInstalled = realpathSync(installed);
    const realDest = realpathSync(dest);
    if (realInstalled !== realDest && isLinkBackedDir(realInstalled)) mirrorDir(dest, realInstalled);
  }

  return { delivered: true, depsChanged };
}

/** Собирает, стейджит и разносит пакеты по всем потребителям, которые их подключили. */
export function pushPackages(slugs: string[], ctx: LinkContext, options: { skipBuild?: boolean } = {}): boolean {
  if (!options.skipBuild && !buildPackages(slugs)) return false;

  const registry = readRegistry();
  const needInstall = new Set<string>();

  for (const slug of slugs) {
    const pkg = mustGet(ctx.packages, slug);
    const stageDir = stagePackage(slug, ctx);

    for (const [consumerDir, names] of Object.entries(registry)) {
      if (!names.includes(pkg.publishedName)) continue;
      if (!existsSync(consumerDir)) {
        console.warn(`[ds-link] потребитель пропал, пропускаю: ${consumerDir}`);
        continue;
      }
      const { depsChanged } = deliver(pkg.publishedName, stageDir, consumerDir);
      console.info(`[ds-link] ${pkg.publishedName} → ${consumerDir}`);
      if (depsChanged) needInstall.add(consumerDir);
    }
  }

  // Частая проблема локального подключения: зависимость добавлена внутрь
  // пакета, у потребителя её в node_modules нет, и пакет перестаёт работать
  // без явной ошибки. Отслеживаем по diff'у зависимостей и доустанавливаем.
  for (const consumerDir of needInstall) {
    console.info(`[ds-link] изменились зависимости пакета — ставлю их в ${consumerDir}`);
    run('pnpm', ['install'], consumerDir, 'pnpm install');
  }

  return true;
}

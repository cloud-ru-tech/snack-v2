/**
 * Общая обвязка для ds-link: граф воркспейса, каталог pnpm и правила
 * переименования скоупа.
 *
 * Зачем отдельный модуль: и `push.mts`, и `link.mts` должны одинаково
 * отвечать на вопрос «как называется пакет `packages/<slug>` у потребителя»
 * (`@ds/button` → `@sbercloud/snack-v2-button`) и «какие ещё пакеты доставляются
 * вместе с ним». Рассинхрон между доставкой и подключением означал бы, что
 * overrides указывают не на те имена.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT = resolve(__dirname, '../..');
export const PACKAGES_DIR = join(ROOT, 'packages');
/** Рабочая папка механизма в репозитории DS (gitignored). */
export const LINK_DIR = join(ROOT, '.ds-link');
/** Staging-копии пакетов под published-именами. */
export const STAGE_DIR = join(LINK_DIR, 'stage');
/** Как называется папка с доставленными пакетами внутри потребителя. */
export const CONSUMER_LINK_DIR = '.ds-link';

/** Дефолты совпадают с `pnpm transform:scope @ds @sbercloud snack-v2-`. */
export const DEFAULT_FROM_SCOPE = '@ds';
export const DEFAULT_TO_SCOPE = '@sbercloud';
export const DEFAULT_NAME_PREFIX = 'snack-v2-';

export type DepField = 'dependencies' | 'peerDependencies' | 'optionalDependencies';

export const DEP_FIELDS: DepField[] = ['dependencies', 'peerDependencies', 'optionalDependencies'];

export type PkgJson = {
  name?: string;
  version?: string;
  private?: boolean;
  files?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  [key: string]: unknown;
};

export type WorkspacePackage = {
  /** Имя папки в `packages/`. */
  slug: string;
  dir: string;
  /** Имя в репозитории: `@ds/button`. */
  name: string;
  /** Имя у потребителя: `@sbercloud/snack-v2-button`. */
  publishedName: string;
  version: string;
  private: boolean;
  raw: PkgJson;
};

export type ScopeConfig = {
  fromScope: string;
  toScope: string;
  namePrefix: string;
};

export function normalizeScope(raw: string | undefined, fallback: string): string {
  const s = (raw ?? fallback).trim();
  return s.startsWith('@') ? s : `@${s}`;
}

export function publishedNameOf(name: string, scope: ScopeConfig): string {
  const prefix = `${scope.fromScope}/`;
  if (!name.startsWith(prefix)) return name;
  return `${scope.toScope}/${scope.namePrefix}${name.slice(prefix.length)}`;
}

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

export function readWorkspace(scope: ScopeConfig): Map<string, WorkspacePackage> {
  const bySlug = new Map<string, WorkspacePackage>();
  for (const entry of readdirSync(PACKAGES_DIR)) {
    const dir = join(PACKAGES_DIR, entry);
    if (!isDir(dir)) continue;
    let raw: PkgJson;
    try {
      raw = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as PkgJson;
    } catch {
      continue;
    }
    if (typeof raw.name !== 'string') continue;
    bySlug.set(entry, {
      slug: entry,
      dir,
      name: raw.name,
      publishedName: publishedNameOf(raw.name, scope),
      version: raw.version ?? '0.0.0',
      private: raw.private === true,
      raw,
    });
  }
  return bySlug;
}

/**
 * Плоский блок `catalog:` из `pnpm-workspace.yaml`. Полноценный YAML-парсер
 * тут не нужен (и не хочется добавлять зависимость, которой нет в devDeps рута):
 * блок — одноуровневая карта `имя: диапазон` с комментариями.
 */
export function readCatalog(): Map<string, string> {
  const catalog = new Map<string, string>();
  const lines = readFileSync(join(ROOT, 'pnpm-workspace.yaml'), 'utf8').split('\n');
  let inside = false;
  for (const line of lines) {
    if (/^catalog:\s*$/.test(line)) {
      inside = true;
      continue;
    }
    if (!inside) continue;
    // Любая строка без отступа закрывает блок.
    if (line.trim() !== '' && !/^\s/.test(line)) break;
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    const match = /^'?([^':]+)'?:\s*(.+?)\s*$/.exec(trimmed);
    if (!match) continue;
    catalog.set(match[1], match[2].replace(/^['"]|['"]$/g, ''));
  }
  return catalog;
}

/** Пакет по слагу; отсутствие — ошибка вызывающего кода, а не рантайм-ветка. */
export function mustGet(packages: Map<string, WorkspacePackage>, slug: string): WorkspacePackage {
  const pkg = packages.get(slug);
  if (!pkg) throw new Error(`[yalc] нет пакета packages/${slug}`);
  return pkg;
}

/** Принимает `button`, `@ds/button` и `@sbercloud/snack-v2-button`. */
export function resolveSlug(
  input: string,
  packages: Map<string, WorkspacePackage>,
  scope: ScopeConfig,
): string | undefined {
  const raw = input.trim();
  if (packages.has(raw)) return raw;
  for (const pkg of packages.values()) {
    if (pkg.name === raw || pkg.publishedName === raw) return pkg.slug;
  }
  // Голый слаг с префиксом публикации: `snack-v2-button`.
  const stripped = raw.replace(new RegExp(`^${scope.namePrefix}`), '');
  return packages.has(stripped) ? stripped : undefined;
}

/**
 * Рантайм-замыкание: сам пакет + все его транзитивные workspace-зависимости
 * (`dependencies` / `optionalDependencies`). `peerDependencies` не тянем —
 * их по контракту предоставляет потребитель. Приватные пакеты отбрасываются:
 * их нет в реестре и потребитель их не ставит.
 */
export function runtimeClosure(
  slugs: string[],
  packages: Map<string, WorkspacePackage>,
): string[] {
  const byName = new Map<string, WorkspacePackage>();
  for (const pkg of packages.values()) byName.set(pkg.name, pkg);

  const visited = new Set<string>();
  const stack = [...slugs];
  for (let slug = stack.pop(); slug !== undefined; slug = stack.pop()) {
    if (visited.has(slug)) continue;
    const pkg = packages.get(slug);
    if (!pkg) continue;
    visited.add(slug);
    for (const field of ['dependencies', 'optionalDependencies'] as const) {
      for (const [depName, spec] of Object.entries(pkg.raw[field] ?? {})) {
        if (!spec.startsWith('workspace:')) continue;
        const dep = byName.get(depName);
        if (dep && !visited.has(dep.slug)) stack.push(dep.slug);
      }
    }
  }

  return [...visited].filter((slug) => !mustGet(packages, slug).private).sort();
}

/** Топологический порядок (зависимости раньше зависящих) внутри набора. */
export function topoSort(slugs: string[], packages: Map<string, WorkspacePackage>): string[] {
  const set = new Set(slugs);
  const byName = new Map<string, WorkspacePackage>();
  for (const pkg of packages.values()) byName.set(pkg.name, pkg);

  const ordered: string[] = [];
  const seen = new Set<string>();

  function visit(slug: string, path: Set<string>): void {
    if (seen.has(slug)) return;
    if (path.has(slug)) return; // цикл — просто не зацикливаемся
    path.add(slug);
    const pkg = packages.get(slug);
    for (const field of ['dependencies', 'optionalDependencies'] as const) {
      for (const [depName, spec] of Object.entries(pkg?.raw[field] ?? {})) {
        if (!spec.startsWith('workspace:')) continue;
        const dep = byName.get(depName);
        if (dep && set.has(dep.slug)) visit(dep.slug, path);
      }
    }
    path.delete(slug);
    seen.add(slug);
    ordered.push(slug);
  }

  for (const slug of [...slugs].sort()) visit(slug, new Set());
  return ordered;
}

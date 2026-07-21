#!/usr/bin/env node
/**
 * Подключение / отключение локальных пакетов в приложении-потребителе.
 *
 *   pnpm ds:link   ~/path/to/app button   # собрать, доставить, подключить
 *   pnpm ds:link   ~/path/to/app          # переподключить уже подключённое
 *   pnpm ds:unlink ~/path/to/app          # вернуть версии из реестра
 *   pnpm ds:status                                # что и куда подключено
 *
 * Привязка держится на `pnpm.overrides` (`@cloud-ru/ds-<pkg>` →
 * `file:.ds-link/@cloud-ru/ds-<pkg>`). Именно overrides, а не запись в
 * `dependencies`: иначе локальной станет только та копия, которую подключили
 * напрямую, а транзитивная ссылка (`modal` → `utils`) будет установлена из
 * реестра — в `node_modules` окажутся две копии пакета с разными
 * React-контекстами. Плюс это ровно один блок в package.json, который целиком
 * снимается на unlink.
 *
 * Опции:
 *   --skip-install   не запускать `pnpm install` у потребителя
 *   --with-deps      подменить и workspace-зависимости названных пакетов
 */
import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';

import { buildPackages,deliver, LinkContext, readRegistry, run, stagePackage, writeRegistry } from './core.mts';
import {
  CONSUMER_LINK_DIR,
  DEFAULT_FROM_SCOPE,
  DEFAULT_NAME_PREFIX,
  DEFAULT_TO_SCOPE,
  mustGet,
  normalizeScope,
  readCatalog,
  readWorkspace,
  resolveSlug,
  runtimeClosure,
  ScopeConfig,
  topoSort,
} from './workspace.mts';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    remove: { type: 'boolean', default: false },
    status: { type: 'boolean', default: false },
    'with-deps': { type: 'boolean', default: false },
    'skip-install': { type: 'boolean', default: false },
    scope: { type: 'string' },
    prefix: { type: 'string' },
  },
});

const scope: ScopeConfig = {
  fromScope: DEFAULT_FROM_SCOPE,
  toScope: normalizeScope(values.scope, DEFAULT_TO_SCOPE),
  namePrefix: values.prefix ?? DEFAULT_NAME_PREFIX,
};

// ------------------------------------------------------------------ status ---

if (values.status) {
  const registry = readRegistry();
  const consumers = Object.entries(registry);
  if (consumers.length === 0) {
    console.info('[ds-link] ничего не подключено');
  } else {
    for (const [dir, names] of consumers) {
      console.info(`${dir}${existsSync(dir) ? '' : '  (папки нет)'}`);
      for (const name of names) console.info(`  · ${name}`);
    }
  }
  process.exit(0);
}

const target = positionals[0];
if (!target) {
  console.error('Usage: pnpm ds:link <путь-до-приложения> [<pkg>,...] | pnpm ds:unlink <путь-до-приложения>');
  process.exit(2);
}

const consumerDir = isAbsolute(target) ? target : resolve(process.cwd(), target);
const consumerPkgJsonPath = join(consumerDir, 'package.json');
if (!existsSync(consumerPkgJsonPath)) {
  console.error(`[ds-link] в ${consumerDir} нет package.json`);
  process.exit(1);
}

type ConsumerPkgJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  pnpm?: { overrides?: Record<string, string>; [key: string]: unknown };
  [key: string]: unknown;
};

function readConsumerPkgJson(): ConsumerPkgJson {
  return JSON.parse(readFileSync(consumerPkgJsonPath, 'utf8')) as ConsumerPkgJson;
}

function writeConsumerPkgJson(json: ConsumerPkgJson): void {
  writeFileSync(consumerPkgJsonPath, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
}

const OVERRIDE_PREFIX = `file:${CONSUMER_LINK_DIR}/`;

/** Разбирает ключ override: `@scope/name` либо `@scope/name@1.2.3`. */
function splitOverrideKey(key: string): { name: string; version?: string } {
  const at = key.lastIndexOf('@');
  return at > 0 ? { name: key.slice(0, at), version: key.slice(at + 1) } : { name: key };
}

/** Версия пакета, установленная у потребителя сейчас (до нашей подмены). */
function readInstalledVersion(dir: string, name: string): string | undefined {
  try {
    const raw = JSON.parse(readFileSync(join(dir, 'node_modules', name, 'package.json'), 'utf8')) as {
      version?: string;
    };
    return raw.version;
  } catch {
    return undefined;
  }
}

// ------------------------------------------------------------------ unlink ---

if (values.remove) {
  const json = readConsumerPkgJson();
  const overrides = json.pnpm?.overrides;
  let removed = 0;
  if (json.pnpm && overrides) {
    for (const [name, spec] of Object.entries(overrides)) {
      if (spec.startsWith(OVERRIDE_PREFIX)) {
        delete overrides[name];
        removed++;
      }
    }
    if (Object.keys(overrides).length === 0) delete json.pnpm.overrides;
    if (Object.keys(json.pnpm).length === 0) delete json.pnpm;
    writeConsumerPkgJson(json);
  }

  rmSync(join(consumerDir, CONSUMER_LINK_DIR), { recursive: true, force: true });

  const registry = readRegistry();
  delete registry[consumerDir];
  writeRegistry(registry);

  console.info(`[ds-link] снято overrides: ${removed}`);
  if (!values['skip-install']) run('pnpm', ['install'], consumerDir, 'pnpm install');
  process.exit(0);
}

// -------------------------------------------------------------------- link ---

const ctx: LinkContext = { packages: readWorkspace(scope), catalog: readCatalog(), scope };
const registry = readRegistry();

const rawNames = positionals
  .slice(1)
  .join(',')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

let requested: string[];
if (rawNames.length > 0) {
  requested = [];
  for (const name of rawNames) {
    const slug = resolveSlug(name, ctx.packages, scope);
    if (!slug) {
      console.error(`[ds-link] пакет не найден: ${name}`);
      process.exit(1);
    }
    if (mustGet(ctx.packages, slug).private) {
      console.error(`[ds-link] packages/${slug} приватный — его нельзя отдать потребителю`);
      process.exit(1);
    }
    requested.push(slug);
  }
} else {
  // Без списка пакетов — переподключается то, что уже записано за этим приложением.
  const known = new Set(registry[consumerDir] ?? []);
  requested = [...ctx.packages.values()].filter((p) => known.has(p.publishedName)).map((p) => p.slug);
  if (requested.length === 0) {
    console.error(`[ds-link] за ${consumerDir} ничего не закреплено — укажи пакеты: pnpm ds:link <путь> button`);
    process.exit(1);
  }
}

// Подменяются только названные пакеты. Их workspace-зависимости остаются в
// staging-копии как `*`, и pnpm переиспользует те версии, что уже стоят у
// потребителя, — одна копия в дереве, без незапрошенных обновлений соседних
// пакетов. `--with-deps` подменяет всё замыкание: нужно, когда правка задела
// сразу несколько пакетов и версии у потребителя для неё слишком старые.
const targets = topoSort(values['with-deps'] ? runtimeClosure(requested, ctx.packages) : requested, ctx.packages);
const names = targets.map((slug) => mustGet(ctx.packages, slug).publishedName);

console.info(`[ds-link] подключаем в ${consumerDir} (${targets.length}): ${targets.join(', ')}`);

// Версии, которые у потребителя стоят сейчас: они уйдут в ключ override
// (`<имя>@<версия>`), чтобы подменялась только та ветка графа, которая просит
// именно её. Читать нужно до доставки — иначе увидим уже свою staging-копию.
const pinnedVersions = new Map<string, string>();
const previousOverrides = readConsumerPkgJson().pnpm?.overrides ?? {};
for (const name of names) {
  // При повторной линковке версия уже зафиксирована в ключе прошлого override.
  const previousKey = Object.keys(previousOverrides).find(
    (key) => splitOverrideKey(key).name === name && previousOverrides[key].startsWith(OVERRIDE_PREFIX),
  );
  const previousVersion = previousKey ? splitOverrideKey(previousKey).version : undefined;
  const installed = previousVersion ?? readInstalledVersion(consumerDir, name);
  if (installed) pinnedVersions.set(name, installed);
}

// Локальная сборка компилировалась против версий монорепы. Всё, что осталось у
// потребителя своим, показываем: расхождение может дать ошибку в рантайме.
if (!values['with-deps']) {
  const drift: string[] = [];
  for (const slug of runtimeClosure(requested, ctx.packages)) {
    const pkg = mustGet(ctx.packages, slug);
    if (names.includes(pkg.publishedName)) continue;
    const installed = readInstalledVersion(consumerDir, pkg.publishedName);
    if (installed && installed !== pkg.version) drift.push(`  ${slug}: у потребителя ${installed}, в репо ${pkg.version}`);
  }
  if (drift.length > 0) {
    console.warn(
      `[ds-link] зависимости остаются версий потребителя, но собирались против версий репо:\n${drift.join('\n')}\n` +
        `[ds-link] если правка их задевает — добавь пакет в список либо используй --with-deps`,
    );
  }
}

if (!buildPackages(targets)) process.exit(1);
for (const slug of targets) {
  const pkg = mustGet(ctx.packages, slug);
  deliver(pkg.publishedName, stagePackage(slug, ctx), consumerDir);
}

const json = readConsumerPkgJson();
json.pnpm ??= {};
json.pnpm.overrides ??= {};
// Прошлые записи этого механизма снимаем: версия в ключе могла измениться.
for (const [key, spec] of Object.entries(json.pnpm.overrides)) {
  if (spec.startsWith(OVERRIDE_PREFIX) && names.includes(splitOverrideKey(key).name)) delete json.pnpm.overrides[key];
}
for (const name of names) {
  const pinned = pinnedVersions.get(name);
  json.pnpm.overrides[pinned ? `${name}@${pinned}` : name] = `${OVERRIDE_PREFIX}${name}`;
}
writeConsumerPkgJson(json);

const gitignorePath = join(consumerDir, '.gitignore');
const gitignore = existsSync(gitignorePath) ? readFileSync(gitignorePath, 'utf8') : '';
if (!gitignore.split('\n').some((line) => line.trim().replace(/\/$/, '') === CONSUMER_LINK_DIR)) {
  appendFileSync(gitignorePath, `${gitignore === '' || gitignore.endsWith('\n') ? '' : '\n'}\n# локально подключённые пакеты дизайн-системы\n${CONSUMER_LINK_DIR}\n`);
  console.info(`[ds-link] в .gitignore добавлено: ${CONSUMER_LINK_DIR}`);
}

registry[consumerDir] = [...new Set([...(registry[consumerDir] ?? []), ...names])].sort();
writeRegistry(registry);

// Overrides перенаправляют зависимость, но не создают её: если пакета нет в
// графе потребителя, подменять нечего.
const consumerDeps = { ...(json.dependencies ?? {}), ...(json.devDependencies ?? {}) };
if (!names.some((name) => name in consumerDeps)) {
  console.warn(
    `[ds-link] предупреждение: ни один из пакетов не объявлен в dependencies потребителя. ` +
      `Overrides подменяют существующую зависимость, но не добавляют новую — ` +
      `для нового пакета сначала \`pnpm add ${names[0]}\`.`,
  );
}

if (!values['skip-install']) run('pnpm', ['install'], consumerDir, 'pnpm install');

console.info('\n[ds-link] готово. Дальше: pnpm ds:watch ' + targets[targets.length - 1]);
console.info(`[ds-link] отключить: pnpm ds:unlink ${consumerDir}`);

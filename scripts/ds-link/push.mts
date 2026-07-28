#!/usr/bin/env node
/**
 * Пересборка пакетов и доставка их в подключённые приложения.
 *
 *   pnpm ds:push                # все пакеты, которые куда-то подключены
 *   pnpm ds:push button         # только этот (+ его workspace-зависимости)
 *   pnpm ds:watch button        # то же, но по каждому изменению `src`
 *
 * Опции:
 *   --watch        следить за `packages/<slug>/src`
 *   --skip-build   не вызывать `pnpm build:pkg` (dist уже свежий)
 *   --with-deps    пересобрать и разослать ещё и workspace-зависимости
 *   --keep-scope   работать под `@ds/*` без переименования
 *   --scope=@x     целевой скоуп (дефолт `@sbercloud`)
 *   --prefix=y-    префикс имени (дефолт `snack-v2-`)
 */
import { existsSync, statSync, watch } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { LinkContext, pushPackages, readRegistry } from './core.mts';
import {
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
    watch: { type: 'boolean', default: false },
    'skip-build': { type: 'boolean', default: false },
    'with-deps': { type: 'boolean', default: false },
    'keep-scope': { type: 'boolean', default: false },
    scope: { type: 'string' },
    prefix: { type: 'string' },
  },
});

const scope: ScopeConfig = values['keep-scope']
  ? { fromScope: DEFAULT_FROM_SCOPE, toScope: DEFAULT_FROM_SCOPE, namePrefix: '' }
  : {
      fromScope: DEFAULT_FROM_SCOPE,
      toScope: normalizeScope(values.scope, DEFAULT_TO_SCOPE),
      namePrefix: values.prefix ?? DEFAULT_NAME_PREFIX,
    };

const ctx: LinkContext = { packages: readWorkspace(scope), catalog: readCatalog(), scope };

const rawNames = positionals
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
    if (!requested.includes(slug)) requested.push(slug);
  }
} else {
  // Без аргументов — обновляется ровно то, что уже куда-то подключено.
  const linked = new Set(Object.values(readRegistry()).flat());
  requested = [...ctx.packages.values()].filter((p) => linked.has(p.publishedName)).map((p) => p.slug);
  if (requested.length === 0) {
    console.error('[ds-link] ничего не подключено — начни с `pnpm ds:link <путь-до-приложения> <pkg>`');
    process.exit(1);
  }
}

// Собираем и рассылаем только то, что реально подключено: доставка всё равно
// идёт лишь зарегистрированным потребителям, а сборка замыкания на каждое
// сохранение — впустую потраченное время. `--with-deps` возвращает замыкание.
const linkedNames = new Set(Object.values(readRegistry()).flat());
const unlinked = requested.filter((slug) => !linkedNames.has(mustGet(ctx.packages, slug).publishedName));
if (unlinked.length > 0) {
  console.warn(`[ds-link] не подключены ни к одному приложению, пропускаю: ${unlinked.join(', ')}`);
}

const scoped = requested.filter((slug) => linkedNames.has(mustGet(ctx.packages, slug).publishedName));
if (scoped.length === 0) {
  console.error('[ds-link] нечего рассылать — подключи пакет: pnpm ds:link <путь-до-приложения> <pkg>');
  process.exit(1);
}

const targets = topoSort(values['with-deps'] ? runtimeClosure(scoped, ctx.packages) : scoped, ctx.packages);
console.info(`[ds-link] пакеты (${targets.length}): ${targets.join(', ')}`);

if (!pushPackages(targets, ctx, { skipBuild: values['skip-build'] })) process.exit(1);

if (Object.keys(readRegistry()).length === 0) {
  console.info('[ds-link] пока ни одно приложение не подключено: pnpm ds:link <путь-до-приложения>');
}

// ------------------------------------------------------------------- watch ---

if (values.watch) {
  const pending = new Set<string>();
  let timer: NodeJS.Timeout | undefined;
  let running = false;

  const flush = (): void => {
    if (running || pending.size === 0) return;
    running = true;
    const slugs = topoSort([...pending], ctx.packages);
    pending.clear();
    console.info(`\n[ds-link] изменения: ${slugs.join(', ')}`);
    pushPackages(slugs, ctx);
    running = false;
    // Пока шла сборка, могли поступить новые правки.
    if (pending.size > 0) schedule();
  };

  function schedule(): void {
    clearTimeout(timer);
    timer = setTimeout(flush, 300);
  }

  for (const slug of targets) {
    const srcDir = join(mustGet(ctx.packages, slug).dir, 'src');
    if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) continue;
    watch(srcDir, { recursive: true }, () => {
      pending.add(slug);
      schedule();
    });
  }

  console.info(`\n[ds-link] watch: ${targets.join(', ')} — Ctrl+C для выхода`);
}

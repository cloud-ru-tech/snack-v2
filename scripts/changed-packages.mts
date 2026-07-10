#!/usr/bin/env node
/**
 * Печатает через запятую slug'и (имена папок в `packages/`) публичных пакетов,
 * которые lerna версионировала бы в следующем `lerna version` — то есть
 * изменённые ПЛЮС все их транзитивные dependents (fan-out). Ровно этот набор
 * потом и публикуется, поэтому его же и билдим.
 *
 * Обёртка над `lerna changed`: база сравнения (последний релизный тег) и
 * `ignoreChanges` (`stories/`, `__test__/`, `demos/`, `docs/`, `*.md`) берутся
 * из `lerna.json`, поэтому набор гарантированно совпадает с тем, что забампит
 * `lerna version` / опубликует `pnpm publish`. Используется в preview-джобе,
 * чтобы `build:pkg <этот набор>` собирал только его (+ его зависимости), а не
 * весь монорепо через `build:packages`.
 *
 * Пустой stdout (exit 0) — изменений нет: `lerna changed` при этом завершается
 * ненулевым кодом, ловим и трактуем как «нечего собирать».
 *
 * Usage:
 *   pnpm exec tsx scripts/changed-packages.mts            # slug1,slug2,…
 *   pnpm exec tsx scripts/changed-packages.mts --names    # @ds/slug1,@ds/slug2,…
 */
import { execFileSync } from 'node:child_process';
import { basename } from 'node:path';

const wantNames = process.argv.includes('--names');

let raw: string;
try {
  raw = execFileSync('pnpm', ['exec', 'lerna', 'changed', '--json', '--include-merged-tags'], {
    encoding: 'utf8',
    // lerna пишет notice/info в stderr, JSON-массив — в stdout.
    stdio: ['ignore', 'pipe', 'inherit'],
  });
} catch {
  // `lerna changed` → exit 1, когда изменённых нет. Для нас это не ошибка.
  process.exit(0);
}

type ChangedPackage = { name: string; location: string; private?: boolean };

let pkgs: ChangedPackage[] = [];
try {
  pkgs = JSON.parse(raw) as ChangedPackage[];
} catch {
  process.exit(0);
}

const out = pkgs
  .filter((p) => !p.private)
  .map((p) => (wantNames ? p.name : basename(p.location)))
  .join(',');

process.stdout.write(out);

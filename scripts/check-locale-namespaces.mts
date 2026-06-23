#!/usr/bin/env node
/**
 * Guardrail для namespace'ов локали: `pnpm check:locale-namespaces`.
 *
 * Namespace в `defineLocale('<ns>', …)` — глобальный ключ в одном реестре оверрайдов: при коллизии
 * строки двух пакетов тихо сливаются в один слот и оверрайд применяется не туда. Правило одно:
 * **namespace === имя пакета** (`@ds/calendar`). Имена пакетов уникальны по построению, поэтому
 * namespace'ы не пересекаются.
 *
 * Пакет объявляет ровно один словарь. Под-области пакета (как `container`/`upload` у тостера) — это
 * вложенные ключи словаря, а не отдельные namespace'ы.
 *
 * Скрипт сканирует `packages/<pkg>/src/locale/**\/*.ts`, сверяет каждый namespace с именем пакета и
 * проверяет глобальную уникальность. Падает с кодом 1 на первом нарушении. Демо/сторе-namespace'ы вне
 * этих папок (playground, stories) не проверяются — они не попадают в публичный реестр пакетов.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagesDir = join(root, 'packages');

const DEFINE_LOCALE = /defineLocale\(\s*(['"])([^'"]+)\1/g;

type Entry = { pkg: string; namespace: string; file: string };

function tsFiles(dir: string): string[] {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return tsFiles(full);
    return e.name.endsWith('.ts') ? [full] : [];
  });
}

const entries: Entry[] = [];
const errors: string[] = [];

for (const dir of readdirSync(packagesDir)) {
  const localeDir = join(packagesDir, dir, 'src', 'locale');
  const files = tsFiles(localeDir);
  if (files.length === 0) continue;

  const pkgName: string = JSON.parse(readFileSync(join(packagesDir, dir, 'package.json'), 'utf8')).name;

  const found: Entry[] = [];
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(DEFINE_LOCALE)) {
      found.push({ pkg: pkgName, namespace: m[2], file: file.slice(root.length + 1) });
    }
  }
  if (found.length === 0) continue;

  if (found.length > 1) {
    errors.push(`${found[0].file}: пакет ${pkgName} объявляет ${found.length} словаря — нужен один (под-области через вложенные ключи).`);
  }
  for (const e of found) {
    if (e.namespace !== pkgName) {
      errors.push(`${e.file}: namespace '${e.namespace}' — ожидается '${pkgName}' (namespace === имя пакета).`);
    }
  }
  entries.push(...found);
}

// Глобальная уникальность namespace'ов между пакетами.
const byNamespace = new Map<string, Entry[]>();
for (const e of entries) {
  const list = byNamespace.get(e.namespace) ?? [];
  list.push(e);
  byNamespace.set(e.namespace, list);
}
for (const [namespace, list] of byNamespace) {
  if (list.length > 1) {
    errors.push(`namespace '${namespace}' дублируется в пакетах: ${list.map((e) => e.pkg).join(', ')}.`);
  }
}

if (errors.length > 0) {
  console.error('check-locale-namespaces: найдены нарушения:\n');
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`\nПравило: namespace === имя пакета; один словарь на пакет, под-области — вложенные ключи.`);
  process.exit(1);
}

console.info(`check-locale-namespaces: ${entries.length} namespace'ов в ${byNamespace.size} слотах — нарушений нет.`);

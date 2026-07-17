/**
 * Синхронизирует `typesVersions` в package.json с фактическими подпутями `exports`.
 *
 * `typesVersions` — механизм TS, независимый от `exports`: он даёт classic/`node`
 * module-резолюшену (которая не понимает поле `exports` вовсе) найти `.d.ts` подпути.
 * Он нужен, потому что `packages/tsconfig.cjs.json` (общий для CJS-сборки каждого пакета
 * монорепо) закреплён на `moduleResolution: 'node'` — апгрейд на `bundler`/`node16` там
 * невозможен без смены `module` на ESM-формат, что сломало бы CJS-эмит. Без этого поля
 * любой пакет монорепо, импортирующий `@ds/icons/interface/system` и т.п. в своём CJS-билде,
 * получает `TS2307: Cannot find module`.
 *
 * Каждая запись в `typesVersions['*']` выводится напрямую из соответствующей записи
 * `exports` (поле `types`) — один источник истины, ручная рассинхронизация невозможна.
 */
import fs from 'fs';
import { join } from 'path';

const PACKAGE_JSON_PATH = join(import.meta.dirname, '..', '..', 'package.json');

type ExportCondition = { types?: string } | string;

function main(): void {
  const raw = fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8');
  const pkg = JSON.parse(raw) as {
    exports?: Record<string, ExportCondition>;
    typesVersions?: unknown;
  };

  const exportsMap = pkg.exports ?? {};
  const versions: Record<string, string[]> = {};

  for (const [subpath, condition] of Object.entries(exportsMap)) {
    if (subpath === '.' || subpath === './package.json' || typeof condition === 'string') continue;
    const types = condition.types;
    if (typeof types !== 'string') continue;
    versions[subpath.replace(/^\.\//, '')] = [types.replace(/^\.\//, '')];
  }

  pkg.typesVersions = { '*': versions };

  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

  // eslint-disable-next-line no-console
  console.log(`typesVersions синхронизирован: подпутей ${Object.keys(versions).length}.`);
}

main();

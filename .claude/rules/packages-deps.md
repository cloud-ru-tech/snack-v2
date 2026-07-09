# Зависимости пакетов (`packages/*/package.json`)

Принцип: published-пакеты должны нести потребителю **semver-диапазоны** (`^`), а не приколоченные версии — иначе у потребителя плодятся дубликаты, когда его приложение уже тянет совместимую версию той же библиотеки. Детерминизм разработки при этом держит lockfile (он пинит фактическую разрешённую версию), а не пины в `package.json`.

- **Consumer-facing внешние deps — через `^`.** Всё, что едет потребителю (`dependencies`, `peerDependencies`), объявляется каретой: `"rc-slider": "^11.1.9"`. Никаких голых пинов (`"11.1.9"`) и никаких `~ >= *` вместо `^`. Повторяющиеся в 2+ пакетах — через `catalog:` (диапазон живёт в `pnpm-workspace.yaml::catalog` — там тоже `^`, см. ниже).
- **`devDependencies` — строгий пин.** Их потребитель не устанавливает, поэтому карета им ничего не даёт, а пин полезнее для детерминизма локальных билдов: `"sass": "catalog:"` (каталог-запись `sass`/`typescript`/`vitest` остаётся пиннутой), литеральный dev-dep — точной версией (`"@types/lodash.throttle": "4.1.8"`).
- **Внутренние `@ds/*` — через `workspace:^`** (не `workspace:*`). `workspace:^`, `catalog:` — это протоколы pnpm, не версии; допустимы. При публикации `workspace:^` разворачивается в `^<version>`. Исключение — `apps/*` (storybook/docs не публикуются): там `workspace:*`.
- **`catalog:` публикуется как есть.** Специфаер `catalog:` на publish разворачивается в значение из `pnpm-workspace.yaml::catalog`. Поэтому в каталоге consumer-facing записи держим каретой (`classnames: ^2.5.1`), а чисто-dev — пиннутыми (`sass: 1.99.0`, `typescript: 5.9.3`, `vitest`/`@vitest/*`). `react`/`react-dom`/`@types/react*` в каталоге остаются пиннутыми — они для рута/оверрайдов, в пакетах не объявляются.
- **Не объявляй `react` / `react-dom` / `@types/react*`** ни в `dependencies`, ни в `peerDependencies`, ни в `devDependencies`. React и его типы даёт корневой workspace (сборка/тесты) и потребитель пакета; версия пиннится корневым `pnpm.overrides` (`react: catalog:` и т.д.).

```json
// ❌ "rc-slider": "11.1.9" (голый пин consumer-facing)  |  "@ds/utils": "workspace:*"
//    "classnames": "~2.5.1" / ">=2" (не ^)              |  "dependencies": { "react": "18.3.1" }
// ✅
{ "dependencies": { "@ds/utils": "workspace:^", "classnames": "catalog:", "rc-slider": "^11.1.9" },
  "peerDependencies": { "react-hook-form": "^7.79.0" },
  "devDependencies": { "sass": "catalog:", "typescript": "catalog:" } }
```

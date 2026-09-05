# Coverage — стандарт

**Область действия:** `packages/*/src/**/*.{ts,tsx}` и сбор coverage через runtime V8 (Playwright/CDP) с маппингом по sourcemaps.

## Принцип

Coverage в монорепо собирается **на пакет** из трёх источников и мерджится в единый отчёт:

| Источник            | Куда пишется             | Что покрывает |
|---------------------|--------------------------|---------------|
| Playwright harvester (`playwright/coverage/play-functions.spec.ts`) | `coverage/raw/playwright/` | play-функции stories (отфильтрованные `STORIES_FILTER`) + e2e specs пакетов |
| Storybook addon-vitest (если включён, в этом репо пока не используется) | `coverage/raw/storybook/` | browser-vitest от Storybook addon-vitest |
| Vitest unit tests (`packages/*/__tests__/*.test.ts`) | `coverage/raw/vitest/` | чистые утилиты, менеджеры, hook'и-функции — всё, что не дёргается JSX-рендером в stories |

Merge в `coverage/report/` делает `scripts/coverage-merge.mts`.

Команды:

```bash
# Полный пайплайн на пакет (playwright + harvester + unit, если есть):
pnpm test:coverage:pkg <pkg>          # playwright + harvester, merge
pnpm exec vitest run packages/<pkg> --coverage  # отдельно unit; добивает coverage/raw/vitest/
pnpm coverage:merge                   # пересобрать отчёт после добавления vitest
```

Coverage снимается **рантаймом** (V8/CDP через Playwright), без пред-инструментации
бандла. Storybook собирается чистым **с sourcemaps** (`build.sourcemap: true` в
`apps/storybook/.storybook/main.ts`); фикстура `collectCoverage`
(`playwright/fixtures.ts`) вызывает `page.coverage.startJSCoverage` /
`stopJSCoverage`, преобразует V8-формат в istanbul через `v8-to-istanbul` по
sourcemaps и пишет в `coverage/raw/playwright/`. Один и тот же чистый билд идёт
и в деплой, и в тесты — на MR и на master одинаково (никакого `INSTRUMENT`).

Для локального прогона нужен собранный и поднятый storybook-static (с sourcemaps):

```bash
pnpm exec tsx scripts/coverage-serve.mts &   # build static + http-server :6006
```

### vitest unit-source приоритетен

Для файлов, покрытых **vitest unit-тестом**, данные из storybook/playwright **игнорируются** на стадии merge (`scripts/coverage-merge.mts`). Причина: vitest istanbul и V8-конвертация (v8-to-istanbul) дают для одного файла разные `statementMap` (разные позиции/количество statement'ов). При обычном merge istanbul берёт **union** statement'ов, totals раздуваются, и реально полностью покрытый файл показывает 60-70%.

Из этого следует **правило**: для файла либо есть unit-тест (тогда он = единственный источник правды), либо нет (тогда покрытие — только через play/e2e). **Не смешивай покрытие одного файла из двух источников**: написал unit-тест на `partitionFiles` → этот файл целиком должен покрываться unit'ом, не try-через-сторю-and-unit.

## Пороги per-package

Применяются ко всем публичным компонентным пакетам (`packages/*`, **кроме** перечисленных в §«Исключения»):

| Метрика    | Минимум |
|------------|---------|
| lines      | **80%** |
| statements | **80%** |
| functions  | **75%** |
| branches   | **70%** |

Источник дефолтов — `scripts/coverage-gate.mts::DEFAULT_MIN`. Если пакет ушёл ниже — CI red. Локально проверить:

```bash
pnpm test:coverage:pkg <pkg>
pnpm exec tsx scripts/coverage-gate.mts \
  --min-stmts=80 --min-funcs=75 --min-branches=70 --min-lines=80 \
  <pkg>
```

## Что учитывается в coverage

Фикстура `collectCoverage` (`playwright/fixtures.ts`) фильтрует исходники из
V8-coverage функцией `isCoverableSource` — учитывает **только** runtime-код
пакетов, отбрасывая остальное (паритет с прежними istanbul include/exclude):

```ts
// учитываем: packages/<pkg>/src/**/*.{ts,tsx}
// отбрасываем:
//   /node_modules/, /__test__/
//   *.stories.{ts,tsx}, *.test.{ts,tsx}, *.d.ts
//   index.ts (барели), types.ts (type-only)
```

`index.ts` / `types.ts` исключены потому что:
- Барели (`export * from './...'`) не несут runtime-логики; Istanbul считает их `0%` и тянет per-пакет метрику вниз без сигнала о реальных проблемах.
- Type-only файлы вырезаются TypeScript'ом при сборке; в бандле от них ничего не остаётся — `0%` бессмыслен.

Если файл назван `index.ts` или `types.ts`, но содержит runtime-код, который ты хочешь покрыть — переименуй файл (например, `helpers.ts`, `factory.ts`) либо вынеси код в отдельный модуль рядом и оставь `index.ts` чистым барелем.

## Unit-тесты vs play-функции

Каждый файл `packages/<pkg>/src/**` покрывается **одним** способом. Решение зависит от того, дёргается ли код реальным JSX-рендером:

- **Чистые утилиты, экспортируемые потребителям, но не вызываемые внутри JSX компонента** (parsers, normalizers, helpers, `partitionFiles`, `buildAcceptAttribute` и т.п.) — **unit-тестом vitest** в `packages/<pkg>/__tests__/<file>.test.ts`. Story play их физически не дёрнет. Признак: `grep -rn "<func>" packages/<pkg>/src --include="*.tsx"` ничего не находит, только `src/utils.ts` или leaf-file.
- **Менеджеры состояния и сервисы**, у которых поверхность тестируется на инвариантах с fake timers (toaster manager, calendar grid builder) — **unit-тестом vitest**.
- **Компоненты и хуки, активирующиеся при рендере JSX** (`useDrag`, `useClearButton` в SearchPrivate) — через **play-функции** stories (InteractionTest, examples, harvester'ом).
- **Hook'и-расширенные surface'ы, которые потребитель дёргает частично** (см. `useButtonNavigation` ниже) — fixture-стори с play, **не** unit-тест (хук завязан на refs и event'ы).

**Признак того, что нужен unit-тест, а не play**: после прогона `pnpm test:coverage:pkg <pkg>` файл показывает 0-30% lines, а в `src/` его никто не импортит — он только в `src/index.ts` для экспорта потребителю.

Расположение unit-тестов: `packages/<pkg>/__tests__/<targetfile>.test.ts` (двойное подчёркивание; не путать с `__test__/` для Playwright spec'ов). Конфиг в корневом `vitest.config.ts`.

## Исключения per-package gate

Per-package порог **не** распространяется на:

- **Утилитные пакеты без UI**: `utils`, `locale`, `fonts`, `materials`, `portal-context`, `icon-predefined`, `scroll`.
- **Иконочные пакеты с гигантской генерируемой поверхностью**: `icons`. Покрываются smoke-тестом «компонент рендерится», поверхность 12K+ LOC автогенерируется.
- **Private internal-пакеты** (`*-private`): `input-private`, `search-private`, `popover-private`. Их API — публичные хуки и компоненты, потребляемые другими `@ds/*`. Порог применяется, но для покрытия hook-only кода допустимы **fixture-стори** в `tests/` (см. ниже).

Список исключений живёт в `scripts/coverage-gate.mts` и `scripts/coverage-mr.mts`. Чтобы добавить — обнови оба места одновременно.

## Fixture-стори для hook'ов

Некоторые hook'и (`useButtonNavigation` в `input-private`, `useLayered` в портал-пакетах) экспортируют ветви, которые реальные потребители дёргают **частично**. Например, `useButtonNavigation` поддерживает arrow-навигацию через prefix/postfix кнопки, но в `@ds/search` используется с единственной `clearButton`-кнопкой — arrow-ветви не покрыты.

Для таких hook'ов разрешено заводить **fixture-стори** в `packages/<pkg>/stories/<Component>/tests/<Component>.<Hook>Fixture.stories.tsx`:

```tsx
// packages/input-private/stories/InputPrivate/tests/InputPrivate.NavigationFixture.stories.tsx
import { Button } from '@ds/button';

function NavigationFixture() {
  // wrapper-компонент с N prefix/postfix кнопками, который никогда
  // не появится в продакшен-коде потребителя — он существует ради покрытия
  // arrow-nav ветвей useButtonNavigation. Триггерные кнопки — @ds/button,
  // не native <button>, по правилу stories-standard.md.
  const nav = useButtonNavigation({ ... });
  return <div>{nav.prefixButtons}<InputPrivate {...} />{nav.postfixButtons}</div>;
}

export const NavigationFixture: Story = {
  tags: ['test', 'dev'],
  render: () => <NavigationFixture />,
  play: async ({ canvasElement, step }) => { /* arrow-nav scenarios */ },
};
```

Правила:

- Имя файла — `<Component>.<Hook>Fixture.stories.tsx`, имя экспорта совпадает с сегментом — `<Hook>Fixture` (без trailing underscore, без `name:` override).
- title — `Components/<Pkg>/Tests/<Hook>Fixture`.
- Тег `['test', 'dev']` обязательны (попадает в harvester + видна в сайдбаре для отладки).
- В JSDoc сверху файла — **одно предложение** почему это fixture, а не реальный сценарий, со ссылкой на этот файл (`coverage-standard.md`).
- Триггерные кнопки внутри fixture — `Button` из `@ds/button` (см. [stories-standard.md](./stories-standard.md), запрет native `<button>`).
- Локаторы в play — только `getByTestId`. У каждой prefix/postfix кнопки fixture должен быть собственный `data-test-id`.
- Fixture-стори не считается публичной API-документацией: её **не** реэкспортят в `docs/`, не показывают в Figma-секции.

## Команды

| Цель                                | Команда                                                                |
|-------------------------------------|------------------------------------------------------------------------|
| Coverage одного пакета (playwright) | `pnpm test:coverage:pkg <pkg>`                                          |
| Coverage только unit-тестов         | `pnpm exec vitest run packages/<pkg> --coverage`                        |
| Coverage changed-пакетов в MR       | `pnpm test:coverage:mr --base=origin/master`                            |
| Gate один пакет                     | `pnpm exec tsx scripts/coverage-gate.mts <pkg>`                         |
| Gate с переопределением порогов     | `pnpm exec tsx scripts/coverage-gate.mts --min-lines=85 <pkg>`         |
| HTML-отчёт                          | `pnpm coverage:serve`                                                   |
| Merge raw → report                  | `pnpm coverage:merge`                                                   |
| Очистить                            | `pnpm coverage:clean`                                                   |

Полный пайплайн для пакета с unit-тестами:

```bash
pnpm test:coverage:pkg <pkg>                       # playwright + harvester → coverage/raw/{playwright,storybook}, merge
pnpm exec vitest run packages/<pkg> --coverage     # vitest → coverage/raw/vitest/
pnpm coverage:merge                                # пересобрать отчёт
pnpm exec tsx scripts/coverage-gate.mts <pkg>
```

Перед каждым прогоном **обязательно** обновить кэш storyId — иначе harvester не подхватит новые stories:

```bash
pnpm exec tsx scripts/coverage-prefetch-stories.mts
```

`coverage-pkg.mts` делает это автоматически.

## Воркеры и стабильность

`COVERAGE=true` + Istanbul instrumentation в **5×** замедляет компиляцию story в Vite. С `--workers=8` на одном Storybook-сервере получаешь массовые timeout'ы (`sb-preparing-story .sb-loader` не успевает уйти за 15s).

Дефолт `coverage-pkg.mts` — **workers=3** на локале, **`getWorkers()`** на CI. **Не** переопределяй на локали через `--workers=8` без warm-up'а Storybook.

Warm-up: один последовательный прогон harvester'а с `--workers=1` после рестарта Storybook компилит все story в Vite-кеш. Дальше можно гонять с `workers=8` по уже заполненному кешу.

## Чек-лист перед PR (для нового/изменённого пакета)

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

## Что запрещено

- Хардкодить `// istanbul ignore` без письменного обоснования в комментарии (одна строка-причина обязательна).
- Понижать пороги per-пакет в `coverage-gate.mts` ради зелёного MR — фикси тесты, не порог.
- Закрывать coverage-gap «мёртвыми» play-функциями (`expect(true).toBe(true)`) — harvester их зачтёт, реальные ветви не покроются. Code review такие play возвращает.
- Заводить fixture-стори ради числа в отчёте, если реальный consumer-пакет может покрыть ту же ветвь — fixture только для hook-only кода, не для UI-ветвей.

## Связанные правила

- [stories-standard.md](./stories-standard.md) — формат stories и play-функций (включая `tests/` и `examples/`).
- [e2e-testing-standard.md](./e2e-testing-standard.md) — что в play vs Playwright vs visual.
- [complexity-tiers.md](./complexity-tiers.md) — артефакты по tier'ам (stories/tests/visual).
- [dont-do-that.md](./dont-do-that.md) — `// istanbul ignore` под общий запрет на «отключение проверок».

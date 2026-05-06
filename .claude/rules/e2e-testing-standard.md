# E2E тестирование — стандарт

**Область действия:** `packages/*/__test__/**/*.spec.ts`. Правило действует всегда. Эталон — [`packages/button/__test__/`](../../packages/button/__test__).

## Принцип

E2E проверяет то, что **не покрыто** VisualMatrix screenshot-ом:

- Рендер ключевых stories без ошибок.
- Прокидку пропсов в DOM через `data-*` (на Playground + URL args — без отдельного spec-файла).
- Интеракции (click, keyboard, focus-trap, aria-state).

Всё визуальное — оси, размеры, цвета, per-view states — покрывает VisualMatrix story + её baseline. Отдельные spec'и на «ось размера» или «высоту в пикселях» не пишутся: они дублируют visual regression и хрупки.

## Общее

- Фреймворк: Playwright. Корневой конфиг — `playwright.config.ts` в корне монорепо. Проекты: `chrome`, `firefox`, `safari`, `mobile` (см. `#playwright-tooling/constants/projects`).
- Тесты живут **внутри пакета** в папке `__test__/<ComponentName>/`, baseline'ы visual-снэпшотов — в `__test__/<ComponentName>/__snapshots__/` рядом со спеком.
- Запуск из корня: `pnpm test:e2e` (все проекты), `pnpm test:e2e:chrome`, `pnpm test:e2e:ui`, `pnpm test:e2e:update-snapshots`.
- Общие фикстуры, утилиты, конфиг и константы — пакет `playwright/` в корне, доступный через TS-алиас **`#playwright-tooling/*`** (paths в `tsconfig.json`, `tsconfig: './tsconfig.json'` в `playwright.config.ts`). Импорт: `import { test, expect } from '#playwright-tooling/fixtures'`. Не используй относительные `'../../../../playwright/...'` — алиас обязательный.
- Хелпер навигации — fixture `gotoStory(storyId, args?)`: открывает `/iframe.html?id=<id>&viewMode=story&args=<k:v;...>` и ждёт `STORYBOOK_ROOT_SELECTOR`.

## Раскладка пакетных тестов

Тесты группируются **по компоненту** (зеркалит `stories/<ComponentName>/`). Каждая папка компонента — самодостаточная: свои spec'ы, свои `helpers.ts`, свой `__snapshots__/`.

```
packages/<pkg>/__test__/
├── <ComponentName>/
│   ├── helpers.ts                   # story ids, ключевые комбинации, data-* таблицы для этого компонента
│   ├── rendering.spec.ts            # render + states + props propagation через gotoStory(playground, args)
│   ├── interaction.spec.ts          # click / hover / focus-trap / mouse — для M+
│   ├── keyboard.spec.ts             # Tab / Enter / Space / Arrow / Home / End — для M+
│   ├── polymorphism.spec.ts         # только если есть `as` prop
│   ├── visual.spec.ts               # см. visual-regression-standard.md
│   └── __snapshots__/
│       └── *.png                    # baselines для visual.spec.ts
└── <OtherComponent>/                # если в пакете несколько публичных компонентов (tier L/XL)
    ├── helpers.ts
    ├── rendering.spec.ts
    └── __snapshots__/
```

Максимум 5 spec-файлов + `visual.spec.ts` на компонент. Имена файлов **без префикса компонента** — префикс несёт папка. То же для snapshot PNG: `visual-matrix.png`, не `button-visual-matrix.png`.

Удалены и **запрещены**: `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts`. Их роль:

- **url-args** → describe-блок внутри `rendering.spec.ts`. Параметрика идёт через `gotoStory(playground, args)`.
- **states** → describe-блок внутри `rendering.spec.ts`. Прогоняет `disabled`, `loading`, `empty` через те же URL args.
- **dimensions** → не отдельный spec. Figma-parity по размерам проверяется визуальной регрессией (VisualMatrix snapshot). Если действительно нужна программная проверка px (редко) — test внутри `rendering.spec.ts`, не отдельный файл.

**Root `helpers.ts`** на уровне `__test__/` не создаётся. Шарить констант между компонентами одного пакета — через `../<SharedDir>/` либо через их собственные `helpers.ts`.

## Обязательные блоки по tier'у

| Tier | rendering | interaction | keyboard | polymorphism | visual |
|------|-----------|-------------|----------|--------------|--------|
| XS   | ✅ render | —           | —        | —            | ✅ (VisualMatrix + responsive) |
| S    | ✅ render + states | — | —    | —            | ✅ (+ hover/focus) |
| M    | ✅ render + states + data-* | ✅ | ✅ | если `as` | ✅ (+ pressed) |
| L    | ✅ + ARIA-state | ✅ + focus-trap | ✅ + Arrow/Home/End | если `as` | ✅ (+ open/closed) |
| XL   | ✅ + scenario-render | ✅ per-scenario | ✅ | если `as` | ✅ (scenario before/after) |

Для XL вместо одного `rendering.spec.ts` допустимы отдельные scenario-spec'и (`<scenario>.spec.ts`) внутри папки компонента.

## rendering.spec.ts — структура

Три describe-блока в одном файле: `render`, `states`, `props propagation`.

```ts
// packages/button/__test__/Button/rendering.spec.ts
import { expect, test } from '#playwright-tooling/fixtures'
import { BUTTON_STORIES, BUTTON_KEY_COMBOS } from './helpers'

test.describe('Button — rendering', () => {
  test.describe('render', () => {
    for (const id of Object.values(BUTTON_STORIES)) {
      test(`story ${id} renders`, async ({ page, gotoStory }) => {
        await gotoStory(id)
        await expect(page.getByRole('button')).toBeVisible()
      })
    }
  })

  test.describe('states', () => {
    test('disabled', async ({ page, gotoStory }) => {
      await gotoStory(BUTTON_STORIES.playground, { disabled: true })
      await expect(page.getByRole('button')).toBeDisabled()
    })

    test('loading sets data-loading', async ({ page, gotoStory }) => {
      await gotoStory(BUTTON_STORIES.playground, { loading: true })
      await expect(page.getByRole('button')).toHaveAttribute('data-loading', 'true')
    })
  })

  test.describe('props propagation', () => {
    for (const { appearance, view, size } of BUTTON_KEY_COMBOS) {
      test(`${appearance} + ${view} + ${size}`, async ({ page, gotoStory }) => {
        await gotoStory(BUTTON_STORIES.playground, { appearance, view, size })
        const btn = page.getByRole('button')
        await expect(btn).toHaveAttribute('data-appearance', appearance)
        await expect(btn).toHaveAttribute('data-view', view)
        await expect(btn).toHaveAttribute('data-size', size)
      })
    }
  })
})
```

`BUTTON_KEY_COMBOS` — **ключевая выборка** (не декартово произведение всех осей). По 1 представителю на каждое значение каждой оси — этого достаточно, чтобы убедиться в прокидке.

## Импорты

```ts
// packages/<pkg>/__test__/<ComponentName>/<spec>.spec.ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common'
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects'
import { expect, test } from '#playwright-tooling/fixtures'
import { waitForFonts } from '#playwright-tooling/utils'

import { COMPONENT_STORIES } from './helpers'
```

Всё через алиас `#playwright-tooling/*` (paths в корневом `tsconfig.json`, `tsconfig` указан в `playwright.config.ts`). Не импортируй `@playwright/test` напрямую — потеряешь fixtures. Относительные `'../../../../playwright/...'` запрещены.

`helpers.ts` пакета также берёт типы и утилиты через алиас:

```ts
// packages/<pkg>/__test__/<ComponentName>/helpers.ts
import { StorybookUrlOptions } from '#playwright-tooling/utils'
import { TEST_IDS } from '../../src/constants'
```

`TEST_IDS` импортится **из исходников пакета** (`../../src/constants`), не из entry `@ds/<pkg>` — entry тянет CSS-модули и ломает playwright-compile.

## Паттерны

### Параметрика через `Playground` + URL args

**Обязательный** способ прогнать оси. Никаких отдельных stories «под каждую комбинацию».

```ts
await gotoStory(BUTTON_STORIES.playground, { appearance: 'critical', view: 'filled', size: 'l' })
```

### Запреты

- Не дублируй stories ради URL-args. Параметризуй через `gotoStory(id, args)`.
- Не используй фиксированные `page.waitForTimeout(N)` — используй `expect.poll` или `toBeVisible/toBeFocused` с auto-wait.
-Не создавай клик по disabled без `force: true` — Playwright справедливо выкинет ошибку.
- Не проверяй `aria-disabled` на `<button disabled>` — на нативной кнопке ARIA-атрибут не нужен, только на `as="a"`.
- Не держи тесты в корневом `tests/` — там живут только docs-тесты (`tests/docs/`).
- Не заводи `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — их роль отобрана `rendering.spec.ts` и `visual.spec.ts`.
- Не держи тесты/снапшоты плоско в корне `__test__/` — группируй по компоненту. Исключение — мини-пакеты с единственным одноимённым компонентом, где подпапка повторяет имя пакета (допускается, но рекомендуется всё равно явно завести `<ComponentName>/`).
- Не префиксуй spec-файлы и PNG именем компонента (`button.rendering.spec.ts`, `button-visual-matrix.png`) — префикс теперь в имени папки.

## Story IDs — формат

Storybook автогенерирует из `title` + экспорт:

- Пакет с одним компонентом: `title: 'Components/Avatar'` + `export const Playground` → id `components-avatar--playground`.
- Пакет с несколькими компонентами (nesting): `title: 'Components/Button/ButtonGroup'` + `export const Playground` → id `components-button-buttongroup--playground`.

Nesting `Components/<PackageDisplayName>/<ComponentName>` — обязательный для multi-component пакетов, см. [stories-standard.md](./stories-standard.md) раздел «Title — nesting по пакету». Story IDs в `__test__/<Component>/helpers.ts` обязаны соответствовать актуальным title'ам пакета.

Названия экспорта должны быть PascalCase без чисел и `Basic`/`Default` (см. [stories-standard.md](./stories-standard.md)).

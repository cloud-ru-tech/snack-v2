# Playwright — общий туллинг

Общие фикстуры, утилиты и конфигурационные константы для всех Playwright-тестов против Storybook.

## Структура

```
playwright/
├── constants/
│   ├── common.ts      # STORYBOOK_BASE_URL, TEST_ID_ATTRIBUTE, IS_CI
│   └── projects.ts    # PROJECTS (chrome/firefox/safari/mobile), VISUAL_BASELINE_PROJECT
├── utils/
│   ├── dataTestIdSelector.ts
│   ├── getStorybookUrl.ts
│   ├── waitForFonts.ts
│   └── index.ts
├── fixtures.ts        # test, expect — расширенный runner
├── index.ts           # barrel для путей вне пакетов
└── README.md
```

## Тесты пакета

Тесты живут **внутри пакета** в папке `__tests__/`, снэпшоты — в соседней `__snapshots__/`:

```
packages/<pkg>/
├── __tests__/
│   ├── helpers.ts                 # story IDs + props-конструкторы
│   ├── <pkg>.rendering.spec.ts
│   ├── <pkg>.states.spec.ts
│   ├── <pkg>.url-args.spec.ts
│   ├── <pkg>.dimensions.spec.ts
│   ├── <pkg>.interaction.spec.ts
│   ├── <pkg>.polymorphism.spec.ts
│   └── <pkg>.visual.spec.ts
└── __snapshots__/                 # visual baselines (chrome-only)
```

Эталон — [`packages/button/__tests__/`](../packages/button/__tests__).

## Fixture API

Импорт:

```ts
import { expect, test } from '#playwright/fixtures'
```

Доступные фикстуры:

### `gotoStory(storyId, args?)`

Открывает story по id (`components-<name>--<story>`), ждёт рендера `#storybook-root`. Args передаются query-параметром `args=key:value;...`.

```ts
await gotoStory('components-button--playground', {
  appearance: 'primary',
  view: 'filled',
  size: 'm',
})
```

### `getByTestId(testId)`

Локатор по `data-test-id`:

```ts
const btn = getByTestId('submit-button')
await expect(btn).toBeVisible()
```

### `waitForFonts()`

Блокирует до `document.fonts.ready`. Обязательно перед `toHaveScreenshot()`:

```ts
await gotoStory('components-button--primary')
await waitForFonts()
await expect(page.locator('#storybook-root')).toHaveScreenshot('button-primary.png', {
  animations: 'disabled',
  caret: 'hide',
})
```

## Matrix браузеров

`PROJECTS` описывает 4 проекта:
- `chrome` — 1200×871, визуальные baselines только здесь
- `firefox` — 1200×871
- `safari` — 1200×871
- `mobile` — Pixel 7

Визуальные спеки обязаны делать `test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, …)` — иначе вы попытаетесь сравнить рендеры разных движков.

## Снэпшоты

`snapshotPathTemplate` в корневом `playwright.config.ts`:

```
{testDir}/{testFileDir}/../__snapshots__/{arg}-{projectName}{ext}
```

То есть `packages/button/__tests__/button.visual.spec.ts` → `packages/button/__snapshots__/<arg>-chrome.png`.

## Запуск

Из корня репозитория:

```bash
pnpm test:e2e                     # все проекты
pnpm test:e2e:chrome              # только chrome
pnpm test:e2e:ui                  # UI-режим Playwright
pnpm test:e2e:update-snapshots    # регенерация visual baselines (chrome)
```

Перед запуском либо поднимите Storybook вручную (`pnpm dev:storybook`), либо положитесь на автоматический `webServer` из `playwright.config.ts` (`reuseExistingServer: true` в локале).

## Env

| Переменная        | По умолчанию               | Что делает                    |
| ----------------- | -------------------------- | ----------------------------- |
| `STORYBOOK_URL`   | `http://localhost:6006/`   | base URL Playwright           |
| `CI`              | —                          | активирует CI-поведение       |

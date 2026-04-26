# Visual regression — стандарт

**Область действия:** `packages/*/__tests__/*.visual.spec.ts` и их baseline'ы в `packages/*/__snapshots__/`. Правило действует всегда. Эталон — [`packages/button/__tests__/button.visual.spec.ts`](../../packages/button/__tests__/button.visual.spec.ts).

## Общее

- Фреймворк: Playwright `toHaveScreenshot`.
- Baselines снимаются **только на `chrome`** (см. `VISUAL_BASELINE_PROJECT` из `playwright/constants/projects.ts`). Визуальный spec обязан делать `test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, …)` в `beforeEach`, иначе firefox/safari/mobile попытаются сравнить несравнимое.
- Baseline-файлы лежат в `packages/<pkg>/__snapshots__/<arg>-<projectName>.png`. Путь диктует `snapshotPathTemplate` в корневом `playwright.config.ts`:
  ```
  {testDir}/{testFileDir}/../__snapshots__/{arg}-{projectName}{ext}
  ```
- Обновление: `pnpm test:e2e:update-snapshots` (работает только по `chrome`).

## Стабилизация снимков (обязательно)

```ts
await gotoStory(STORY.Primary)
await waitForFonts() // ← fixture из ../../../playwright/fixtures
await expect(page.locator('#storybook-root')).toHaveScreenshot('button-primary.png', {
  animations: 'disabled',
  caret: 'hide',
})
```

Плюс:

- `waitForFonts()` перед снимком — гарантирует, что web-шрифты загружены.
- Фиксированный viewport из `PROJECTS.chrome.viewport` (кроме responsive-блока, где меняем размер явно).
- Снимаем `#storybook-root`, а не viewport — иначе ловим шум от Storybook chrome.

## Наборы снимков по tier'у

### XS (минимум)

- Static: снимок каждой use-case стори (1 файл = 1 снимок).
- Responsive: Primary на 375/768/1440.

### S

Добавить к XS:

- Interaction: `hover` и `focus` на Primary.

### M (Button-like)

Добавить к S:

- Interaction: `pressed` на Primary (через `page.mouse.down()`).
- Per-view hover: по одному снимку для каждого ключевого `view` (filled/outline/tonal/function).

### L (Tabs/Tooltip/Popover)

Добавить к M:

- Open/closed state snapshots.
- Placement variations (top/bottom/left/right), если есть.

### XL (Table-like)

Вместо декартовой матрицы — сценарные снимки:

- До и после каждой ключевой интеракции (sort, filter, select, paginate).
- Empty / loading / error / loaded.

## Структура теста

```ts
import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects'
import { expect, test } from '../../../playwright/fixtures'

import { BUTTON_STORIES, BUTTON_STATIC_VISUAL_CASES } from './helpers'

test.describe('Button — visual regression', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    )
  })

  test.describe('static', () => {
    for (const { id, name } of BUTTON_STATIC_VISUAL_CASES) {
      test(`static — ${name}`, async ({ page, gotoStory, waitForFonts }) => {
        await gotoStory(id)
        await waitForFonts()
        await expect(page.locator('#storybook-root')).toHaveScreenshot(name, {
          animations: 'disabled',
          caret: 'hide',
        })
      })
    }
  })
})
```

## Pressed snapshot (осторожно)

```ts
test('<name> pressed', async ({ page, gotoStory, waitForFonts }) => {
  await gotoStory(STORY.Primary)
  await waitForFonts()
  const el = page.getByRole('button')
  const box = await el.boundingBox()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await page.mouse.down()
  try {
    await expect(page.locator('#storybook-root')).toHaveScreenshot('<name>-pressed.png', {
      animations: 'disabled',
      caret: 'hide',
    })
  } finally {
    await page.mouse.up()
  }
})
```

- Pressed нестабилен в firefox/safari — потому baselines идут только на chrome.
- Если baseline «прыгает» — отключай pressed-снимок конкретного компонента, а не весь блок.

## Пере-генерация baselines

1. Удали устаревшие PNG перед первой генерацией, если API изменилось:
   ```bash
   rm packages/<pkg>/__snapshots__/*.png
   ```
2. Убедись, что Storybook запущен (`pnpm dev:storybook`) или что `reuseExistingServer` в корневом `playwright.config.ts` подключит dev-сервер автоматически.
3. Запусти `pnpm test:e2e:update-snapshots`.
4. Сделай ручной review diff-а: открой PNG и проверь, что они осмысленные (не blank, не с артефактами от dev-инструментов).
5. Коммить PNG отдельным коммитом `test(visual): update <pkg> baselines`.

## Запреты

- Не комить снимки без `animations: 'disabled'` — они будут flaky из-за transition.
- Не использовай `page.screenshot()` без локатора — снимай `#storybook-root`, а не viewport, чтобы избежать шума от Storybook chrome.
- Не зависай от курсора мыши — Playwright размещает курсор детерминированно, но позиция после клика может задержаться. `caret: 'hide'` + `mouse.move(0,0)` перед снимком, если видишь «лишний» артефакт.
- Не снимай всю VisualMatrix на каждом breakpoint — матрица один раз, responsive — на Primary.
- Не храни baseline'ы в корневом `tests/` — они живут рядом с пакетом.

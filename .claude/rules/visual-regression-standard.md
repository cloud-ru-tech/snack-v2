# Visual regression — стандарт

**Область действия:** `packages/*/__test__/<Component>/visual.spec.ts` и их baseline'ы в `packages/*/__test__/<Component>/__snapshots__/`. Правило действует всегда. Эталон — [`packages/button/__test__/Button/visual.spec.ts`](../../packages/button/__test__/Button/visual.spec.ts).

## Принцип

VisualMatrix story — **основной** источник визуальной регрессии. Один её скриншот покрывает все оси × состояния (appearance × size × view × disabled/loading). Не заводить per-case snapshots для того, что уже строка/колонка в `StoryTable`.

Отдельные снимки нужны только для сценариев, которые нельзя отрендерить в матрице:

- клиентские состояния (`:hover`, `:focus-visible`, `:active`/pressed) — их не покажешь статикой;
- responsive breakpoints (375/768/1440) — изменяют layout, а не цвета;
- открытое/закрытое состояние модалок/поповеров;
- before/after интеракций в XL-компонентах (sort → new order).

Цель — минимум снимков при максимуме покрытия. Каждый снимок стоит времени запуска и flakiness.

## Общее

- Фреймворк: Playwright `toHaveScreenshot`.
- Baselines снимаются **только на `chrome`** (см. `VISUAL_BASELINE_PROJECT` из `#playwright-tooling/constants/projects`). Визуальный spec обязан делать `test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, …)` в `beforeEach`, иначе firefox/safari/mobile попытаются сравнить несравнимое.
- Baseline-файлы лежат **рядом** со спеком: `packages/<pkg>/__test__/<Component>/__snapshots__/<arg>-<projectName>.png`. Путь диктует `snapshotPathTemplate` в корневом `playwright.config.ts`:
  ```
  {testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}
  ```
  (Префикс `{testDir}/` обязателен — `{testFileDir}` у Playwright относительный.)
- Имя snapshot-файла (`{arg}`) — **без** префикса компонента: `visual-matrix.png`, а не `button-visual-matrix.png`. Префикс несёт папка.
- Обновление: `pnpm test:e2e:update-snapshots` (работает только по `chrome`).

## Стабилизация снимков (обязательно)

```ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common'

await gotoStory(STORY.VisualMatrix)
await waitForFonts() // ← fixture из #playwright-tooling/fixtures
await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS)
```

Плюс:

- `waitForFonts()` перед снимком — гарантирует, что web-шрифты загружены.
- Фиксированный viewport из `PROJECTS.chrome.viewport`.
- Снимаем `STORYBOOK_ROOT_SELECTOR` (`#storybook-root`), а не viewport — иначе ловим шум от Storybook chrome.
- `STORYBOOK_ROOT_SELECTOR` и `SCREENSHOT_DEFAULT_OPTS` — общие из `#playwright-tooling/constants/common`. **Не** заводи локальные `*_ROOT_SELECTOR` / `*_SCREENSHOT_OPTS` в пакетных `helpers.ts` или inline-литералы `'#storybook-root'` / `{ animations: 'disabled', caret: 'hide' }` в spec-файлах.

## Наборы снимков по tier'у (минимум)

| Tier | Snapshots | Счёт |
|------|-----------|------|
| XS   | VisualMatrix static | 1 |
| S    | + Playground hover + Playground focus | 1 + 2 = 3 |
| M    | + Playground pressed | 3 + 1 = 4 |
| L    | + 1–2 placement/open-closed сценария на ключевом субкомпоненте | 4 + (1–2) ≈ 5–6 |
| XL   | Сценарно: before/after каждой ключевой интеракции (sort, filter, paginate, select). VisualMatrix остаётся. | 1 + N*2 |

## Структура теста

```ts
// packages/button/__test__/Button/visual.spec.ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common'
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects'
import { expect, test } from '#playwright-tooling/fixtures'

import { BUTTON_STORIES } from './helpers'

test.describe('Button — visual regression', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    )
  })

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(BUTTON_STORIES.visualMatrix)
    await waitForFonts()
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS)
  })

  test.describe('interaction (Playground)', () => {
    test('hover', async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(BUTTON_STORIES.playground)
      await waitForFonts()
      await page.getByRole('button').hover()
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('interaction-hover.png', SCREENSHOT_DEFAULT_OPTS)
    })

    test('focus', async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(BUTTON_STORIES.playground)
      await waitForFonts()
      await page.keyboard.press('Tab')
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('interaction-focus.png', SCREENSHOT_DEFAULT_OPTS)
    })
  })
})
```

## Pressed snapshot (tier M, осторожно)

```ts
test('pressed', async ({ page, gotoStory, waitForFonts }) => {
  await gotoStory(BUTTON_STORIES.playground)
  await waitForFonts()
  const el = page.getByRole('button')
  const box = await el.boundingBox()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await page.mouse.down()
  try {
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('interaction-pressed.png', SCREENSHOT_DEFAULT_OPTS)
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
   rm packages/<pkg>/__test__/<Component>/__snapshots__/*.png
   ```
2. Убедись, что Storybook запущен (`pnpm dev:storybook`) или что `reuseExistingServer` в корневом `playwright.config.ts` подключит dev-сервер автоматически.
3. Запусти `pnpm test:e2e:update-snapshots`.
4. Сделай ручной review diff-а: открой PNG и проверь, что они осмысленные (не blank, не с артефактами от dev-инструментов).
5. Коммить PNG отдельным коммитом `test(visual): update <pkg> baselines`.

## Запреты

- Не комить снимки без `SCREENSHOT_DEFAULT_OPTS` (там `animations: 'disabled'`) — они будут flaky из-за transition.
- Не используй `page.screenshot()` без локатора — снимай `STORYBOOK_ROOT_SELECTOR`, а не viewport.
- Не дублируй `STORYBOOK_ROOT_SELECTOR` / `SCREENSHOT_DEFAULT_OPTS` локально (`*_ROOT_SELECTOR`, `*_SCREENSHOT_OPTS` в `helpers.ts`, inline-`{ animations: 'disabled', caret: 'hide' }` в spec'е). Импорт из `#playwright-tooling/constants/common`.
- Не снимай static per-use-case — они уже в VisualMatrix.
- Не снимай per-view hover — одного Playground hover достаточно.
- Не снимай всю VisualMatrix на каждом breakpoint.
- Не заводи responsive-блок (375/768/1440) на атомарных компонентах — это мёртвый тест, VisualMatrix не меняется от viewport'а. Если компонент реально адаптивный, заведи story с явным `platform`/`size` пропом, она попадёт в VisualMatrix.
- Не заводи отдельный `<pkg>.dimensions.spec.ts` ради проверки высот — Figma-parity ловится diff-ом VisualMatrix.
- Не храни baseline'ы в корневом `tests/` — они живут рядом со спеком, в `packages/<pkg>/__test__/<Component>/__snapshots__/`.
- Не префиксуй snapshot-имена названием пакета/компонента (`button-hover.png`) — префикс уже в пути папки.

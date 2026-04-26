# Skill: component-visual-regression

**Триггеры:** «visual тесты», «скриншотные тесты», «обновить baselines», «screenshot-тесты».

Скилл генерирует `packages/<pkg>/__tests__/<pkg>.visual.spec.ts` и baseline'ы в `packages/<pkg>/__snapshots__/`. Эталон — `packages/button/__tests__/button.visual.spec.ts`.

## Ввод

- Путь к пакету и tier.
- Список story-ID.

## Шаги

1. **Определить набор снимков по tier'у:**
   - XS: static per use-case + responsive (Primary 375/768/1440).
   - S: + hover/focus на Primary.
   - M: + pressed + hover per view.
   - L: + open/closed + placements.
   - XL: scenario-driven before/after снимки.

2. **Добавить в `__tests__/helpers.ts`** список `*_STATIC_VISUAL_CASES` — `{ id, name }` на каждую стори.

3. **Создать `packages/<pkg>/__tests__/<pkg>.visual.spec.ts`** по шаблону:

   ```ts
   import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects'
   import { expect, test } from '../../../playwright/fixtures'

   import {
     PKG_STATIC_VISUAL_CASES,
     PKG_SCREENSHOT_OPTS,
     PKG_ROOT_SELECTOR,
     PKG_STORIES,
   } from './helpers'

   test.describe('<Name> — visual regression', () => {
     test.beforeEach(({}, testInfo) => {
       test.skip(
         testInfo.project.name !== VISUAL_BASELINE_PROJECT,
         `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
       )
     })

     test.describe('static', () => {
       for (const { id, name } of PKG_STATIC_VISUAL_CASES) {
         test(`static — ${name}`, async ({ page, gotoStory, waitForFonts }) => {
           await gotoStory(id)
           await waitForFonts()
           await expect(page.locator(PKG_ROOT_SELECTOR)).toHaveScreenshot(name, PKG_SCREENSHOT_OPTS)
         })
       }
     })
   })
   ```

4. **Удалить старые baselines** (если переписываешь существующий):
   ```bash
   rm packages/<pkg>/__snapshots__/*.png
   ```

5. **Сгенерировать baselines** (из корня монорепо):
   ```bash
   pnpm test:e2e:update-snapshots
   ```
   Скрипт внутри — `playwright test --project=chrome --update-snapshots`. Другие проекты не трогают baseline'ы, потому что visual spec пропускает их через `test.skip`.

6. **Ручной review** — открыть PNG-файлы глазами. Не `approved` скопом — убедись, что ничего не blank и не с артефактом.

7. **Commit**:
   ```bash
   git add packages/<pkg>/__tests__/<pkg>.visual.spec.ts packages/<pkg>/__snapshots__/
   git commit -m "test(visual): baselines for <pkg>"
   ```

## Interaction снимки — особенности

- **Hover**: `await page.getByRole('...').hover()` перед снимком.
- **Focus**: `await page.keyboard.press('Tab')` — потом снимок.
- **Pressed**: `mouse.move(cx, cy) + mouse.down()`, после снимка **обязательно** `mouse.up()` (в `finally`).

Pressed нестабилен в cross-browser. Visual baseline — только `chrome` (см. `VISUAL_BASELINE_PROJECT` в `playwright/constants/projects.ts`).

## Что **не** делает

- Не пишет E2E — это [component-e2e-tests](./component-e2e-tests.md).
- Не обновляет baselines без явного указания — разрушительная операция.

## Связанное

- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)

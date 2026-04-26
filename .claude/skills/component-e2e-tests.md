# Skill: component-e2e-tests

**Триггеры:** «написать e2e», «playwright тесты», «проверить взаимодействие».

Скилл генерирует набор `packages/<pkg>/__tests__/*.spec.ts` по шаблону из [e2e-testing-standard.md](../rules/e2e-testing-standard.md), разбитый по tier-блокам (по spec'у на блок). Эталон — `packages/button/__tests__/`.

## Ввод

- Путь к пакету и tier.
- Список story-ID компонента (см. [stories-standard.md](../rules/stories-standard.md)).

## Шаги

1. **Определить набор блоков по tier'у:**
   - XS: `rendering`.
   - S: + `url-args`, `states`.
   - M: + `dimensions`, `interaction`, `keyboard`, `polymorphism` (если есть `as`).
   - L: + `keyboard-navigation`, `focus-trap`, `aria-roles` (вместо простого `keyboard`).
   - XL: + `scenarios` (несколько spec'ов) + MSW fixture.

2. **Создать `packages/<pkg>/__tests__/helpers.ts`** — вытянуть story ids, ключевые комбинации, Figma-высоты, список a11y-стор и static-visual кейсов в переиспользуемые константы.

3. **Создать по одному spec'у на tier-блок:**

   ```ts
   // packages/<pkg>/__tests__/<pkg>.rendering.spec.ts
   import { expect, test } from '../../../playwright/fixtures'

   import { PKG_STORIES } from './helpers'

   test.describe('<Name> — rendering', () => { ... })
   ```

   Доступные фикстуры: `page`, `gotoStory`, `getByTestId`, `waitForFonts`.

4. **Для каждой оси** (из `constants.ts`) — assertion на `data-<axis>`:

   ```ts
   await gotoStory(PKG_STORIES.playground, { appearance, view, size })
   await expect(page.getByRole('button')).toHaveAttribute('data-appearance', appearance)
   ```

5. **Для Figma-parity размеров** — `boundingBox()` ± 1px (см. пример в [e2e-testing-standard.md](../rules/e2e-testing-standard.md)).

6. **Запуск** (из корня монорепо):
   ```bash
   pnpm test:e2e                      # все проекты
   pnpm test:e2e:chrome               # только chrome
   pnpm test:e2e:ui                   # UI-режим
   ```

## Что **не** делает

- Не пишет visual regression — это [component-visual-regression](./component-visual-regression.md).
- Не трогает stories — предполагает, что story-ID уже существуют.
- Не трогает docs-тесты в `tests/docs/` — они живут отдельно.

## Связанное

- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [component-story-set.md](./component-story-set.md)

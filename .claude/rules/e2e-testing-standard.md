# E2E тестирование — стандарт

**Область действия:** `packages/*/__tests__/**/*.spec.ts`. Правило действует всегда. Эталон — [`packages/button/__tests__/`](../../packages/button/__tests__).

## Общее

- Фреймворк: Playwright. Корневой конфиг — `playwright.config.ts` в корне монорепо. Проекты: `chrome`, `firefox`, `safari`, `mobile` (см. `playwright/constants/projects.ts`).
- Тесты живут **внутри пакета** в папке `__tests__/`, baseline'ы visual-снэпшотов — в соседней `__snapshots__/`.
- Запуск из корня: `pnpm test:e2e` (все проекты), `pnpm test:e2e:chrome`, `pnpm test:e2e:ui`, `pnpm test:e2e:update-snapshots`.
- Общие фикстуры, утилиты и конфиг — `playwright/` в корне (`import { test, expect } from '../../../playwright/fixtures'`).
- Хелпер навигации — fixture `gotoStory(storyId, args?)`: открывает `/iframe.html?id=<id>&viewMode=story&args=<k:v;...>` и ждёт `#storybook-root`.

## Раскладка пакетных тестов

```
packages/<pkg>/
├── __tests__/
│   ├── helpers.ts                      # story ids, матрицы, типы — переиспользуются между spec'ами
│   ├── <pkg>.rendering.spec.ts
│   ├── <pkg>.states.spec.ts
│   ├── <pkg>.url-args.spec.ts
│   ├── <pkg>.dimensions.spec.ts
│   ├── <pkg>.interaction.spec.ts
│   ├── <pkg>.polymorphism.spec.ts      # если есть `as`
│   ├── <pkg>.keyboard.spec.ts
│   └── <pkg>.visual.spec.ts            # см. visual-regression-standard.md
└── __snapshots__/                       # chrome-only baselines
```

Каждый spec — один tier-блок `test.describe`. Файлов много маленьких вместо одного большого — легко находить, легко запускать точечно.

## Обязательные блоки `test.describe`

По tier'ам (см. [complexity-tiers.md](./complexity-tiers.md)):

### XS (минимум)

1. **Rendering** — каждая ключевая story рендерит видимый элемент.
2. **Accessibility** — `AxeBuilder` по всем ключевым стор, `violations == []`.

### S

Добавить к XS:

3. **URL args (parametric)** — через `Playground` + `args` (query-string), проверка основных комбинаций.
4. **States** — `disabled`, `loading` (если есть), `empty` — проверка `aria-*` и визуального признака.

### M (Button и похожие)

Добавить к S:

5. **Dimensions** — высота/ширина совпадают с Figma-метаданными (`boundingBox()` ± 1px).
6. **Interaction** — click → onClick, disabled → click не файрит, hover не крашит.
7. **Keyboard** — Tab → focus-visible, Enter/Space → активация (на ClickTest/KeyboardTest).
8. **Polymorphism** — если есть `as`: `as="a"` + target → rel=noopener; disabled → aria-disabled.
9. **Icon & counter / slots** — проверка `data-variant`, `data-counter` через URL args.

### L

Добавить к M:

10. **Keyboard navigation** — Arrow/Home/End внутри составного компонента (табы, popover).
11. **Focus trap** — если компонент модальный — focus не выходит за контейнер.
12. **ARIA roles** — `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.

### XL

Добавить к L:

13. **Scenario tests** — отдельный spec на каждый use-case (`Sort`, `Filter`, `Paginate`, `Select multiple`).
14. **Network / MSW** — если компонент загружает данные, мокать через MSW в fixture'ах.

## Импорты

```ts
import { expect, test } from '../../../playwright/fixtures'

import { BUTTON_STORIES } from './helpers'
```

Всё берётся из общего `playwright/`. Не импортируй `@playwright/test` напрямую — потеряешь fixtures.

## Паттерны

### Параметрика через `Playground` + URL args

**Предпочтительно** вместо дублирования stories:

```ts
for (const { appearance, view, size } of BUTTON_KEY_COMBOS) {
  test(`${appearance} + ${view} + ${size}`, async ({ page, gotoStory }) => {
    await gotoStory(BUTTON_STORIES.playground, { appearance, view, size })
    await expect(page.getByRole('button')).toHaveAttribute('data-appearance', appearance)
  })
}
```

### Размеры (Figma parity)

```ts
for (const size of BUTTON_SIZES) {
  const expected = BUTTON_HEIGHT_PX[size]
  test(`size=${size} height`, async ({ page, gotoStory }) => {
    await gotoStory(BUTTON_STORIES.playground, { size })
    const box = await page.getByRole('button').boundingBox()
    expect(Math.round(box!.height)).toBeCloseTo(expected, 0)
  })
}
```


## Запреты

- Не дублируй stories ради URL-args. Параметризуй через `gotoStory(id, args)`.
- Не используй фиксированные `page.waitForTimeout(N)` — используй `expect.poll` или `toBeVisible/toBeFocused` с auto-wait.
- Не клик по disabled без `force: true` — Playwright справедливо выкинет ошибку.
- Не проверяй `aria-disabled` на `<button disabled>` — на нативной кнопке ARIA-атрибут не нужен, только на `as="a"`.
- Не держи тесты в корневом `tests/` — там живут только docs-тесты (`tests/docs/`).

## Story IDs — формат

Storybook автогенерирует из `title` + экспорт:

- `title: 'Components/Button'` + `export const Primary` → id `components-button--primary`.
- Для субкомпонентов в L: `title: 'Components/Tabs/TabBar'` → `components-tabs-tabbar--<story>`.

Названия экспорта должны быть PascalCase без чисел и `Basic`/`Default` (см. [stories-standard.md](./stories-standard.md)).

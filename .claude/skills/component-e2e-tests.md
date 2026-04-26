# Skill: component-e2e-tests

**Триггеры:** «написать e2e», «playwright тесты», «проверить взаимодействие».

Скилл генерирует набор `packages/<pkg>/__test__/<ComponentName>/*.spec.ts` по шаблону из [e2e-testing-standard.md](../rules/e2e-testing-standard.md). Тесты группируются **по компоненту** — подпапка с именем компонента (зеркалит `stories/<ComponentName>/`). Baseline'ы лежат рядом со спеком в `<ComponentName>/__snapshots__/`. Эталон — `packages/button/__test__/Button/`.

## Границы скилла

- E2E проверяет то, что **не покрыто** VisualMatrix screenshot-ом: рендер, прокидку `data-*`, интеракции, клавиатуру, ARIA, a11y.
- Отдельные spec'и `<pkg>.url-args.spec.ts`, `<pkg>.states.spec.ts`, `<pkg>.dimensions.spec.ts` **не создаются** — их роль отдана describe-блокам внутри `rendering.spec.ts` и visual regression.
- Visual snapshots делает [component-story-set](./component-story-set.md) (финальный шаг), не этот скилл.

## Вход

- Путь к пакету `packages/<pkg>` и tier.
- Список story-ID (`BUTTON_STORIES = { playground, visualMatrix, ... }`).

## Шаги

1. **Определить набор spec-файлов по tier'у** (max 5 + visual):

   | Tier | rendering | interaction | keyboard | polymorphism | a11y |
   |------|-----------|-------------|----------|--------------|------|
   | XS   | ✅        | —           | —        | —            | ✅   |
   | S    | ✅ (+ states) | —      | —        | —            | ✅   |
   | M    | ✅ (+ states + props propagation) | ✅ | ✅ | если `as` | ✅ |
   | L    | ✅ (+ ARIA-state) | ✅ (+ focus-trap) | ✅ (+ Arrow/Home/End) | если `as` | ✅ |
   | XL   | ✅ или scenario-spec'и | ✅ per-scenario | ✅ | если `as` | ✅ |

2. **Создать `packages/<pkg>/__test__/<ComponentName>/helpers.ts`** — вытянуть story ids, ключевые комбинации пропсов, список a11y-стор в переиспользуемые константы. `<COMPONENT>_KEY_COMBOS` — **ключевая выборка** по 1 представителю на каждое значение каждой оси, не декартово произведение. Каждый компонент пакета имеет свои `helpers.ts` в своей папке.

3. **Создать `rendering.spec.ts`** (без префикса имени пакета — префикс в папке) с 3 describe-блоками:

   ```ts
   // packages/<pkg>/__test__/<ComponentName>/rendering.spec.ts
   import { expect, test } from '../../../../playwright/fixtures'
   import { PKG_STORIES, PKG_KEY_COMBOS } from './helpers'

   test.describe('<Name> — rendering', () => {
     test.describe('render', () => {
       // смоук: ключевые stories рендерят видимый элемент
     })

     test.describe('states', () => {
       // disabled, loading, empty через gotoStory(playground, { disabled: true })
     })

     test.describe('props propagation', () => {
       // parametric loop по PKG_KEY_COMBOS
       // gotoStory(playground, args) → toHaveAttribute('data-<axis>', value)
     })
   })
   ```

4. **Создать `interaction.spec.ts`** (tier M+) — click / hover / focus-trap. Для L — ещё focus-trap внутри modal/popover.

5. **Создать `keyboard.spec.ts`** (tier M+) — Tab / Enter / Space. Для L — ещё Arrow / Home / End для компонентов с keyboard nav.

6. **Создать `polymorphism.spec.ts`** **только** если в API есть `as` prop. Проверяет:
   - `as='a'` + `href` → `<a>` c корректным `rel="noopener"` для `target="_blank"`.
   - `as='a'` + `disabled` → `aria-disabled="true"` (нативный `disabled` на `<a>` не работает).

7. **Создать `a11y.spec.ts`** — `AxeBuilder` по 3–5 ключевым stories (Playground, VisualMatrix, disabled state).

8. **Запуск** (из корня монорепо):
   ```bash
   pnpm test:e2e              # все проекты
   pnpm test:e2e:chrome       # только chrome
   pnpm test:e2e:ui           # UI-режим
   ```

## Паттерны

### Параметрика через `gotoStory(playground, args)`

```ts
for (const { appearance, view, size } of PKG_KEY_COMBOS) {
  test(`${appearance} + ${view} + ${size}`, async ({ page, gotoStory }) => {
    await gotoStory(PKG_STORIES.playground, { appearance, view, size })
    const btn = page.getByRole('button')
    await expect(btn).toHaveAttribute('data-appearance', appearance)
    await expect(btn).toHaveAttribute('data-view', view)
    await expect(btn).toHaveAttribute('data-size', size)
  })
}
```

### Состояния

```ts
test('loading', async ({ page, gotoStory }) => {
  await gotoStory(PKG_STORIES.playground, { loading: true })
  await expect(page.getByRole('button')).toHaveAttribute('data-loading', 'true')
})
```

## Запреты

- Не заводи `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — запрещено правилом.
- Не префиксуй spec/PNG именем пакета/компонента (`button.rendering.spec.ts`, `button-visual-matrix.png`) — префикс теперь в имени папки.
- Не держи тесты плоско в корне `__test__/` — группируй по `<ComponentName>/`.
- Не пиши `boundingBox` ± 1px против фиксированных Figma-высот отдельным тестом. Высота ловится diff-ом VisualMatrix baseline.
- Не дублируй stories ради URL-args — параметризуй через `gotoStory(id, args)`.
- Не используй фиксированные `page.waitForTimeout(N)` — `expect.poll` или auto-wait.
- Не клик по disabled без `force: true`.

## Что **не** делает

- Не пишет visual regression — это финальный шаг [component-story-set](./component-story-set.md) (`pnpm test:e2e:update-snapshots`).
- Не трогает stories — предполагает, что story-ID уже существуют.
- Не трогает docs-тесты в `tests/docs/` — они живут отдельно.

## Связанное

- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [component-story-set.md](./component-story-set.md)

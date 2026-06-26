# Skill: component-e2e-tests

**Триггеры:** «написать e2e», «playwright тесты», «проверить взаимодействие».

Скилл генерирует набор `packages/<pkg>/__test__/<ParentComponent>/*.spec.ts` по шаблону из [e2e-testing-standard.md](../rules/e2e-testing-standard.md). Тесты группируются **по parent-компоненту** — одна папка на parent; сабкомпоненты варианта parent'а параметризуются через args в той же папке (см. e2e §«Папка тестов пакета»). Baseline'ы лежат рядом со спеком в `<ParentComponent>/__snapshots__/`. Эталон — `packages/button/__test__/Button/`.

## Границы скилла

Тесты живут в трёх слоях. Скилл генерирует **только** Playwright-уровень. Behavioral assertion'ы (click/keyboard/focus/callback) — в Storybook play через [component-story-set](./component-story-set.md).

| Слой | Что покрывает | Где |
|------|---------------|-----|
| Storybook play | click, keyboard, focus, callback assertions, ARIA-state-after-action | `stories/<Name>/tests/<Name>.InteractionTest.stories.tsx::play` — валидируется через `pnpm test:stories` |
| Playwright `rendering.spec.ts` | smoke render + props propagation в `data-*` для ключевых значений осей | этот скилл |
| Playwright `interaction.spec.ts` / `keyboard.spec.ts` / `polymorphism.spec.ts` | **только** browser-specific сценарии из закрытых списков (см. e2e §§ «interaction.spec.ts», «keyboard.spec.ts») | этот скилл, **если** есть подходящий пункт списка |

Что **не делается** через E2E:

- Отдельные spec'и `<pkg>.url-args.spec.ts`, `<pkg>.states.spec.ts`, `<pkg>.dimensions.spec.ts` — их роль отдана `rendering.spec.ts` (props propagation параметризованным тестом) и visual regression.
- Дубль play-функций в Playwright. Если поведение уже в `InteractionTest::play` — в `interaction.spec.ts` это **не** дублируется.
- Axis-per-test loop в rendering (`for (const v of Object.values(ENUM))`) — заменяется параметризацией по ключевой выборке `KEY_COMBOS`.

Visual snapshots делает [component-story-set](./component-story-set.md) (финальный шаг), не этот скилл.

## Вход

- Путь к пакету `packages/<pkg>` и tier.
- Список story-ID (`BUTTON_STORIES = { playground, visualMatrix, ... }`).

## Шаги

1. **Определить набор spec-файлов**:

   - `rendering.spec.ts` — **всегда**. Ориентир по числу тестов — таблица из e2e §«rendering.spec.ts — ориентир по tier'у».
   - `interaction.spec.ts` — **только если** есть сценарий из закрытого списка browser-specific (e2e §«interaction.spec.ts»: file upload, real DnD, viewport/orientation resize, body scroll lock, click outside portal, focus-trap внутри портала, theme switching, multi-frame, `rel=noopener` инжекция, native disabled vs `aria-disabled`).
   - `keyboard.spec.ts` — **только если** применим пункт из закрытого списка kbd-сценариев (e2e §«keyboard.spec.ts»: roving tabindex / Arrow / Home / End nav, focus-trap внутри портала, Escape closes layered portals, multi-step focus management).
   - `polymorphism.spec.ts` — **только если** в API есть `as` prop.

   Если ни один пункт списка не применим — соответствующий spec-файл не заводится, независимо от tier'а.

2. **Создать `packages/<pkg>/__test__/<ParentComponent>/helpers.ts`** — одна папка на parent-компонент. Сабкомпоненты, являющиеся вариантом parent'а, тестируются параметризацией args в той же папке. Отдельная папка автономного компонента — только если он импортируется самостоятельно и имеет собственный публичный API (см. e2e §«Папка тестов пакета», критерий из 2 условий).

   В `helpers.ts`:
   - `<COMPONENT>_STORIES = { playground, visualMatrix, [scenario] }` — StoryRef-объекты `{ name, story, group? }`, не хардкод-строки id.
   - `<COMPONENT>_KEY_COMBOS` — **ключевая выборка** по 1 представителю на каждое значение каждой оси, не декартово произведение.
   - `buildStoryOptions(props?, ref?)` — единая точка построения URL для `gotoStory`.

3. **Создать `rendering.spec.ts`** (без префикса имени пакета — префикс в папке) с describe-блоками `render`, `states` (если применимо), `props propagation`:

   ```ts
   // packages/<pkg>/__test__/<ParentComponent>/rendering.spec.ts
   import { expect, test } from '#playwright-tooling/fixtures'
   import { PKG_STORIES, PKG_KEY_COMBOS, PKG_TEST_ID, buildStoryOptions } from './helpers'

   test.describe('<Name> — rendering', () => {
     test.describe('render', () => {
       // смоук: ключевые stories рендерят видимый getByTestId(ROOT)
     })

     test.describe('states', () => {
       // disabled, loading, empty через gotoStory(buildStoryOptions({ disabled: true }))
     })

     test.describe('props propagation', () => {
       // параметризация по PKG_KEY_COMBOS (не axis-per-test loop)
       // gotoStory(buildStoryOptions(args)) → toHaveAttribute('data-<axis>', value)
     })
   })
   ```

4. **Создать `interaction.spec.ts`** — один тест на каждый применимый пункт из закрытого списка browser-specific сценариев. Не дублируй click/keyboard, которые уже в Storybook play.

5. **Создать `keyboard.spec.ts`** — один тест на каждый применимый пункт из закрытого списка kbd-сценариев. Tab/Enter/Space на одном focusable — это play, а не keyboard.spec.

6. **Создать `polymorphism.spec.ts`** **только** если в API есть `as` prop. Проверяет runtime-атрибуты, которые ставит браузер: `href`, `target`, `rel=noopener noreferrer` (инжектится при `target=_blank`), `aria-disabled` на anchor'е (нативный `disabled` на `<a>` не работает).

7. **Запуск** (из корня монорепо — селективные варианты в [fast-build-commands.md](../rules/fast-build-commands.md)):
   ```bash
   pnpm test:e2e:chrome packages/<pkg>                                       # только chrome, только нужный пакет — дефолт во время разработки
   pnpm test:e2e:chrome packages/<pkg>/__test__/<Component>/rendering.spec.ts # один spec
   pnpm test:e2e:chrome -g "props propagation"                               # по grep
   pnpm test:e2e:ui                                                           # UI-режим для отладки
   pnpm test:e2e                                                              # все проекты — только финальная сверка перед PR
   ```

## Паттерны

### Параметрика через `gotoStory(buildStoryOptions(args))`

```ts
for (const { appearance, view, size } of PKG_KEY_COMBOS) {
  test(`${appearance} + ${view} + ${size}`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ appearance, view, size }))
    const root = getByTestId(PKG_TEST_ID)
    await expect(root).toHaveAttribute('data-appearance', appearance)
    await expect(root).toHaveAttribute('data-view', view)
    await expect(root).toHaveAttribute('data-size', size)
  })
}
```

### Состояния

```ts
test('loading', async ({ gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions({ loading: true }))
  await expect(getByTestId(PKG_TEST_ID)).toHaveAttribute('data-loading', 'true')
})
```

Локаторы — только `getByTestId`. `getByRole` / `getByText` / `getByLabelText` запрещены (привязаны к локализации/DOM, перестают работать при первых же изменениях). Исключение — когда test-id физически не может существовать; в play объясни комментарием.

## Запреты

- Не заводи `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — запрещено правилом.
- Не префиксуй spec/PNG именем пакета/компонента (`button.rendering.spec.ts`, `button-visual-matrix.png`) — префикс теперь в имени папки.
- Не держи тесты плоско в корне `__test__/` — группируй по parent-компоненту.
- Не пиши `boundingBox` ± 1px против фиксированных Figma-высот отдельным тестом. Высота проверяется визуальной разницей VisualMatrix baseline.
- Не дублируй stories ради URL-args — параметризуй через `gotoStory(buildStoryOptions(args))`.
- Не дублируй behavioral assertion'ы (click/keyboard/focus/callback) из Storybook play в `interaction.spec.ts`/`keyboard.spec.ts` — это разные слои, дубль избыточен.
- Не используй axis-per-test loop `for (const v of Object.values(ENUM)) test(...)` — параметризуй ключевую выборку.
- Не используй `getByRole` / `getByText` / `getByLabelText` — только `getByTestId`.
- Не используй фиксированные `page.waitForTimeout(N)` — `expect.poll` или auto-wait.
- Не создавай клик по disabled без `force: true`.
- Не используй id-строковую сигнатуру `gotoStory('components-...--story', args)` — только `gotoStory(buildStoryOptions(args?, storyRef?))`.

## Что **не** делает

- Не пишет visual regression — это финальный шаг [component-story-set](./component-story-set.md) (`pnpm test:e2e:update-snapshots`).
- Не трогает stories — предполагает, что story-ID уже существуют.
- Не трогает docs-тесты в `tests/docs/` — они живут отдельно.

## Подводные камни

Чаще всего бьют при написании specs (детали — [test-environment-pitfalls.md](../rules/test-environment-pitfalls.md), always-on):

- кросс-пакетный импорт в spec тянет CSS-модули → дублируй константу локально / из leaf-файла
- `getAnimations`/`playState` зависает на rc-drawer → жди `waitForStableBbox`
- не дублируй play-ассерты в Playwright (в spec — только browser-specific) — [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- visual baseline только chrome (`test.skip` по `VISUAL_BASELINE_PROJECT`) — [visual-regression-standard.md](../rules/visual-regression-standard.md)
- `gotoStory` — только options-форма через `buildStoryOptions`, без хардкод story-id

## Связанное

- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [component-story-set.md](./component-story-set.md)

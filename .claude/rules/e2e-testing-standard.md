# E2E тесты — стандарт

**Область действия:** `packages/*/__test__/**/*.spec.ts`. Эталон — [`packages/button/__test__/Button/`](../../packages/button/__test__/Button).

## Принцип

Тесты живут в трёх слоях. Каждый слой решает свою задачу и **не дублирует** другие. Любой `test(...)` обязан проходить «Критерий обоснованности артефакта» из [complexity-tiers.md](./complexity-tiers.md) (3 условия). Несоответствие хотя бы одному → тест не заводится.

## Разделение слоёв

| Слой | Что проверяет | Где живёт | Что НЕ делает |
|------|---------------|-----------|----------------|
| **Storybook play** (`stories/<Name>/tests/*.stories.tsx`) | Behavioral: click, keyboard, focus, controlled-state, callback assertions, ARIA-state-after-action | `play: async ({ args, canvasElement, step }) => …` | Не делает screenshot, не запрашивает viewport-resize, не тестирует drag&drop с real DataTransfer |
| **Storybook Test Runner** (`pnpm test:stories`) | Что все play-функции выполняются без exception/assertion-fail | CI-команда, уже подключена в `apps/storybook/package.json` и входит в `pnpm test` | Это просто запуск play-функций в headless Chrome через Playwright. Ничего нового не пишется. |
| **Playwright `rendering.spec.ts`** | Smoke-render + props propagation в `data-*` для **ключевых** значений осей (не всех) | `gotoStory(buildStoryOptions({ axis: keyValue }))` + `toHaveAttribute('data-axis', value)` | Не итерирует все enum-values (это работа VisualMatrix-скриншота) |
| **Playwright `interaction.spec.ts`** | **Только то, что Storybook play не может**: real DnD с `DataTransfer`, file upload через `<input type="file">`, viewport resize, scroll containment / body scroll lock, theme switching внутри портала, multi-frame, browser-specific quirks | Узкие специфические тесты | Не дублирует click/keyboard, которые уже в play |
| **Playwright `keyboard.spec.ts`** | Только сложная keyboard navigation: focus-trap внутри портала, Arrow / Home / End nav через несколько элементов с roving tabindex, Escape closes layered portals | Минимум | Не повторяет «Enter triggers click on focused button» — это в play |
| **Playwright `polymorphism.spec.ts`** | Runtime-behavior `as` prop: установка `href` / `target` / `rel` / других intrinsic-атрибутов из spread'а props | Только packages с `as` | Не дублирует визуальный рендер `as='a'` (он в VM) |
| **Playwright `visual.spec.ts`** | Скриншот `VisualMatrix` story + по 1 снимку на интерактивное состояние, которое статикой не показать (`:hover`, `:focus-visible`, `:active`/pressed, open для портала) | См. [visual-regression-standard.md](./visual-regression-standard.md) | Не делает per-axis скриншоты типа `hover-filled.png` × 5 |

### CI gate для play-функций

`pnpm test:stories` запускает все play-функции через `@storybook/test-runner`. Это **обязательный CI-шаг** (часть `pnpm test`). Если в `tests/<Name>.InteractionTest.stories.tsx::play` падает assertion — pipeline красный. Это значит:

- Не нужно дублировать behavioral checks в Playwright — они уже бегут в test-runner'е.
- Перед миграцией пакета **обязательно** локально прогнать `pnpm test:stories` и убедиться, что fail-репорт читаем и play-функция реально валидирует поведение.

## Принцип минимальной достаточности

Алгоритм решения «нужен ли новый Playwright тест»:

1. Это **behavioral assertion** (click → onChange, Tab → focus, Enter → submit)? → не в Playwright, **в `tests/<Component>.InteractionTest.stories.tsx::play`**.
2. Это **визуальный** axis-sweep (size/appearance/view)? → не отдельный test, **строка/колонка в `VisualMatrix` StoryTable**. Один скриншот.
3. Это props propagation `data-*` для одной оси? → **один параметризованный test** в `rendering.spec.ts` с 1–3 ключевыми значениями, не циклом по всем enum-values.
4. Это поведение, требующее **real browser API** (file upload, viewport resize, DataTransfer, scroll lock)? → **`interaction.spec.ts`**, один прицельный тест.
5. Это screenshot, который **не получается** из VisualMatrix (hover/focus/pressed/open портала)? → **`visual.spec.ts`**, один снимок на состояние.

## Папка тестов пакета

```
packages/<pkg>/__test__/
└── <ParentComponent>/
    ├── helpers.ts              # STORIES = { playground, visualMatrix, [scenario] } как StoryRef-объекты
    ├── rendering.spec.ts       # smoke + props propagation (по tier)
    ├── interaction.spec.ts     # ТОЛЬКО browser-specific (если есть)
    ├── keyboard.spec.ts        # ТОЛЬКО focus-trap / arrow-nav (если есть)
    ├── polymorphism.spec.ts    # ТОЛЬКО при `as` (runtime attribute checks)
    ├── visual.spec.ts          # VM + state снимки (по tier)
    └── __snapshots__/
        └── *.png
```

**Одна папка на parent-компонент.**

**Критерий «parent vs автономный компонент»**: компонент считается автономным (заводит **свою** папку `__test__/<Name>/`) тогда и только тогда, когда выполнены **оба** условия:

1. Компонент импортируется потребителем из `@ds/<pkg>` **самостоятельно**, без parent'а в JSX-дереве.
2. Имеет собственный публичный API (свои `constants.ts` / `types.ts` / `TEST_IDS`), не сводящийся к variant-оси другого компонента.

Если хотя бы одно условие нарушено — компонент **вариант parent'а** и тестируется в той же папке через параметризацию args (через `name`/`group`/`story` поля StoryRef в `helpers.ts`). Не заводи отдельную папку под визуальный пресет, под subcomponent, рендерящийся только внутри parent'а, и под комбинации, которые сводятся к выбору значения существующей оси.

## rendering.spec.ts — ориентир по tier'у

Числа ниже — **ориентир минимума**, а не cap. Реальное число тестов диктуется поверхностью публичного API компонента. Превышение ориентира допустимо, если каждый тест проходит «Критерий обоснованности артефакта» из [complexity-tiers.md](./complexity-tiers.md).

| Tier | Ориентир `test(...)` | Что обычно покрывает |
|------|---------------------|------------|
| **XS** (avatar, counter, divider) | **≈1** | `'renders root'` — `gotoStory(buildStoryOptions())` + `toBeVisible(getByTestId(ROOT))`. Всё. |
| **S** (alert, tag) | **≈2–3** | + `'props propagate to data-*'` — параметризован по 1–2 ключевым значениям каждой оси. |
| **M** (button, link) | **≈3–5** | + `'state attribute propagation'` (disabled/loading/etc.) |
| **L** (tabs, dropdown, calendar) | **≈5–8** | + `'ARIA roles render correctly'` + scenario render checks для ключевых субкомпонентов |
| **XL** (modal/drawer/toaster) | **≈8–12** | + scenario-driven рендер (after-trigger открытие, portal mount) |

«Тестов больше ориентира» допустимо, если каждый тест проходит «Критерий обоснованности» (см. [complexity-tiers.md](./complexity-tiers.md)). «Тестов больше ориентира» **не** допустимо, если они дублируют axis-per-test loop (см. [Запрещённые паттерны](#запрещённые-паттерны)) или повторяют то, что уже проверяется в Storybook play / VisualMatrix.

### Параметризация по оси — пример

```ts
// ✅ Хорошо — один test, параметризован ключевыми значениями
test.describe('props propagation', () => {
  for (const { appearance, view, size } of BUTTON_KEY_COMBOS) {
    test(`${appearance} + ${view} + ${size}`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions({ appearance, view, size }));
      const btn = page.getByTestId(BUTTON_TEST_ID);
      await expect(btn).toHaveAttribute('data-appearance', appearance);
      await expect(btn).toHaveAttribute('data-view', view);
      await expect(btn).toHaveAttribute('data-size', size);
    });
  }
});
```

`BUTTON_KEY_COMBOS` — **ключевая выборка** 2–4 комбинаций, не декартово произведение всех осей. По 1 представителю на каждое значение каждой оси.

```ts
// ❌ Плохо — axis-per-test loop
for (const size of Object.values(SIZE)) {
  test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ size }));
    await expect(getByTestId(ROOT)).toHaveAttribute('data-size', size);
  });
}
// → 9 тестов для 9 значений enum. VisualMatrix уже рисует все 9.
```

## interaction.spec.ts — когда заводим

`interaction.spec.ts` заводится **только** под browser-specific сценарии из закрытого списка. Всё, чего нет в списке, — в Storybook play.

**Закрытый список browser-specific сценариев**:

1. File upload через `<input type="file">` + `page.setInputFiles(...)`.
2. Real drag&drop с `DataTransfer` (через `page.evaluate` / `dispatchEvent('drop', new DragEvent(...))`).
3. Viewport / orientation resize и проверка адаптивного поведения после resize.
4. Body scroll lock (проверка `document.body` overflow при открытом портале).
5. Click outside portal (закрытие портала кликом по document вне overlay).
6. Focus-trap внутри портала (Tab по последнему focusable возвращает на первый).
7. Theme switching внутри портала (контент портала перерисовывается при смене темы корневого провайдера).
8. Multi-frame / multi-tab сценарии.

Пункты про `rel='noopener'`-injection и `aria-disabled` vs native `disabled` живут в `polymorphism.spec.ts` (см. ниже), а не здесь — они срабатывают только при наличии `as` prop.

Распределение по tier'у:

| Tier | Сколько обычно |
|------|----------------|
| **XS / S / M** | 0 — нет browser-specific (M-tier `as`-проверки уходят в `polymorphism.spec.ts`) |
| **L** | 2–4 теста — обычно п.4, п.5, п.6, п.7 |
| **XL** | до 6 тестов — обычно п.1, п.2, п.3 + L-набор |

Если ни один пункт списка не применим — `interaction.spec.ts` **отсутствует**.

## keyboard.spec.ts — когда заводим

`keyboard.spec.ts` заводится **только** под сценарии, которые нельзя ассертить в Storybook play (где Tab/Enter/Space покрываются через `userEvent.tab()` / `userEvent.keyboard()`).

**Закрытый список kbd-сценариев для `keyboard.spec.ts`**:

1. Roving tabindex / Arrow / Home / End навигация по нескольким focusable-элементам внутри одного компонента.
2. Focus-trap внутри открытого портала (Tab по последнему focusable возвращает на первый; Shift+Tab — наоборот).
3. Escape closes layered portals (закрытие верхнего портала Escape'ом без затрагивания нижнего).
4. Multi-step focus management (последовательность переходов фокуса при открытии/закрытии нескольких сущностей подряд).

Распределение по tier'у:

| Tier | Какие пункты обычно применимы |
|------|-------------------------------|
| **XS / S / M** | Ни один — `keyboard.spec.ts` отсутствует. Tab/Enter/Space в play. |
| **L** | Один или несколько из п.1, п.2 — при наличии roving tabindex или focus-trap. Иначе — отсутствует. |
| **XL** | Один или несколько из п.1–п.4 — при наличии любого из сценариев. Часто п.3 и п.4 без п.1. |

Если ни один пункт списка не применим — `keyboard.spec.ts` **отсутствует**, независимо от tier'а.

## polymorphism.spec.ts — когда заводим

Только если у компонента есть `as` prop и нужно проверить runtime-behavior, который браузер ставит сам, а jsdom — нет:

1. `href` пробрасывается на anchor через spread props.
2. `target='_blank'` инжектит `rel='noopener noreferrer'` (браузерная санитация, не наш код).
3. Native `<button disabled>` не получает click; anchor с `aria-disabled='true'` — получает. Проверка через `toHaveAttribute('aria-disabled', 'true')` + `await locator.click()` без assertion'а на onClick (его контроль — в play).
4. Прочие intrinsic-атрибуты, которые ставятся только при реальном рендере анкора/инпута.

Минимум — 1 spec-файл, 1–3 теста на пакет.

**Исключение для локаторов**: assertions через `toHaveAttribute('href' | 'rel' | 'target' | 'aria-disabled')` не считаются «локатором через role/text», они смотрят на runtime-атрибуты конкретного DOM-узла, полученного через `getByTestId`. Запрет `getByRole/getByText/...` (`visual-regression-standard.md` §«Локаторы — только через TEST_IDS») их не касается.

Поведенческие проверки (что произойдёт при клике, как ведёт себя focus) живут в `tests/<Name>.InteractionTest.stories.tsx::play`, не в `polymorphism.spec.ts`. Один экспорт `InteractionTest` со `step()`-блоками; отдельных `AsAnchorRelNoopener` или подобных экспортов **не заводим** — они либо собираются step'ами в один InteractionTest, либо живут в `polymorphism.spec.ts` как runtime-attribute assertion.

## visual.spec.ts — см. отдельное правило

Цифры по tier'у — см. [visual-regression-standard.md](./visual-regression-standard.md). Кратко:

| Tier | Снимков |
|------|---------|
| XS | 1 (VisualMatrix) |
| S  | 3 (+ hover, focus) |
| M  | 4 (+ pressed) |
| L  | 4–5 (+ portal-open) |
| XL | 5–8 (+ scenario before/after) |

## Запрещённые паттерны

1. **Axis-per-test loop** в rendering — `for (const v of Object.values(ENUM)) test(...)`. Замена: один параметризованный test с 1–3 ключевыми значениями.
2. **Per-view interactive screenshot** — `for (const view of VIEWS) screenshot('hover-${view}.png')`. Замена: один `interaction-hover.png` через Playground + args.
3. **Дубль play-функции в interaction.spec** — если play уже делает `userEvent.click` + `expect(args.onClick).toHaveBeenCalled()`, не повторяем в Playwright.
4. **Per-state снапшот того, что в VisualMatrix** — VM покрывает `default/disabled/loading`. Не нужен `disabled.png` отдельным снимком.
5. **Per-placement / per-orientation snapshot** для свойств, которые покрывает StoryTable — должны быть строкой матрицы.
6. **Папка-на-сабкомпонент** для вариантов одного компонента — одна папка на parent + параметризация через args.
7. **Хардкод story IDs** в spec/helpers — только через `name`/`group`/`story` builders (`buildStoryOptions(...)`) или StoryRef-объекты.
8. **Дубль prop validation** между `rendering.spec.ts` и `interaction.spec.ts` — проп проверяется в одном месте, не в обоих.
9. **Excessive interaction-state coverage** — для M-tier хватает hover/focus/pressed; не делаем `hover-with-icon`, `hover-disabled`, `hover-loading`.

## helpers.ts — формат

```ts
// packages/<pkg>/__test__/<Parent>/helpers.ts
import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export const COMPONENT_TEST_ID = 'component';

export const COMPONENT_STORIES = {
  playground: { name: 'component', story: 'playground' },
  visualMatrix: { name: 'component', story: 'visual-matrix' },
  // tests/<Component>.<Scenario>.stories.tsx
  interactionTest: { name: 'component-tests-interaction', story: 'interaction-test' },
  // examples/<Component>.<Scenario>.stories.tsx
  openControlled: { name: 'component-examples-controlled', story: 'controlled' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = COMPONENT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': COMPONENT_TEST_ID, ...props },
  };
}
```

После миграции стори (см. [stories-standard.md](./stories-standard.md)) story IDs у `tests/` / `examples/` стори отличаются от `<...>--<scenario>` — теперь это `<...>-tests-<scenario>--<scenario>` или `<...>-examples-<scenario>--<scenario>`. Helpers — единственная точка обновления; spec'ы используют только StoryRef-объекты.

Канонический источник актуальных id — манифест Storybook (`http://localhost:6006/index.json`). Эвристики kebab-каста (где Storybook ставит дефисы внутри `PascalCase`, как нормализует сегменты `title`) могут расходиться с интуицией и меняться между версиями. После любого переименования экспорта/title — сверяй `STORIES`-объекты с манифестом, не угадывай.

## `gotoStory` — единая форма вызова

Fixture перегружен (`(options)` и `(storyId, args)`), но в spec'ах используется **только options-форма** через `buildStoryOptions`:

```ts
// ✅ Канонические формы:
await gotoStory(buildStoryOptions());                                  // playground без args
await gotoStory(buildStoryOptions({ size: 'm' }));                     // playground + URL args
await gotoStory(buildStoryOptions(undefined, COMPONENT_STORIES.visualMatrix)); // другая story без args
await gotoStory(buildStoryOptions({ open: true }, COMPONENT_STORIES.interactionTest)); // другая story + args

// ❌ Запрещено в spec'ах:
await gotoStory('components-button--playground', { size: 'm' }); // hardcoded id-строка
await gotoStory(COMPONENT_STORIES.playground, { size: 'm' });    // обход builder'а, теряется data-test-id и group-резолв
```

ID-строковая сигнатура — раритет для не-test кода и legacy. Spec'ы её не используют.

## Импорты

```ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, COMPONENT_STORIES, COMPONENT_TEST_ID } from './helpers';
```

Всё через алиас `#playwright-tooling/*`. Относительные `../../../../playwright/...` запрещены.

## Чеклист перед коммитом

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

## Связанные правила

- [stories-standard.md](./stories-standard.md) — структура `stories/<Name>/tests/`.
- [visual-regression-standard.md](./visual-regression-standard.md) — visual snapshots по tier'у.
- [complexity-tiers.md](./complexity-tiers.md) — суммарная таблица по tier'ам.

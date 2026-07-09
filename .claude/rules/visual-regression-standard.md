# Visual regression — стандарт

**Область действия:** `packages/*/__test__/<Component>/visual.spec.ts` и baseline'ы в `__snapshots__/`.

> **Канонический эталон в репо** — [`packages/button/__test__/Button/visual.spec.ts`](../../packages/button/__test__/Button/visual.spec.ts). Используй его как живой пример, но при расхождении правила и эталона приоритет — у правила (эталон может отставать).

## Принцип

**Один скриншот `VisualMatrix` story = главный визуальный артефакт пакета.** Он покрывает все публичные оси (size × appearance × view × state). Дополнительные снимки — только для **состояний, невыразимых статикой**:

- `:hover`, `:focus-visible`, `:active` / pressed — клиентские состояния, не показываются в VM.
- `open` / `expanded` для портальных компонентов — модальный overlay невозможно отрисовать в StoryTable без триггера.
- Scenario before/after — для XL-компонентов с stateful flow (sort, filter, paginate, select).

Цель — каждый снимок несёт уникальный визуальный сигнал. Дубли (один и тот же state в разных оборачивающих файлах, per-view × per-state cartesian) запрещены. Объём диктуется поверхностью API, а не tier-cap'ом — но каждый дополнительный снимок обязан проходить «Критерий обоснованности артефакта» из [complexity-tiers.md](./complexity-tiers.md).

## Ориентир по tier'у

Числа — **ориентир минимума**, не cap. Если у компонента 12 appearance × 4 view, и каждая пара даёт визуально различимый рендер — он попадает в VisualMatrix как 12×4 ячейки (один снимок), а не в 48 отдельных PNG. Если компонент имеет 6 уникальных портальных сценариев, у него будет 6 portal-snapshots, а не «4–5 по правилу tier L».

| Tier | Ориентир снимков | Что обычно снимаем |
|------|------------------|-------------|
| **XS** | **≈1** | `visual-matrix.png` |
| **S** | **≈2** | + `interaction-states.png` (composite default × hover × focus) |
| **M** | **≈2** | + `interaction-states.png` с `includePressed: true` (default × hover × focus × pressed) **или** `<axis>-state-matrix.png` (когда state взаимодействует с осью, как у Button: appearance × state) |
| **L** | **≈3–5** | + `placements.png` / `widths.png` (portal composite через click-loop) + уникальные `open-<scenario>.png` (nested, scrollable, with-footer) |
| **XL** | **≈5–8** | + before/after по 1 на ключевую интеракцию (sort / filter / paginate / select) |

«Снимков больше ориентира» допустимо, если каждый проходит «Критерий обоснованности» (см. [complexity-tiers.md](./complexity-tiers.md)). Недопустимо, если они дублируют axis-per-state cartesian (см. [Запрещённые паттерны](#запрещённые-паттерны)) или повторяют то, что уже есть в VisualMatrix.

## Общие правила

- Baselines снимаются **только на `chrome`** (см. `VISUAL_BASELINE_PROJECT` из `#playwright-tooling/constants/projects`). Visual spec обязан делать `test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, …)` в `beforeEach`.
- Baseline-файлы лежат **рядом** со спеком: `packages/<pkg>/__test__/<Component>/__snapshots__/<arg>-<projectName>.png`.
- Имя snapshot-файла **без префикса пакета** (префикс несёт папка): `visual-matrix.png`, `interaction-hover.png`, не `button-visual-matrix.png`.
- Обновление: `pnpm test:e2e:update-snapshots` (chrome-only) — переснимает **все** baseline'ы (`=all`). Для точечной пересъёмки только разошедшихся снимков — `pnpm test:e2e:update-snapshots:changed` (`=changed`): не трогает совпадающие PNG и не фиксирует случайный флейк-рендер как эталон.

## Канонические имена snapshot-файлов

Допустимые имена (никаких других не вводи без обоснования в PR):

| Имя | Что внутри | Когда заводить |
|-----|------------|----------------|
| `visual-matrix.png` | Скриншот `VisualMatrix` story (`StoryTable` со всеми осями) | Всегда |
| `interaction-states.png` | Composite `default × hover × focus [× pressed]` через `assertInteractionStatesSnapshot` | Заводится тогда и только тогда, когда у компонента или его публичного фокусируемого слота есть **визуально отличный от default** `:hover` / `:focus-visible` / `:active` (фон, border, outline-цвет, opacity, transform). Если ни одно из этих состояний не меняет внешний вид — не заводится. Контейнеры без интерактива (индикаторы статуса, разделители, статичная вёрстка) под это правило не подпадают. |
| `<axis>-state-matrix.png` | Composite `axis × state`. `<axis>` — kebab-case имя оси API компонента из закрытого списка: `appearance`, `view`, `size`, `placement`, `orientation`, `variant`. Других значений вводить нельзя. | Когда состояние × ось взаимодействуют, и общий `interaction-states.png` не показывает важных различий |
| `placements.png` / `widths.png` / `modes.png` | Composite через click-loop по триггер-story | Portal-компоненты, где placement/width — независимая ось, и VM не собирается из-за full-viewport overlay |
| `open-<scenario>.png` | Уникальный portal-сценарий (`open-nested`, `open-scrollable`, `open-with-footer`, `open-no-blackout`) | Один файл = один уникальный сценарий, нельзя выразить через VM или composite |

**Запрещённые имена** (антипаттерны прошлых поколений):

- `hover.png`, `focus.png`, `pressed.png`, `default.png` — каждое состояние отдельным файлом. → `interaction-states.png`.
- `interaction-hover.png` / `interaction-focus.png` (раздельно) — историческое имя из старой версии стандарта. → `interaction-states.png`.
- `open-top.png` / `open-bottom.png` / `open-left.png` / `open-right.png` — placement-per-file. → `placements.png` composite.
- `hover-<appearance>.png` × N — per-axis × per-state cartesian. → `<axis>-state-matrix.png`.
- `<pkg>-<...>.png` с префиксом пакета — префикс уже в пути папки.

## Локаторы — только через `TEST_IDS`

Любой селектор в visual.spec / interaction.spec — **только** `getByTestId(TEST_IDS.<...>)`. Полный запрет (`getByRole`/`getByText`/`getByLabelText`, CSS-селекторы, nested chain'ы) и его обоснование — в [stories-standard.md](./stories-standard.md) §«data-test-id».

Если spec'у нужен селектор на слот без `TEST_IDS.<...>` — **расширь `TEST_IDS`** в `packages/<pkg>/src/constants.ts` и проставь `data-test-id` в компоненте; для story-сценариев передавай id через `args` story. Один источник истины для потребителя (app-слой e2e) и теста ds-пакета.

**Исключение — runtime-атрибутные assertion'ы в `polymorphism.spec.ts`**: `expect(getByTestId(ROOT)).toHaveAttribute('href' | 'rel' | 'target' | 'aria-disabled', ...)` — это assertion на атрибуте конкретного узла, а не локатор по роли/тексту. Запрет на `getByRole/...` его не касается. См. [e2e-testing-standard.md](./e2e-testing-standard.md) §«polymorphism.spec.ts — когда заводим».

## Утилита: `assertInteractionStatesSnapshot`

Заменяет россыпь per-state PNG одним composite. Импорт из `#playwright-tooling/utils`. Сигнатура:

```ts
await assertInteractionStatesSnapshot(page, {
  target: getByTestId(ROOT),                   // что снимаем для каждой cell
  frame?: Locator | Locator[],                 // кадр снимка (см. ниже); по умолчанию = target
  hoverTarget?: Locator,                       // что hover'им; по умолчанию = target
  focusAction?: (page) => Promise<void>,       // как фокусировать; по умолчанию — page.keyboard.press('Tab')
  pressedTarget?: Locator,                     // по координатам чего mouse.down; по умолчанию = target
  includePressed?: false,                      // M+ — добавить 4-ю cell с mouse.down
  padding?: 8,                                 // padding вокруг target — чтобы влез outline
  snapshotName?: 'interaction-states.png',
  layout?: 'row' | 'col',                      // раскладка cells; по умолчанию 'row'
});
```

Примеры:

```ts
// Случай 1 — компонент с одной интерактивной зоной (корень = и hover, и focus):
await assertInteractionStatesSnapshot(page, { target: getByTestId(TEST_IDS.root) });

// Случай 2 — hover падает на внутренний слот, focus — Tab по DOM (по умолчанию),
// снимаем компонент целиком, чтобы было видно окружение (родительский контейнер, соседние слоты):
const innerSlot = getByTestId(TEST_IDS.<slot>).nth(0);
await assertInteractionStatesSnapshot(page, {
  target: getByTestId(TEST_IDS.root),
  hoverTarget: innerSlot,
});

// Случай 3 — фокус должен попасть не на первый focusable, а на конкретный элемент
// (например, после нескольких Tab или через Arrow nav). Передавай свою focusAction:
await assertInteractionStatesSnapshot(page, {
  target: getByTestId(TEST_IDS.root),
  focusAction: async (page) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
  },
});

// Случай 4 — компонент с pressed-состоянием (M+):
await assertInteractionStatesSnapshot(page, {
  target: getByTestId(TEST_IDS.root),
  includePressed: true,
});

// Случай 5 — bbox target'а шире его визуального контента (block-level <div> на всю
// ширину родителя; layout-обёртка с растяжением). Передай `frame` — массив локаторов,
// по union которых клипится кадр снимка:
await assertInteractionStatesSnapshot(page, {
  target: getByTestId(TEST_IDS.root),
  frame: [getByTestId(TEST_IDS.<innerSlot1>), getByTestId(TEST_IDS.<innerSlot2>)],
});
```

Дефолтный `focusAction` — `page.keyboard.press('Tab')`. Используется именно Tab, а не программный `.focus()`: без user-gesture браузер ставит только `:focus`, а нужный `:focus-visible` (с DS-outline'ом) появляется только после клавиатурного фокуса.

Не собирай `default + hover + focus` вручную из трёх отдельных `expect(...).toHaveScreenshot(...)` — используй утилиту.

## Кадр снимка — bbox компонента, не `#storybook-root`

Снимок должен содержать **только сам компонент + минимально необходимый контекст**. Лишний пустой viewport вокруг — шум: увеличивает PNG в килобайтах, размывает diff-сигнал, мешает code-review.

Правило выбора кадра:

| Тип снимка | Кадр |
|---|---|
| `visual-matrix.png` | `page.locator(STORYBOOK_ROOT_SELECTOR)` — VM-сетка `StoryTable` сама заполняет всю область, обрезка не нужна. |
| Сценарный снимок компонента (`expanded.png`, `open-<scenario>.png` для non-portal, любой `<state>.png`) | **Дефолт** — `screenshotWithPadding(page, getByTestId(TEST_IDS.root), 16, SCREENSHOT_DEFAULT_OPTS)` + `expect(png).toMatchSnapshot(...)`: конкретный bbox компонента + 16px padding для размещения outline/shadow. **`expect(locator).toHaveScreenshot(...)` использовать только** когда у компонента уже есть собственный внешний `margin` или `padding`, либо `:focus-visible` outline-offset = 0 (outline не выходит за bbox). В сомнительных случаях — `screenshotWithPadding`. |
| Composite через `assertInteractionStatesSnapshot` | Утилита сама обрезает по `target` + `padding` (или по `frame`-union). |
| Portal-композит (popover/tooltip/dropdown) | `screenshotRegion(page, [trigger, content], padding)` — union триггера и контента. |
| Full-viewport overlay (modal/drawer) | `expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(name, MATCH_SNAPSHOT_DEFAULT_OPTS)`. Когда trigger-based Playground оборачивает компонент в `<DemoPage>`/`<DemoPanel>`, `STORYBOOK_ROOT_SELECTOR` захватывает и demo-обёртку под overlay'ем (лишние поля); viewport-кадр режет ровно по экрану. Исключение — «уголковые» portal'ы (toaster и т.п.), где positioning относительно фона важен для визуального сигнала. |

```ts
// ❌ Плохо — кадр содержит большой пустой viewport вокруг collapsed block
await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('expanded.png', SCREENSHOT_DEFAULT_OPTS);

// ✅ Хорошо — кадр = сам compose-block, без пустоты
await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveScreenshot('expanded.png', SCREENSHOT_DEFAULT_OPTS);
```

Если bbox компонента шире его визуального контента (block-level `<div>` без `display: inline-block` берёт всю ширину родителя; некоторые layout-обёртки) — используй `frame: [innerSlot1, innerSlot2]` в `assertInteractionStatesSnapshot` либо `screenshotRegion(page, [...], padding)` напрямую.

## Стабилизация снимков (обязательно)

```ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';

await gotoStory(buildStoryOptions(undefined, BUTTON_STORIES.visualMatrix));
await waitForFonts();
await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
```

`waitForFonts` доступен двумя способами и они **не взаимозаменяемы по сигнатуре**: fixture из `#playwright-tooling/fixtures` (через `async ({ page, waitForFonts }) => …`) — вызов без аргумента, `await waitForFonts()`; либо raw-утилита из `#playwright-tooling/utils` — `await waitForFonts(page)`. Используй fixture-форму в spec'ах. Utility-форма — для helpers и не-test кода.

- `waitForFonts` вызывается **один раз после `gotoStory(...)`**, до первого `toHaveScreenshot` / `toMatchSnapshot`. Не повторять перед каждым cell composite: `assertInteractionStatesSnapshot` и `composeScreenshots` внутри делают несколько снимков, шрифты к этому моменту уже загружены. Повторный `waitForFonts` между cells — лишний overhead.
- Если spec делает несколько `gotoStory` (например, click-loop по разным story), `waitForFonts` повторяется один раз после каждой `gotoStory`.
- Фиксированный viewport из `PROJECTS.chrome.viewport`.
- Снимаем `STORYBOOK_ROOT_SELECTOR` (`#storybook-root`), не viewport — иначе ловим шум от Storybook chrome.
- `STORYBOOK_ROOT_SELECTOR` и `SCREENSHOT_DEFAULT_OPTS` — общие из `#playwright-tooling/constants/common`. Локальные `*_ROOT_SELECTOR` / `*_SCREENSHOT_OPTS` в `helpers.ts` и инлайн-литералы `'#storybook-root'` / `{ animations: 'disabled', caret: 'hide' }` запрещены.
- Если компонент использует JS-motion (а не только CSS-transitions/animations), завершение анимации через `document.getAnimations().finished` или `every(playState !== 'running')` ненадёжно: библиотеки могут оставлять долгоживущие Web Animations. Ориентируйся на **визуальный признак стабилизации** — `waitForStableBbox(getByTestId(...))` на видимой части компонента (когда bbox перестаёт меняться, анимация фактически завершена).

## Структура visual.spec.ts

```ts
import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';

import { BUTTON_STORIES, buildStoryOptions } from './helpers';

test.describe('Button — visual regression', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_STORIES.visualMatrix));
    await waitForFonts();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, { target: getByTestId(BUTTON_TEST_ID) });
  });
});
```

## Portal-компоненты (drawer, modal, popover, tooltip, dropdown, toaster)

**Триггер и окружение обязательно в кадре.** Снимаем `STORYBOOK_ROOT_SELECTOR` (или `page` для full-viewport overlay), **не** `getByTestId(content)`. Изолированный content без триггера/окружения скрывает позиционирование, offset, arrow, max-width относительно вьюпорта — теряется главный визуальный сигнал. Исключение — overlay явно вне вьюпорта (large modal); тогда — комментарий в spec.

Один скриншот `open` — общий случай. Дополнительные снимки только для **уникальных** сценариев, **невыразимых** в одной матрице:

- `open-nested.png` — drawer внутри drawer (state-композиция).
- `open-with-scroll.png` — overflow контента, нужен скролл.
- `open-with-footer.png` — слот, который меняет layout.

**Per-placement не нужен снимком** — все placements (top/bottom/left/right) собираются строкой матрицы в `VisualMatrix` (`StoryTable` с 4 ячейками = 1 скриншот VM с 4 рендерами).

```ts
// ❌ Плохо — 4 снимка для 4 placements
for (const placement of ['top', 'bottom', 'left', 'right']) {
  test(`open-${placement}`, async (...) => {
    await gotoStory(buildStoryOptions({ placement, open: true }));
    await expect(...).toHaveScreenshot(`open-${placement}.png`, ...);
  });
}

// ✅ Хорошо — VM-секция Placement × Trigger с 4×N ячейками = 1 снимок visual-matrix.png
```

### Альтернатива: trigger-story + click-loop + composite

Когда поведение портала **нельзя** выразить в VM-ячейке (например, full-viewport overlay с backdrop, который перекрывает соседние ячейки StoryTable и нарушает сетку), допустим вариант: завести в `tests/<Name>.Placements.stories.tsx` отдельную story с N триггерами на разные оси. Spec в одном тесте кликает по триггерам поочерёдно, после каждого открытия делает скриншот, закрывает и переходит к следующему, в конце объединяет все снимки через `composeScreenshots` в composite PNG.

Когда применять:

- Только если VM-вариант действительно не работает (overlay перекрывает соседние ячейки, focus-trap уводит фокус и т.п.).
- Один инстанс компонента в story с `useState`-управлением оси через `key`-remount предпочтительнее N независимых компонентов — меньше state-leakage.
- Компонент должен открываться **кликом** по триггеру, а не через `open=true` URL-arg в loop'е — последний путь нестабилен из-за слияния args между итерациями.

Не применять как способ по умолчанию для всех порталов — VM-матрица с `StoryTable` остаётся первичным паттерном там, где она физически собирается.

## Pressed (M+, осторожно)

Pressed добавляется четвёртой cell'ой к `interaction-states.png` через `includePressed: true` — не отдельный PNG. Pressed нестабилен в firefox/safari — потому baselines идут только на chrome. Если baseline нестабилен — отключай `includePressed` для конкретного компонента, не весь composite.

## Axis × state matrix

Когда состояние взаимодействует с осью так, что общий `interaction-states.png` (один представитель оси) скрывает важные различия — заводи `<axis>-state-matrix.png` через двойной loop + `composeScreenshots({ layout: 'grid', columns: STATES.length })`.

Скелет:

```ts
test('<axis> × state matrix', async ({ page, gotoStory, getByTestId }) => {
  const cells: ScreenshotCell[] = [];
  for (const axisValue of KEY_AXIS_VALUES) {           // ключевая выборка значений оси
    for (const state of KEY_STATES) {                  // ['default', 'hover', 'focus'] (+ 'pressed' если M+)
      await gotoStory(buildStoryOptions({ [AXIS_NAME]: axisValue }));
      const el = getByTestId(ROOT_TEST_ID);
      // …выставить state на el (hover / focus / mouse.down) …
      cells.push({
        label: `${axisValue}/${state}`,
        png: await screenshotWithPadding(page, el, 8, SCREENSHOT_DEFAULT_OPTS),
      });
    }
  }
  const composite = await composeScreenshots(cells, { layout: 'grid', columns: KEY_STATES.length });
  expect(composite).toMatchSnapshot('<axis>-state-matrix.png');
});
```

Один файл, видно сразу и оси, и состояния. Не заводи россыпь `hover-<value>.png` × N — они эквивалентны одной строке этой матрицы.

## Пере-генерация baselines

1. Удали устаревшие PNG перед первой генерацией, если API/раскладка изменились:
   ```bash
   rm packages/<pkg>/__test__/<Component>/__snapshots__/*.png
   ```
2. Убедись, что Storybook запущен (`pnpm dev:storybook`) или что `reuseExistingServer` в корневом `playwright.config.ts` подключит dev-сервер.
3. `pnpm test:e2e:update-snapshots packages/<pkg>` (только chrome; `=all` — все baseline'ы). Точечно, только разошедшиеся — `pnpm test:e2e:update-snapshots:changed packages/<pkg>` (`=changed`). **На Mac** baseline'ы для CI снимай через Docker (Linux, образ пайпа): `pnpm test:e2e:docker:visual:update packages/<pkg>` (или `…:update:changed` для только разошедшихся) — см. README §«Visual baselines на Mac».
4. Ручной review каждого PNG — не пустой, не с артефактами от dev-инструментов.
5. Коммить PNG отдельным коммитом `test(visual): update <pkg> baselines`.

## Запрещённые паттерны

1. **Per-state раздельные PNG** (`hover.png` + `focus.png` + `pressed.png`) — каждое состояние отдельным файлом. Замена: один `interaction-states.png` composite через `assertInteractionStatesSnapshot`.
2. **Per-view × per-state cartesian** (`hover-filled.png`, `hover-outline.png`, … × N view × M state). Button hover не зависит от view → один представитель в `interaction-states.png`; если зависит от axis — `<axis>-state-matrix.png`.
3. **Portal content без окружения** (`expect(getByTestId(TEST_IDS.content)).toHaveScreenshot(...)` для tooltip/popover/dropdown). Снимаем триггер + контент в кадре.
4. **Per-placement / per-width PNG портального компонента** (`open-top.png` / `open-bottom.png` / `open-width-trigger.png` / …) — заводи `placements.png` / `widths.png` composite через click-loop по триггер-story.
5. **Per-axis snapshot** (`size-s.png`, `size-m.png`, `size-l.png`) — все размеры в VM.
6. **Text-content variants как axis** (`long-text-default.png`, `long-text-no-max-width.png`, `no-max-width-short.png`) — это **в VM** отдельной секцией с фиксированной шириной обёртки **или** в одном composite через `composeScreenshots`.
7. **`page.screenshot()` без локатора** — снимай `STORYBOOK_ROOT_SELECTOR`, не viewport.
8. **Snapshot без `SCREENSHOT_DEFAULT_OPTS`** — там `animations: 'disabled'`, без него flaky из-за transitions.
9. **Локальные дубликаты констант** (`*_ROOT_SELECTOR`, `*_SCREENSHOT_OPTS` в `helpers.ts`, inline-`'#storybook-root'`) — импорт из `#playwright-tooling/constants/common`.
10. **Префикс пакета в snapshot-имени** (`button-hover.png`) — префикс уже в пути папки.
11. **Static per-use-case snapshot** для того, что в VM — VM покрывает все статические оси.
12. **Responsive snapshot на каждом breakpoint** для атомарных компонентов — VM не меняется от viewport'а.
13. **Отдельный `<pkg>.dimensions.spec.ts`** ради проверки высот — Figma-parity проверяется визуальной разницей VisualMatrix.
14. **Stale baseline PNG'и в `__snapshots__/`**, на которые `visual.spec.ts` уже не ссылается — удаляй сразу при рефакторинге spec'а, не оставляй «на всякий случай».

## Связанные правила

- [e2e-testing-standard.md](./e2e-testing-standard.md) — общий канон тестов и tier-таблицы.
- [stories-standard.md](./stories-standard.md) — VisualMatrix story (источник главного скриншота).
- [complexity-tiers.md](./complexity-tiers.md) — суммарные цифры по tier'ам.

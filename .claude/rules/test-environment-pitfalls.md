# Тестовое окружение — известные пitfalls

**Область действия:** play-функции в `stories/<Name>/tests/*.stories.tsx` и Playwright spec'и в `__test__/<Component>/*.spec.ts`. Этот файл — справка по граблям, на которые мы реально наступили при первом полном прогоне `pnpm test:stories` / `pnpm test:e2e:chrome`. Каждый пункт — реальный фейл с фиксом.

## Storybook Test Runner (vitest + chromium)

### `userEvent.keyboard(' ')` / `'{ }'` / `'{Space}'` — Space не активирует native `<button>` click

userEvent в storybook-test browser-окружении (vitest + storybook addon-vitest) **не** доводит `keyUp` Space до native `<button>` — `click` не срабатывает, `onClick`-mock не увеличивается. Все три формы (`' '`, `'{ }'`, `'{Space}'`) ведут себя одинаково.

**Решение**: не тестировать Space через `userEvent.keyboard` в play. Достаточно `{Enter}`-шага — нативное поведение Space на `<button>` гарантировано браузером. Если Space критичен — выноси в отдельный Playwright spec через `page.keyboard.press('Space')` (там работает).

```tsx
// ❌ не работает в storybook-test
await step('keyboard: Space triggers click', async () => {
  await userEvent.keyboard('{Space}');
  expect(args.onClick).toHaveBeenCalledTimes(2);
});

// ✅ Enter покрывает клавиатурную активацию
await step('keyboard: Enter triggers click', async () => {
  await userEvent.keyboard('{Enter}');
  expect(args.onClick).toHaveBeenCalledTimes(2);
});
```

### `userEvent.keyboard('{ArrowRight}')` после `element.focus()` — rc-slider не реагирует

rc-slider/rc-rate и старые rc-* библиотеки читают `e.which || e.keyCode` в onKeyDown, а **не** `e.key`. userEvent при программном `.focus()` корректно отправляет `key: 'ArrowRight'`, но `keyCode/which` остаются `0` — rc-slider `switch (e.which || e.keyCode)` промахивается мимо case'ов.

**Решение**: используй `fireEvent.keyDown` с явными `keyCode` и `which`. Это низкоуровневый dispatch — не зависит от focus-visible tracker'а и явно задаёт legacy-поля.

```tsx
// ❌ не работает с rc-slider
handle.focus();
await userEvent.keyboard('{ArrowRight}');

// ✅ fireEvent с keyCode/which
import { fireEvent } from 'storybook/test';

handle.focus();
fireEvent.keyDown(handle, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
```

Распространённые keyCode для arrow keys: ArrowLeft=37, ArrowUp=38, ArrowRight=39, ArrowDown=40.

### Controlled props в URL-args — компонент не переключается

URL-args через `gotoStory(buildStoryOptions({ checked: true }))` применяются как **controlled** prop. Storybook не апдейтит args при клике пользователя по компоненту в play — controlled-prop остаётся `true` навсегда, click не меняет состояние, `expect(input).not.toBeChecked()` фейлится.

**Решение**: передавай **uncontrolled** дефолт (`defaultChecked`, `defaultValue`, `indeterminateDefault` и т.п.) через URL-args. Компонент возьмёт его как initial и сможет переключаться.

```tsx
// ❌ controlled — click не меняет состояние
await gotoStory(buildStoryOptions({ checked: true }));

// ✅ uncontrolled — initial=checked, click переключает
await gotoStory(buildStoryOptions({ defaultChecked: true }));
```

### Click на родительском контейнере — обработчик должен быть на нём, не на дочернем SVG

`userEvent.click(div)` дispatch'ит mouse events в центр div'а. Если div содержит SVG с `onClick`, click обычно «прокатывает» (SVG получает событие), **но** в storybook-test (vitest+browser) этот сценарий ненадёжен — особенно когда SVG имеет CSS `pointer-events` или transform'ы.

**Решение**: вешай `onClick` на сам wrapping `<div data-test-id=...>`, а SVG-иконку оставляй декоративной (без обработчиков). Тест `userEvent.click(wrapper)` стабильно срабатывает.

```tsx
// ❌ click на div не всегда триггерит handler на inner SVG
<div data-test-id={TEST_IDS.starHalfRight}>
  <StarSVG onClick={() => handleClick(VALUE.Full)} />
</div>

// ✅ handler на wrapper
<div data-test-id={TEST_IDS.starHalfRight} onClick={() => handleClick(VALUE.Full)}>
  <StarSVG />
</div>
```

Дополнительно: на wrapper с обработчиком интеракции жди `jsx-a11y/no-static-element-interactions` от eslint — если у компонента уже есть публичный фокусируемый родитель (`role='radio'`, `tabIndex`), `// eslint-disable-next-line` с пояснением допустим.

## Trigger-based / portal-компоненты

### `data-test-id` через story `args` → `<Component {...args}>` оседает на portal floating div, не на trigger

Когда story делает `args.data-test-id` + `<Tooltip {...args}>`, компонент `Tooltip` через `{...rest}` → `extractSupportProps(rest)` переносит `data-test-id` на **floating portal div** (тот, который монтируется на hover). Триггер-кнопка остаётся без id (или с другим), а content виден только после hover'а.

**Симптомы**:
- При запуске спека `getByTestId('tooltip-content').toBeVisible()` после `trigger.hover()` — либо «not found» (если на content нет id), либо strict-mode violation (если URL-args buildStoryOptions перетёр trigger id на content id).

**Решение**: НЕ полагайся на `args.data-test-id` для пометки content. Оборачивай `tip` в `<span data-test-id={TEST_IDS.content}>`, а триггер получает свой id напрямую через render.

```tsx
// ❌ data-test-id через args идёт на floating div (только после hover) + перетирает
args: { 'data-test-id': TEST_IDS.tooltip.content, tip: 'Текст' }
render: (args) => <Tooltip {...args}><Button data-test-id={TEST_IDS.triggerOpen} /></Tooltip>

// ✅ id на span внутри tip — content всегда адресуем, триггер свой
args: { tip: 'Текст' }  // без data-test-id
render: (args) => (
  <Tooltip {...args} tip={<span data-test-id={TEST_IDS.content}>{args.tip}</span>}>
    <Button data-test-id={TEST_IDS.triggerOpen} />
  </Tooltip>
)
```

Дополнительно: `buildStoryOptions` для тaких пакетов **не** должен ставить `props: { 'data-test-id': ... }` — иначе URL-args перетирают триггер.

### `QuestionTooltip` (и другие icon-trigger портал-компоненты) — `data-test-id` слот в drawer/modal

Когда родитель (Drawer/Modal) тестирует «слот с подсказкой рендерится» через `data-test-id` на QuestionTooltip, id оседает на floating portal (виден только после hover). Тест `await expect(getByTestId(...)).toBeVisible()` после открытия drawer'а — фейл.

**Решение**: оборачивай QuestionTooltip в `<span data-test-id={...}>` для пометки слота.

```tsx
// ❌ data-test-id на QuestionTooltip → floating portal (после hover)
<QuestionTooltip tip='...' data-test-id={SLOT_TEST_ID} />

// ✅ span-обёртка делает слот адресуемым сразу
<span data-test-id={SLOT_TEST_ID}>
  <QuestionTooltip tip='...' />
</span>
```

### `Accordion` / `ToggleGroup` / `Context.Provider`-only компоненты — нет DOM-узла для `data-test-id`

Некоторые компоненты возвращают только `<Context.Provider value={...}>{children}</Context.Provider>` без своей DOM-обёртки. `data-test-id` некуда применить — спек получает «element not found».

**Решение**: в story-render оборачивай Component в `<div data-test-id={args['data-test-id']}>`, чтобы корень был адресуем. Альтернатива — добавить DOM-обёртку в сам компонент, но это меняет анатомию.

```tsx
// ❌ Accordion → Context.Provider, никакого DOM
<Accordion {...args}>{children}</Accordion>

// ✅ Wrapper для адресации в story
<div data-test-id={args['data-test-id']}>
  <Accordion {...args}>{children}</Accordion>
</div>
```

### `Search` / multi-layer components — `data-test-id` через `extractSupportProps(rest)` падает на inner Field

Если компонент имеет несколько вложенных div'ов (root + backgroundWrapper + Field), и `{...extractSupportProps(rest)}` стоит на FieldComponent (не на root), то `data-test-id` оседает на inner Field. Спек `expect(getByTestId(root)).toHaveAttribute('data-loading', 'true')` фейлит — `data-loading` на outer root, `data-test-id` на inner Field, разные узлы.

**Решение**: либо извлекай `data-test-id` отдельно и ставь на outer root явно, либо переноси `extractSupportProps` на outer.

```tsx
// ❌ data-test-id на inner Field, data-loading на outer
function Search({ ...rest }) {
  return (
    <div data-loading={loading || undefined}>
      <Field {...extractSupportProps(rest)} />
    </div>
  );
}

// ✅ data-test-id на outer root
function Search({ 'data-test-id': dataTestId, ...rest }) {
  return (
    <div data-test-id={dataTestId} data-loading={loading || undefined}>
      <Field {...extractSupportProps(rest)} />
    </div>
  );
}
```

## Storybook ID kebab-casing

### Storybook 10 не разделяет PascalCase в title-сегментах дефисами

Story title `Components/Stepper/Examples/BasicFlow` → storybook id `components-stepper-examples-basicflow--basic-flow` (НЕ `basic-flow` в имени).

Title kebab берёт **сегмент целиком** и lowerCase'ит без разделения PascalCase. Story-часть id берётся от export name и kebab-case'ится (`BasicFlow` → `basic-flow`).

Это влияет на `helpers.ts::STORIES`-объект — `name` должен соответствовать реальному id storybook'а.

**Решение**: сверяйся с `http://localhost:6006/index.json` для актуальных id, не угадывай по логике дефисов.

```ts
// ❌ предположение, что Storybook поставит дефис
basicFlow: { name: 'stepper-examples-basic-flow', story: 'basic-flow' }
// → URL `components-stepper-examples-basic-flow--basic-flow` (NOT FOUND)

// ✅ реальный id
basicFlow: { name: 'stepper-examples-basicflow', story: 'basic-flow' }
// → URL `components-stepper-examples-basicflow--basic-flow` (OK)
```

### Двойной prefix `group:` + `name:` для multi-component пакетов

`buildStoryOptions` собирает URL как `${category}${group?-group:}-${name}--${story}`. Если `name` уже включает имя группы (`'tooltip-tooltip'` для Tooltip в multi-pkg `@ds/tooltip`), а helpers ещё передаёт `group: 'tooltip'` — URL получает двойной `-tooltip-tooltip-`:

```
components-tooltip-tooltip-tooltip--playground  ← ❌ NOT FOUND
components-tooltip-tooltip--playground          ← ✅ OK
```

**Решение**: либо использовать `name` без префикса группы + `group`, либо `name` с префиксом + БЕЗ `group`. Не оба сразу.

## Playwright / rc-drawer / portal-анимации

### `document.getAnimations().every(playState !== 'running')` зависает на rc-drawer

rc-drawer (и некоторые другие портал-библиотеки на JS-motion) оставляют долгоживущие Web Animations со `playState='running'` — `getAnimations()`-цикл никогда не вернёт «все idle». `waitForFunction` тайм-аутит даже с фильтром `iterations === Infinity`.

**Решение**: жди стабилизации bbox видимой части компонента (`waitForStableBbox`) — это надёжный сигнал, что slide-in/out закончен.

```ts
// ❌ зависает на rc-drawer
await page.waitForFunction(() =>
  document.getAnimations().every(a => a.playState !== 'running'),
);

// ✅ ждём, пока bbox header'а перестанет меняться
import { waitForStableBbox } from '#playwright-tooling/utils';
await waitForStableBbox(getByTestId(TEST_IDS.header));
```

### Visual baselines под `SCREENSHOT_DEFAULT_OPTS` — оставлять threshold широким

CoreText (macOS) vs FreeType/Skia (CI Linux) рендерят один Inter с разным subpixel-antialiasing. Это даёт diff'ы на каждом edge каждого глифа.

`maxDiffPixelRatio: 0.15`, `threshold: 0.35` — широкие значения, **намеренные**. Реальные регрессии (изменения цвета/layout/появление-исчезновение) затрагивают тысячи пикселей и пробивают любой sub-пиксельный коридор. Не ужесточай глобально — расширяй per-test через `expect(...).toHaveScreenshot(name, { ...SCREENSHOT_DEFAULT_OPTS, maxDiffPixelRatio: 0.05 })` если конкретный snapshot стал шумным.

## Cross-package imports в spec'ах

### `import { ... } from '../../<other-pkg>/src/...'` ломает playwright-compile

Если `__test__/<C>/*.spec.ts` импортит value из соседнего пакета по относительному пути, playwright esbuild подхватывает весь дерево — включая SCSS-модули которые он не парсит → `SyntaxError: Unexpected token (1:0)` на `.module.scss`.

**Решение**: дублируй маленькие константы локально в helpers.ts с комментарием «синхронизируй с …». Или экспортируй из leaf-файла, не из `index.ts` пакета.

```ts
// ❌ тянет CSS-модули из соседнего пакета
import { segmentTestId } from '../../../segment-control/src/constants';

// ✅ локальная копия с пометкой
// Локальная копия `segmentTestId` из `@ds/segment-control/src/constants` —
// кросс-пакетный импорт в spec'ах запрещён.
export function segmentTestId(value: string | number): string {
  return `section-${value}`;
}
```

### `popover` value-reexport из `@ds/popover-private` через `src/constants.ts` ломает spec-compile

`popover/src/constants.ts` делает `export { ... } from '@ds/popover-private'` (value-reexport). Когда spec импортит `TEST_IDS` через `popover/stories/Popover/testIds.ts` → `popover/src/constants.ts` → `@ds/popover-private/src/index.ts`, esbuild тянет SCSS-модули popover-private.

**Решение**: разнеси `TEST_IDS` в `src/testIds.ts` (leaf-файл без re-export'ов), и `stories/Popover/testIds.ts` импортит оттуда напрямую.

## `import type` под `isolatedModules`

### Type-only re-export из внешних пакетов требует явный `export type`

TS-флаг `isolatedModules` (включён в `tsconfig.json`) требует `export type { Foo } from '...'` при re-export'е чисто-типовых символов. Иначе TS1205.

Это единственное допустимое место `export type`/`import type` (см. `imports-exports.md` §«Исключение»):

```ts
// ✅ — Locator/Page interfaces из @playwright/test
export { expect } from '@playwright/test';
export type { Locator, Page } from '@playwright/test';
```

Аналогично в `apps/storybook/.storybook/`:
- `import type { Preview } from '@storybook/react'`
- `import type { Decorator } from '@storybook/react'`
- `import type { StorybookConfig } from '@storybook/react-vite'`
- `import type { Brand, Theme, Density } from './components/types'` (type-only re-export цепочки)

Их нельзя превращать в обычный `import` — рантайм-импорт типа из чистого-типового модуля даст `does not provide an export named 'X'` при загрузке Storybook.

## Когда заводить новый компонент / тест

Чтобы не наступить на эти грабли:

1. **Пишешь play-step с keyboard** — Enter работает, Space нет. Не пиши Space в play (либо вынеси в Playwright spec).
2. **Пишешь play-step с rc-slider/rc-rate/etc** — используй `fireEvent.keyDown` с `keyCode/which`, не `userEvent.keyboard`.
3. **Пишешь Playwright spec с `args`** — controlled-prop (`checked`, `value`) НЕ переключается от клика; передавай uncontrolled (`defaultChecked`, `defaultValue`).
4. **Компонент имеет dom-обёртку?** Если нет (Context.Provider only) — добавляй wrapper-div в story для адресации.
5. **Tooltip/Popover/QuestionTooltip в анатомии** — `data-test-id` через args падает на floating portal; оборачивай tip/slot в `<span data-test-id={...}>`.
6. **helpers.ts STORIES** — после переименований сверяй имена с `http://localhost:6006/index.json`, не угадывай по логике PascalCase→kebab.
7. **Cross-package import в spec.ts** — нельзя. Дублируй маленькие values локально.
8. **type-only re-export из внешнего пакета** — единственный случай, когда `export type` обязателен (`isolatedModules`).

## Связанное

- [stories-standard.md](./stories-standard.md) — формат stories и play-функций.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — Playwright spec'и и helpers.
- [visual-regression-standard.md](./visual-regression-standard.md) — visual baselines и thresholds.
- [trigger-based-stories.md](./trigger-based-stories.md) — Playground портал-компонентов.
- [imports-exports.md](./imports-exports.md) — `import type` / `export type` правила.

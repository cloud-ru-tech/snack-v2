# Stories — стандарт

**Область действия:** `packages/*/stories/**/*.stories.@(ts|tsx)`.

## Принцип

Набор stories выводится из **публичного API компонента** (`constants.ts` + `types.ts`) и **осей Figma-мастера**, а не из шаблона «файл на ось / файл на состояние». Каждая ось (size, appearance, view, loading, disabled, …) существует в двух местах:

1. в `argTypes` Playground'а — как интерактивный контрол;
2. в `StoryTable` VisualMatrix — как строка/колонка для визуальной регрессии.

Отдельный файл story заводится **только тогда**, когда сценарий нельзя выразить ни одним из этих двух способов.

## Принцип минимальной достаточности

Количество сторей в пакете — **минимально достаточное**, чтобы покрыть все кейсы для просмотра и тестов. Если story можно упразднить, передав параметры в другую существующую story (через `args` Playground или строку/колонку StoryTable VisualMatrix) — она не нужна.

Алгоритм решения «нужна ли новая story»:

1. Можно ли получить этот вид, выставив `args` у Playground (включая URL-args для Playwright через `gotoStory(buildStoryOptions({ … }))`)? → story не нужна, кейс покрывается через args.
2. Можно ли добавить строку/колонку/секцию в VisualMatrix? → story не нужна, расширяем матрицу.
3. Кейс требует свой DOM/композицию/state, который не выражается ни в (1), ни в (2)? → одна story в `examples/` (если для пользователя) или `tests/` (если для play/screenshot only).
4. Дубли между `examples/` и `tests/` запрещены: если play-функция нужна на пользовательском сценарии — play пишется прямо на story из `examples/`, дублирование в `tests/` не делается.

Каждая новая story обязана проходить «Критерий обоснованности артефакта» из [complexity-tiers.md](./complexity-tiers.md) — все 3 условия. Если хотя бы одно нарушено, story не заводится; в PR-ревью таким story возвращают «closed».

## Обязательный минимум (XS–XL)

```
packages/<pkg>/stories/<ComponentName>/
├── <ComponentName>.Playground.stories.tsx    # полная meta + args + argTypes
└── <ComponentName>.VisualMatrix.stories.tsx  # StoryTable со всеми осями × состояниями
```

Этого достаточно для компонентов XS/S. Дополнительные файлы появляются только под конкретный кейс — и кладутся в `examples/` либо `tests/` (см. ниже).

## Подпапки `examples/` и `tests/`

```
stories/<ComponentName>/
├── <ComponentName>.Playground.stories.tsx
├── <ComponentName>.VisualMatrix.stories.tsx
├── examples/
│   ├── <ComponentName>.WithCounter.stories.tsx     # title: …/<Component>/Examples/WithCounter
│   ├── <ComponentName>.Polymorphic.stories.tsx     # title: …/<Component>/Examples/Polymorphic
│   └── <ComponentName>.Composition.stories.tsx     # title: …/<Component>/Examples/Composition
└── tests/
    ├── <ComponentName>.InteractionTest.stories.tsx # title: …/<Component>/Tests/Interaction
    └── <ComponentName>.Controlled.stories.tsx     # title: …/<Component>/Tests/Controlled
```

### `examples/` — сценарии для потребителя

Story в `examples/` показывает реальный сценарий API, который **нельзя** выразить ни `args` Playground'а, ни строкой/колонкой StoryTable.

**Механический критерий принадлежности к `examples/`**: содержимое story может быть скопировано потребителем в продакшн-код пакета-приложения как самостоятельный фрагмент, который продолжит работать. Если ответ «да» — `examples/`.

Типичные кейсы:

- многокомпонентная композиция (несколько компонентов рядом, демонстрирующих совместное поведение);
- slot-пресет, требующий своего DOM (`WithFooter`, `WithMedia`, `NestedDrawer`);
- режим компонента (`Controlled`/`Uncontrolled`, `Range`, `Polymorphic` с `as={Link}`);
- состояние, требующее своего react state, которое потребителю придётся писать самому (открытие/закрытие модалок, поповеров с триггером).

Story может покрываться play-функциями и screenshot'ами — но критерий принадлежности остаётся «копируемость».

### `tests/` — стори только для тестов

**Механический критерий принадлежности к `tests/`**: фрагмент не имеет смысла вне теста — он содержит `fn()`-моки callback'ов, контролируемые stub-state ради проверки фокус-менеджмента, edge-state, который в продакшне реализуется реальным backend'ом / провайдером, либо последовательность действий, важную только для assertion'а. Скопировать в продакшн-код нельзя, потому что половина — это тестовая обвязка.

Подпапка `Tests/` в сайдбаре сама отделяет такие story визуально — `fixture`-тег упразднён.

Один интеракционный сценарий компонента — один экспорт `InteractionTest`. Не разноси клик и клавиатуру на `ClickTest` + `KeyboardTest`. Объединяй через `step('click: …')`, `step('keyboard: Tab → …')`. Файл — один (`<Name>.InteractionTest.stories.tsx`), даже если внутри только клик или только клавиатура.

Если на один пользовательский сценарий из `examples/` нужно повесить play — пиши play прямо там, не дублируй story в `tests/`.

## Запрещённые файлы

Эти имена — «одна ось = один файл», то есть дубликат VisualMatrix. Заводить их нельзя:

```
❌ <Name>.Sizes.stories.tsx
❌ <Name>.Appearances.stories.tsx
❌ <Name>.Views.stories.tsx
❌ <Name>.Variants.stories.tsx
❌ <Name>.LoadingState.stories.tsx
❌ <Name>.DisabledState.stories.tsx
❌ <Name>.EmptyState.stories.tsx
❌ <Name>.WithIcon.stories.tsx / IconOnly / WithCounter (если это просто включение слота)
❌ <Name>.ClickTest.stories.tsx / KeyboardTest.stories.tsx — слиты в `InteractionTest`
```

Если появляется соблазн такой завести — расширь соответствующую секцию VisualMatrix (добавь строку/колонку/новый `StoryTable`).

Также **запрещено**:

- `tag: 'fixture'` — больше не используется. Test-стори отделяются подпапкой `tests/` и сегментом `/Tests/` в title.
- title с висящим `/Tests` или `/Examples` (без имени сценария) для обычного экспорта. Группа `Tests` / `Examples` в сайдбаре появляется только тогда, когда в соответствующей подпапке есть story.

## Формат

- **CSF3**: каждая story — объект `StoryObj<typeof Component>`. Никаких функциональных сторис CSF2.
- Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `waitFor`, `fn` из `storybook/test` (subpath ядра `storybook@10`).
- Типы не через префикс `React.*` (см. [react-types.md](./react-types.md)), импорты/экспорты без `type` (см. [imports-exports.md](./imports-exports.md)).
- **Не** используй блоки `parameters.docs.description.component` / `parameters.docs.description.story`. Описания компонента живут в `docs/*.mdx` и `README.md`, а не внутри story.

## Title — nesting

В сайдбаре Storybook компоненты одного пакета должны лежать рядом как дети одного узла. Правила:

- Пакет с **одним** публичным компонентом (например, `@ds/avatar`, `@ds/link`): `title: 'Components/<ComponentName>'`.
- Пакет с **двумя и более** публичными компонентами (например, `@ds/button` с `Button` + `ButtonGroup`, `@ds/toggles` с `Checkbox`/`Radio`/`Switch`/`Favourite`/`ToggleGroup`): `title: 'Components/<PackageDisplayName>/<ComponentName>'`, где `<PackageDisplayName>` — PascalCase от kebab-case имени пакета без скоупа: `packages/button/` → `Button`, `packages/toggles/` → `Toggles`, `packages/tag/` → `Tag`.

Playground/VisualMatrix файлов одного компонента имеют **один и тот же** title (без суффикса).

Stories из подпапок добавляют сегмент:

- `examples/<Name>.<Scenario>.stories.tsx` → `title: 'Components/<…>/<Component>/Examples/<Scenario>'`
- `tests/<Name>.<Scenario>.stories.tsx` → `title: 'Components/<…>/<Component>/Tests/<Scenario>'`

Последний сегмент — короткое PascalCase имя сценария **без** префикса компонента: `Interaction`, `Controlled`, `WithFooter`, `Polymorphic`.

Примеры:

| Пакет | Компонент | Story-файл | Title |
|-------|-----------|------------|-------|
| `@ds/avatar` | `Avatar` | `Avatar.Playground.stories.tsx` | `Components/Avatar` |
| `@ds/avatar` | `Avatar` | `examples/Avatar.WithImage.stories.tsx` | `Components/Avatar/Examples/WithImage` |
| `@ds/button` | `Button` | `Button.VisualMatrix.stories.tsx` | `Components/Button/Button` |
| `@ds/button` | `Button` | `tests/Button.InteractionTest.stories.tsx` | `Components/Button/Button/Tests/Interaction` |
| `@ds/toggles` | `Checkbox` | `tests/Checkbox.InteractionTest.stories.tsx` | `Components/Toggles/Checkbox/Tests/Interaction` |

**Группировка сайдбара — автоматическая.** В файле title остаётся `Components/<…>`. Доменно-категорийную группировку сайдбара (`Snack/<Категория>/…`, как в доке) Storybook проставляет сам из `apps/docs/src/config/categories.ts` — `Snack` и категорию в title руками **не** пишут. Story ID выводится из исходного `Components/<…>`-title (не из сайдбарного label) и от группировки не меняется.

**Последствие для story IDs**. Storybook генерит id из title kebab-case'ом. После переноса story в `examples/` или `tests/` id изменится:

- `Components/Button/Button` + `Playground` → `components-button-button--playground`
- `Components/Button/Button/Tests/Interaction` + `InteractionTest` → `components-button-button-tests-interaction--interaction-test`

При переезде stories **обязательно** обновить story IDs в `packages/<pkg>/__test__/<Component>/helpers.ts` — иначе E2E-тесты пойдут на старые URL и получат 404.

## Структура папок

```
packages/<pkg>/stories/
└── <ComponentName>/
    ├── <ComponentName>.Playground.stories.tsx    # обязателен
    ├── <ComponentName>.VisualMatrix.stories.tsx  # обязателен
    ├── examples/
    │   └── <ComponentName>.<Scenario>.stories.tsx
    └── tests/
        └── <ComponentName>.<Scenario>.stories.tsx
```

Имя файла: `ComponentName.StoryName.stories.tsx`. PascalCase, префикс компонента обязателен. Никаких нумераций/kebab-case.

`examples/` и `tests/` появляются **только если в них что-то есть**. Пустые подпапки не создаём.

## data-test-id — обязательный атрибут на публичных элементах

Каждая story — потенциальная точка для E2E и play-функций. Чтобы селекторы не ломались при любом косметическом изменении (роль, текст, aria-label), **все публичные интерактивные/визуальные элементы** story должны получать стабильный `data-test-id` через пропс компонента.

**Как задавать**:

- В `args` Playground'а — как дефолтное значение:
  ```ts
  args: {
    label: 'Button',
    'data-test-id': 'button', // kebab-case от ComponentName
  },
  ```
- В examples/ и tests/ stories — явным пропсом либо через `args`. Для композиций нескольких инстансов — уникальный id на каждый слот (`button-group-primary`, `button-group-secondary`).

**Naming convention**: kebab-case имени компонента. Составные id для слотов: `<component>-<slot>` (`button-group-primary`, `drawer-close-button`). Для вложенных натив-input'ов (Checkbox/Radio/Switch) — базовый id на корень + суффикс `-native-input` на `<input>` (зафиксирован в `NATIVE_INPUT_SUFFIX`).

**Хардкод id внутри компонента — только через экспортируемую константу `TEST_IDS`**. Если реализация компонента ставит `data-test-id` на внутренние слоты (вложенные кнопки, icons, описания, тултипы — всё, что не получает id от потребителя через spread `...rest`), эти строки **обязаны** жить в публичной константе `TEST_IDS` в `packages/<pkg>/src/constants.ts` и реэкспортироваться через `src/index.ts`. Инлайн-литералы `data-test-id='foo__bar'` внутри `.tsx` запрещены.

```ts
// packages/<pkg>/src/constants.ts
export const TEST_IDS = {
  root: 'switch-row',
  switch: 'switch-row__switch',
  title: 'switch-row__title',
  titleTooltip: 'switch-row__title-tooltip',
  description: 'switch-row__description',
  toggleTooltip: 'switch-row__toggle-tooltip',
} as const
```

```tsx
// packages/<pkg>/src/components/SwitchRow/SwitchRow.tsx
import { TEST_IDS } from '../../constants'

<Switch data-test-id={TEST_IDS.switch} ... />
```

Почему так:

- Потребитель из app-слоя пишет e2e/integration-тесты против слотов компонента, не зная его внутренней разметки. Константа в публичном API даёт ему стабильный селектор и защиту от переименований.
- Stories и `__test__/<Component>/helpers.ts` берут те же строки из одного источника. Рассинхрон между компонентом и тестами физически невозможен.
- Видно из публичного API, какие слоты вообще существуют — это документация.

**DRY — повторяющиеся id в stories выносить в `testIds.ts` единым объектом**. Stories-level id (те, которые ставит story, а не сам компонент), используемые в 2+ файлах stories одного компонента или в 2+ экспортах одного файла, выносятся в `packages/<pkg>/stories/testIds.ts` (для пакета с несколькими публичными компонентами) **или** `packages/<pkg>/stories/<ComponentName>/testIds.ts` (для одно-компонентного пакета). Формат — **один объект** `TEST_IDS` со вложенной структурой по компонентам/слотам, а не россыпь отдельных `<NAME>_TEST_ID` констант. Это даёт IDE-autocomplete (`TEST_IDS.<componentName>.<slot>`), один источник истины и компактный экспорт.

```ts
// packages/<pkg>/stories/testIds.ts (multi-component package)
export const TEST_IDS = {
  <componentA>: { root: '<component-a>', nativeInput: '<component-a>-native-input' },
  <componentB>: { root: '<component-b>' },
  // …по одному ключу на каждый публичный компонент пакета
} as const
```

```ts
// packages/<pkg>/stories/<ComponentName>/testIds.ts (single-component package)
export const TEST_IDS = {
  root: 'switch-row',
  switch: 'switch-row__switch',
  titleTooltip: 'switch-row__title-tooltip',
} as const
```

```ts
// packages/<pkg>/stories/<Name>/<Name>.Playground.stories.tsx
import { TEST_IDS } from '../testIds' // multi-component: stories/testIds.ts
// или
import { TEST_IDS } from './testIds'    // single-component: stories/<Name>/testIds.ts

args: { 'data-test-id': TEST_IDS.<componentName>.root }
// или
args: { 'data-test-id': TEST_IDS.root }
```

Stories из подпапок (`examples/`, `tests/`) импортируют testIds родительского уровня: `import { TEST_IDS } from '../../testIds'` (multi) или `from '../testIds'` (single).

Соглашения для `testIds.ts`:

- Единственный экспорт — `export const TEST_IDS = { ... } as const`. Не заводить набор отдельных `<NAME>_TEST_ID` const'ов.
- Если у компонента есть только один публичный id (root) — это `TEST_IDS.root` (single-component) или `TEST_IDS.<componentName>.root` (multi).
- Значения id — kebab-case строки (как в DOM), ключи — camelCase.
- E2E `__test__/<Component>/helpers.ts` импортирует **`TEST_IDS` из stories** — `from '../../stories/testIds'` или соответствующего подпути. Не из entry `@ds/<pkg>` (entry тянет за собой CSS-модули, что несовместимо с playwright-compile). Если пакет публикует `TEST_IDS` из `src/constants.ts` (когда компонент сам ставит id на свои слоты — см. ниже про component-level TEST_IDS), helpers тоже могут импортить оттуда `from '../../src/constants'`.
- Id, который используется в **одной** story (и нигде больше) и не присутствует в `TEST_IDS` — можно оставить инлайн. Переносим только повторяющиеся.

При миграции пакета с отдельных `<NAME>_TEST_ID` const'ов на единый `TEST_IDS` — переписать все упоминания в specs сразу (sed-replace, ~10 минут на пакет). Не оставлять legacy-aliases в helpers как «переходный мост» — это удваивает поверхность и снова возвращает россыпь отдельных констант.

**Требования к компоненту**: корневой элемент должен проксировать `data-test-id` из пропсов (обычно через spread `...rest`). Если компонент не поддерживает — это bug компонента, а не story.

**Как использовать в play-функциях**: только `getByTestId`. Запрещено `getByRole`, `getByText`, `getByLabelText`, `getByPlaceholderText` — они привязаны к локализации/структуре DOM и перестают работать при первых же изменениях. Исключение единственное: когда test-id физически не может существовать (например, проверка `aria-disabled` на anchor'е без собственного корневого элемента) — комментарием в play объясни, почему `role` здесь единственная опция.

```ts
// ✅ Хорошо
export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: { onClick: fn(), 'data-test-id': 'button' },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByTestId('button')
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

// ❌ Плохо — getByRole перестаёт работать при смене `as='a'` или при выставлении role="menuitem"
play: async ({ canvasElement }) => {
  await expect(within(canvasElement).getByRole('button')).toBeVisible()
}
```

**Глобальная конфигурация**. Репо использует `data-test-id` (с дефисом) вместо дефолтного testing-library `data-testid` — см. `TEST_ID_ATTRIBUTE` в `#playwright-tooling/constants/common`. В Storybook preview настроен `configure({ testIdAttribute: 'data-test-id' })`, иначе `getByTestId` ищет `data-testid` и не находит наш атрибут. Не удаляй эту конфигурацию.

**Общие константы для visual.spec'ов**: `STORYBOOK_ROOT_SELECTOR` (`'#storybook-root'`) и `SCREENSHOT_DEFAULT_OPTS` (`{ animations: 'disabled', caret: 'hide' }`) живут в `#playwright-tooling/constants/common` и импортятся всеми visual-спеками. Не дублируй их локально в `packages/<pkg>/__test__/<C>/helpers.ts` под именами `*_ROOT_SELECTOR` / `*_SCREENSHOT_OPTS` и не пиши инлайн-литералы `'#storybook-root'` / `{ animations: 'disabled', caret: 'hide' }` в spec-файлах.

## Playground (обязателен)

- Имя экспорта: `Playground`.
- Содержит `meta` с `title`, `component`, `parameters`, `args`. `argTypes` — **только при необходимости** (см. ниже).
- **`parameters.layout: 'fullscreen'`** — обязательно. `<DemoPage>` сама центрирует содержимое; `'centered'` ломает её сетку.
- **Render обязательно оборачивает компонент в `<DemoPage>` / `<DemoPanel>`** из `#storybook/components` — это сквозная конвенция всех stories (Playground, examples, tests), не только trigger-based. Скелет см. в §«Demo-host» ниже. URL-args (`gotoStory(buildStoryOptions(args))`) по-прежнему передаются 1:1 — `render: args => <DemoPage>...<Comp {...args} /></DemoPage>` контракт не нарушает. Кастомный `render` с локальным `useState` поверх DemoPage — только если в API есть пара controlled/uncontrolled и без локального state Playground не работает.
- **`argTypes` строятся автоматически** из TS-типов + JSDoc через `react-docgen-typescript` (см. `apps/storybook/.storybook/main.ts`). Все публичные пропсы видны в Controls с правильными контролами и описанием **без** ручного перечисления. Детали и исключения — в [storybook-args-conventions.md](./storybook-args-conventions.md).
- Прописывай `argTypes.<prop>` в meta **только** в этих случаях: `mapping` (slot/ReactNode), `table.disable` (скрыть проп), `if:` (условная видимость), принудительный override контрола, `options` для нерасрезолвенных union'ов. **Не пиши `description` руками** — он живёт в JSDoc на пропе.
- Если в API компонента есть пара `value`/`defaultValue` (или `checked`/`defaultChecked`) — оставь в args **только** `defaultValue`/`defaultChecked`, а сами `value`/`checked` спрячь через `argTypes: { value: { table: { disable: true } } }`. URL-args по-прежнему достанут эти пропсы для тестов; в панели не будет «контрол ничего не делает».
- **Парные/смежные пропсы заполнять в `args` оба**. Если у компонента есть смысловая пара (`content` + `valueToCopy`, `label` + `secondaryLabel`, `title` + `description`, `value` + `formattedValue` и т.д.) — обоим даём осмысленный дефолт, иначе фича пропа невидима из Playground'а. Дефолтное значение должно показывать, чем второй проп отличается от первого, а не дублировать.
- Теги: `['dev', 'test']`.
- `play` — минимальный `toBeVisible`.

```tsx
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'
import { APPEARANCE, Component, SIZE } from '@ds/<pkg>'

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: { layout: 'centered' },
  args: { size: SIZE.M, appearance: APPEARANCE.Primary },
  // argTypes не нужны: docgen выведет controls + descriptions из типов и JSDoc.
}
export default meta
type Story = StoryObj<typeof Component>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('component')).toBeVisible()
  },
}
```

Playground — источник истины для **набора `args`** (дефолтные значения). Описания и control-типы — из TS-типов и JSDoc, эти источники едины между Storybook, IDE, `docs/props.json` и автогенерируемым README.

## VisualMatrix (обязателен)

- Имя экспорта: `VisualMatrix`.
- Теги: `['test', 'dev']`.
- **Обязательно** `parameters: { controls: { disable: true } }` на самой story. VisualMatrix рендерит фиксированную сетку через `render` и `args` не использует — пустая панель Controls сбоку только сбивает.
- **Только** `StoryTable` из `#storybook/components`. Flex-контейнер для ряда вариантов — только если вариантов ≤ 3 и ось одна; в этом случае предпочитай всё равно `StoryTable`.
- Покрывает **все** публичные оси из `constants.ts` × состояния (`disabled`, `loading`, `empty`). Каждая ось Figma-мастера — строка либо колонка.
- Не декартово произведение всех комбинаций. Ключевая выборка; оси, которые не комбинируются, — разными `StoryTable` секциями под общим wrapper'ом.

```tsx
import { StoryTable } from '#storybook/components'

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const
const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Critical] as const
const keyStates = ['default', 'disabled', 'loading'] as const

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle="Appearance × Size"
        firstColumnHeader="Appearance"
        columnHeaders={keySizes.map((s) => s.toUpperCase())}
        rows={keyAppearances.map((appearance) => ({
          variantLabel: appearance,
          cells: keySizes.map((size) => (
            <Component key={size} size={size} appearance={appearance} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle="State × Appearance"
        firstColumnHeader="State"
        columnHeaders={keyAppearances.map((a) => a.toUpperCase())}
        rows={keyStates.map((state) => ({
          variantLabel: state,
          cells: keyAppearances.map((appearance) => (
            <Component
              key={appearance}
              appearance={appearance}
              disabled={state === 'disabled'}
              loading={state === 'loading'}
            />
          )),
        }))}
      />
    </div>
  ),
}
```

Wrapper `<div className={styles.grid}>` — только класс из `styles.module.scss` (`display: grid; gap: 1.5rem`). Inline-стили запрещены.

**Поведение, зависящее от размеров контейнера**. `StoryTable` подстраивается под контент. Если строка/колонка матрицы демонстрирует поведение, которое проявляется **только** при ограниченном пространстве (truncate, ellipsis, wrap, многострочность, перенос, скрытие части UI, `min-width: 0`-поведение, адаптивные брейкпоинты внутри компонента) — ячейку оборачиваем в контейнер с явно заданным размером из `styles.module.scss`. Иначе ячейка растянется под контент и кейс визуально не отличается от «обычного». Конкретный размер выбирай по компоненту: достаточно, чтобы сработало демонстрируемое поведение, и не больше.

## Examples (`examples/`) — формат

- Story лежит в `stories/<ComponentName>/examples/<Name>.<Scenario>.stories.tsx`.
- В `meta.title` — `Components/<…>/<Component>/Examples/<Scenario>` (сегмент `Examples/<Scenario>` появляется автоматически из правила nesting).
- Имя экспорта совпадает со сценарием в title: `WithFooter`, `Polymorphic`, `Controlled`.
- Теги: `['dev', 'test']` (для пользователя в сайдбаре + опц. в test runner).
- Если на сценарий нужна play-функция — пиши её прямо здесь, не дублируй story в `tests/`.
- Если сценарий требует state — `render` с локальным `useState` допустим.
- `meta.component` обязателен (для PropsTable / consistent meta).

## Tests (`tests/`) — формат

- Story лежит в `stories/<ComponentName>/tests/<Name>.<Scenario>.stories.tsx`.
- В `meta.title` — `Components/<…>/<Component>/Tests/<Scenario>`.
- Теги: `['test', 'dev']` — `dev` оставляем, чтобы story была кликабельна в Storybook (подпапка `Tests/` сама сигнализирует «это тест»). Tag `fixture` **не использовать**.
- Имя файла и экспорта совпадает со сценарием: `<Name>.InteractionTest.stories.tsx` + `export const InteractionTest`. Клик и клавиатура объединяются в один экспорт через `step()`. Отдельные `ClickTest` / `KeyboardTest` запрещены.
- `parameters: { layout: 'fullscreen', controls: { disable: true } }` в `meta` — args фиксированы, панель Controls не нужна; `layout: 'fullscreen'` обязателен, потому что `<DemoPage>` сама центрирует содержимое и `layout: 'centered'` ломает её сетку (двойное центрирование).
- **Render обязательно оборачивает story в `<DemoPage>` / `<DemoPanel>`** из `#storybook/components` (см. ниже «Demo-host»). Конвенция действует для **всех** Tests-stories (не только trigger-based) — общая обвязка делает сцену тестов читаемой в Storybook'е, даёт место под `<DemoTitle>` / `<DemoHint>` и нормализует позиционирование между пакетами.
- Для мока callback — `fn()` из `storybook/test`, передавать через `args`.
- Заводи test-story **только** если assertion нельзя поставить в play Playground'а: специфичная последовательность действий, фокус-менеджмент, long-running await, контролируемый state.

```tsx
// stories/Component/tests/Component.InteractionTest.stories.tsx
import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components'

const meta: Meta<typeof Component> = {
  title: 'Components/Component/Tests/Interaction',
  component: Component,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onClick: fn(), 'data-test-id': 'component' },
}
export default meta

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Что проверяет play-функция (одно предложение).</DemoHint>
        <DemoActions align='center'>
          <Component {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const root = canvas.getByTestId('component')

    await step('click: triggers onClick once', async () => {
      await userEvent.click(root)
      expect(args.onClick).toHaveBeenCalledTimes(1)
    })

    await step('keyboard: Tab focuses the root', async () => {
      root.blur()
      await userEvent.tab()
      await expect(root).toHaveFocus()
    })

    await step('keyboard: Enter triggers onClick again', async () => {
      await userEvent.keyboard('{Enter}')
      expect(args.onClick).toHaveBeenCalledTimes(2)
    })
  },
}
```

### Demo-host: `<DemoPage>` / `<DemoPanel>` — обязательны для Tests

Импорт: `import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, DemoWarning } from '#storybook/components'`.

| Слот | Назначение |
|------|------------|
| `<DemoPage>` | Корневой контейнер, центрирует контент во фрейме Storybook'а. Совместим только с `layout: 'fullscreen'`. |
| `<DemoPanel>` | Карточка-host для одной сцены. Атрибут `width: 'narrow' \| 'default' \| 'wide'`. |
| `<DemoTitle>` | Заголовок сцены — короткое имя story / её сути. |
| `<DemoHint>` | Одно предложение про сцену: что проверяет play, что должно произойти при действии. |
| `<DemoActions>` | Слот для самого компонента. `align: 'start' \| 'center'`. |
| `<DemoWarning>` | Опционально — предупреждение о требованиях окружения (e.g. «требуется `PortalContextProvider` снаружи»). |

Не клади голый компонент в корень render-функции test-story без `<DemoPage>`-обвязки. Не используй `layout: 'centered'` для Tests — он конфликтует с собственным центрированием `<DemoPage>`. Для trigger-based компонентов (modal/drawer/popover/…) дополнительные правила — в [trigger-based-stories.md](./trigger-based-stories.md).

Play-функции исполняются в синтетической среде (`storybook/test`). Часть низкоуровневых browser-API не симулируется в полном объёме, а сторонние библиотеки могут читать события не так, как ожидает testing-library. Ассертируй то, что обещает **твой публичный API**, не нативные browser side-effects: пиши play вокруг callback'ов из `args`, focus-management по своим `data-test-id`, и т.п. Если play стабильно падает на одном и том же шаге keyboard/click, который «должен работать по природе браузера», — вынеси его в Playwright (там реальная среда), а в play оставь то, что гарантирует компонент. Каталог типовых случаев — в [test-environment-pitfalls.md](./test-environment-pitfalls.md).

URL-args, передаваемые в play через `gotoStory(buildStoryOptions({ ... }))`, действуют как **controlled** props — пользовательский click не меняет их. Если play должен переключить состояние, передавай uncontrolled-эквивалент (`defaultValue`/`defaultChecked`/...), а не controlled.

## Общие компоненты `#storybook/components`

| Экспорт          | Назначение                                           |
| ---------------- | ---------------------------------------------------- |
| `StoryTable`     | Таблица для VisualMatrix (дизайн-токены, единый вид) |
| `StoryWrapper`   | Общая обёртка story — подключена автоматически через `preview.tsx` decorator, вручную не импортировать |

Импорт: `import { StoryTable } from '#storybook/components'`.

## Inline-стили запрещены

В stories **нельзя** использовать проп `style={{ ... }}` — ни на wrapper'ах, ни на компонентах, ни на demo-разметке. Причины:

- Inline-стили обходят дизайн-токены (`@ds/figma-variables`) и дают визуальный шум в visual regression.
- В PR-ревью теряется контроль над spacing/layout.
- Любой лейаут stories должен быть выразим через `StoryTable` либо через класс из `styles.module.scss` рядом со story.

```tsx
// ❌ Плохо
<div style={{ display: 'flex', gap: 16 }}>
  <Button size='s' />
  <Button size='m' />
</div>

// ✅ Хорошо — класс из styles.module.scss рядом со story
import styles from './Button.VisualMatrix.module.scss'

<div className={styles.grid}>
  <StoryTable ... />
  <StoryTable ... />
</div>
```

Допустимое исключение: `style` передаётся **только** через публичный проп компонента, когда этот проп часть его API и демонстрируется в story.

## Tags — семантика

| Tag       | Что делает                                                                                  |
| --------- | ------------------------------------------------------------------------------------------- |
| `dev`     | Показывать в sidebar Storybook                                                              |
| `test`    | Включать в Test Runner / Playwright                                                         |
| `no-a11y` | Помечает story как исключённую из a11y-прогона. На статичных `VisualMatrix` (матрица состояний без интерактивного фокуса) — a11y проверяется на `Playground`/`InteractionTest`. Сейчас тег **инертен** (`@storybook/addon-a11y` не установлен), но проставляется заранее как декларация намерения и активируется автоматически при подключении аддона. |

Тег `autodocs` не используем: автодокументация отключена, описания живут в `docs/*.mdx`.

Тег `fixture` **больше не используется** — test-стори отделяются раскладкой `tests/` и сегментом `/Tests/` в title.

Типовые комбинации (порядок тегов внутри массива на работу не влияет, существующий разнобой — стилистический):

- Playground: `['dev', 'test']`
- VisualMatrix: `['test', 'dev']` (опц. `'no-a11y'` — статичная матрица без интерактивного фокуса)
- Examples/* (включая `Controlled`, `Polymorphic`, `Composition`): `['dev', 'test']`
- Tests/* (включая `InteractionTest`): `['test', 'dev']`

## Naming

- Английский PascalCase. `Playground`, `VisualMatrix`, `Polymorphic`, `InteractionTest`, `Composition`, `Controlled`, `WithFooter`.
- Запрещены: `Basic`, `Default`, `Example`, `Story1`, русские названия, имена «на ось» (см. раздел «Запрещённые файлы»).

## Чего НЕ делать

- Заводить файлы на одну ось / одно состояние (см. «Запрещённые файлы»).
- Разносить интеракцию на `ClickTest` + `KeyboardTest`. Один экспорт `InteractionTest` со step'ами.
- Класть scenario / interaction / composition stories в корень `stories/<Name>/`. Только в `examples/` или `tests/`.
- Использовать тег `fixture`.
- Делать висящий `/Tests` или `/Examples` в title без сценария.
- Дублировать одну и ту же story между `examples/` и `tests/`.
- Забывать `parameters: { controls: { disable: true } }` в VisualMatrix и `InteractionTest`.
- Класть голый компонент в render Tests-story без обвязки `<DemoPage>` / `<DemoPanel>`. Обязательно для всех Tests, не только trigger-based.
- Использовать `layout: 'centered'` в Tests-story — конфликтует с центрированием `<DemoPage>`. Только `layout: 'fullscreen'`.
- Использовать `getByRole`/`getByText`/`getByLabelText`/`getByPlaceholderText` в play-функциях. Только `getByTestId`.
- Забывать `data-test-id` в `args` Playground'а и use-case stories.
- Пустых `export const X: Story = {}`.
- Смешивать Playground с визуальными матрицами в одной story.
- Дублировать сценарии (`WithImage` + `ImageFallback` — объединить).
- Выводить все декартовы комбинации в VisualMatrix. Ключевая выборка.
- Забывать `export default meta` в каждом файле.
- Добавлять `parameters.docs.description.*` и тег `autodocs`.
- Использовать inline-стили `style={{ ... }}` в разметке stories.

## Чеклист перед коммитом story

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.


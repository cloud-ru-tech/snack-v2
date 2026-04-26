# Stories — стандарт

**Область действия:** `packages/*/stories/**/*.stories.@(ts|tsx)`. Правило действует всегда.

## Принцип

Набор stories выводится из **публичного API компонента** (`constants.ts` + `types.ts`) и **осей Figma-мастера**, а не из шаблона «файл на ось / файл на состояние». Любая ось (size, appearance, view, loading, disabled, …) существует в двух местах:

1. в `argTypes` Playground-а — как интерактивный контрол;
2. в `StoryTable` VisualMatrix — как строка/колонка для визуальной регрессии.

Отдельный файл story заводится **только тогда**, когда сценарий нельзя выразить ни одним из этих двух способов.

## Обязательный минимум (XS–XL)

```
packages/<pkg>/stories/<ComponentName>/
├── <ComponentName>.Playground.stories.tsx    # полная meta + args + argTypes
└── <ComponentName>.VisualMatrix.stories.tsx  # StoryTable со всеми осями × состояниями
```

Этого достаточно для компонентов XS/S. Дополнительные файлы появляются только под конкретный кейс (см. ниже).

## Когда заводить дополнительный файл

Разрешено, если сценарий удовлетворяет **всем** условиям:

- Его нельзя выразить изменением `args` Playground-а (без custom `render`).
- Его нельзя уложить в строку/колонку существующего `StoryTable` в VisualMatrix (он про композицию нескольких компонентов рядом, про полиморфизм, про специфический play).
- Он приносит новое покрытие: новое взаимодействие, новый DOM, новую роль/ARIA.

Оправданные доп. файлы:

| Файл | Когда |
|------|-------|
| `<Name>.Polymorphic.stories.tsx` | У компонента есть `as` prop (`as='a'`, `as={Link}`) |
| `<Name>.ClickTest.stories.tsx` | Интеракционный тест с `fn()` в `args` и `play` |
| `<Name>.KeyboardTest.stories.tsx` | Клавиатурный сценарий (Tab → Enter, Arrow-нав) |
| `<Name>.Composition.stories.tsx` | Несколько компонентов рядом, демонстрирующих совместное поведение |
| `<Name>.<Scenario>.stories.tsx` | L/XL: `SortableByName`, `FilteredByCategory`, `PaginatedPage2` — stateful-сценарии |

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
❌ <Name>.WithIcon.stories.tsx / IconOnly / WithCounter
```

Если появляется соблазн такой завести — расширь соответствующую секцию VisualMatrix (добавь строку/колонку/новый `StoryTable`).

## Формат

- **CSF3**: каждая story — объект `StoryObj<typeof Component>`. Никаких функциональных сторис CSF2.
- Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `waitFor`, `fn` из `storybook/test` (subpath ядра `storybook@10`).
- Типы не через префикс `React.*` (см. [react-types.md](./react-types.md)), импорты/экспорты без `type` (см. [imports-exports.md](./imports-exports.md)).
- **Не** используй блоки `parameters.docs.description.component` / `parameters.docs.description.story`. Описания компонента живут в `docs/*.mdx` и `README.md`, а не внутри story.

## Title — nesting по пакету

В сайдбаре Storybook компоненты одного пакета должны лежать рядом как дети одного узла. Правило:

- Пакет с **одним** публичным компонентом (например, `@ds/avatar`, `@ds/link`): `title: 'Components/<ComponentName>'`.
- Пакет с **двумя и более** публичными компонентами (например, `@ds/button` с `Button` + `ButtonGroup`, `@ds/toggles` с `Checkbox`/`Radio`/`Switch`/`Favourite`/`ToggleGroup`): `title: 'Components/<PackageDisplayName>/<ComponentName>'`, где `<PackageDisplayName>` — PascalCase от kebab-case имени пакета без скоупа: `packages/button/` → `Button`, `packages/toggles/` → `Toggles`, `packages/tag/` → `Tag`.

Во всех story-файлах одного компонента `title` одинаковый.

Примеры:

| Пакет | Публичные компоненты | Titles |
|-------|----------------------|--------|
| `@ds/avatar` | `Avatar` | `Components/Avatar` |
| `@ds/button` | `Button`, `ButtonGroup` | `Components/Button/Button`, `Components/Button/ButtonGroup` |
| `@ds/toggles` | `Checkbox`, `Radio`, `Switch`, `Favourite`, `ToggleGroup` | `Components/Toggles/Checkbox`, `Components/Toggles/Radio`, … |
| `@ds/skeleton` | `Skeleton`, `SkeletonText`, `WithSkeleton` | `Components/Skeleton/Skeleton`, `Components/Skeleton/SkeletonText`, `Components/Skeleton/WithSkeleton` |

**Последствие для story IDs**. Storybook генерит id из title kebab-case'ом:

- `Components/Button/ButtonGroup` → id начинается с `components-button-buttongroup--<story>`.
- `Components/Toggles/Checkbox` → `components-toggles-checkbox--<story>`.

При переходе пакета на nesting **обязательно** обновить story IDs в `packages/<pkg>/__test__/<Component>/helpers.ts` — иначе E2E-тесты будут ходить на старые URL'ы и 404'иться.

## Структура папок

```
packages/<pkg>/stories/
└── <ComponentName>/
    ├── <ComponentName>.Playground.stories.tsx    # обязателен
    ├── <ComponentName>.VisualMatrix.stories.tsx  # обязателен
    └── <ComponentName>.<ExtraCase>.stories.tsx   # по правилам выше, если нужен
```

Имя файла: `ComponentName.StoryName.stories.tsx`. PascalCase, префикс компонента обязателен. Никаких нумераций/kebab-case.

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
- В специализированных use-case stories (Polymorphic, ClickTest, Composition) — явным пропсом либо через `args`. Для композиций нескольких инстансов — уникальный id на каждый слот (`button-group-primary`, `button-group-secondary`).

**Naming convention**: kebab-case имени компонента. Составные id для слотов: `<component>-<slot>` (`button-group-primary`, `drawer-close-button`). Для вложенных натив-input'ов (Checkbox/Radio/Switch) — базовый id на корень + суффикс `-native-input` на `<input>` (уже зафиксирован в `NATIVE_INPUT_SUFFIX`).

**Хардкод id внутри компонента — только через экспортируемую константу `TEST_IDS`**. Если реализация компонента ставит `data-test-id` на внутренние слоты (вложенные кнопки, icons, описания, тултипы — всё, что не получает id от потребителя через spread `...rest`), эти строки **обязаны** жить в публичной константе `TEST_IDS` в `packages/<pkg>/src/constants.ts` и реэкспортироваться через `src/index.ts`. Инлайн-литералы `data-test-id='foo__bar'` внутри `.tsx` запрещены.

```ts
// packages/<pkg>/src/constants.ts
export const TEST_IDS = {
  root: 'switch-row',                 // для справки / дефолтных args
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

**DRY — повторяющиеся id в stories выносить в `testIds.ts`**. Stories-level id (те, которые ставит story, а не сам компонент), используемые в 2+ файлах stories одного компонента или в 2+ экспортах одного файла, выносятся в `packages/<pkg>/stories/<ComponentName>/testIds.ts`. Если stories-level id совпадает с `TEST_IDS.root` из пакета — реэкспортируй из пакета, не дублируй строку:

```ts
// packages/<pkg>/stories/<ComponentName>/testIds.ts
import { TEST_IDS } from '@ds/<pkg>'

export const SWITCH_ROW_TEST_ID = TEST_IDS.root
export const SWITCH_ROW_SWITCH_TEST_ID = TEST_IDS.switch
```

```ts
// packages/<pkg>/stories/<Name>/<Name>.Playground.stories.tsx
import { SWITCH_ROW_TEST_ID } from './testIds'

args: { 'data-test-id': SWITCH_ROW_TEST_ID }
```

Соглашения для `testIds.ts`:

- Константы `SCREAMING_SNAKE_CASE`, суффикс `_TEST_ID`.
- Одни и те же имена констант используются и в stories, и в play-функциях (`getByTestId(BUTTON_TEST_ID)`).
- E2E `__test__/<Component>/helpers.ts` импортирует **`TEST_IDS` напрямую из исходников пакета** — `from '../../src/constants'`, не из entry `@ds/<pkg>`. Entry тянет CSS-модули, которые ломают ts-node / playwright-compile в e2e-процессе. Stories грузятся через storybook-бандлер, поэтому импорт entry `@ds/<pkg>` там ок.
- Id, который используется в **одной** story (и нигде больше) и не присутствует в `TEST_IDS` пакета — можно оставить инлайн. Переносим только повторяющиеся.

**Требования к компоненту**: корневой элемент должен проксировать `data-test-id` из пропсов (обычно через spread `...rest`). Если компонент не поддерживает — это bug компонента, а не story.

**Как использовать в play-функциях**: только `getByTestId`. Запрещено `getByRole`, `getByText`, `getByLabelText`, `getByPlaceholderText` — они привязаны к локализации/структуре DOM и ломаются при первых же изменениях. Исключение единственное: когда test-id физически не может существовать (например, проверка, что `aria-disabled` выставлен на anchor'е без собственного корневого элемента) — тогда комментарием в play объясни, почему `role` здесь единственная опция.

```ts
// ✅ Хорошо
export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onClick: fn(), 'data-test-id': 'button' },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByTestId('button')
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

// ❌ Плохо — getByRole ломается при смене `as='a'` или при выставлении role="menuitem"
play: async ({ canvasElement }) => {
  await expect(within(canvasElement).getByRole('button')).toBeVisible()
}
```

**Глобальная конфигурация**. Репо использует `data-test-id` (с дефисом) вместо дефолтного testing-library `data-testid` — см. `TEST_ID_ATTRIBUTE` в `playwright/constants/common.ts`. В Storybook preview настроен `configure({ testIdAttribute: 'data-test-id' })`, иначе `getByTestId` ищет `data-testid` и не находит наш атрибут. Не удаляй эту конфигурацию.

## Playground (обязателен)

- Имя экспорта: `Playground`.
- Содержит **полную** `meta` с `title`, `component`, `parameters`, `args`, `argTypes` — **все публичные props доступны через controls**.
- Без кастомного `render`.
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
  argTypes: {
    size: { control: 'select', options: Object.values(SIZE) },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
  },
}
export default meta
type Story = StoryObj<typeof Component>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('...')).toBeVisible()
  },
}
```

Playground — **единственный** источник истины для набора пропсов. Никакие доп. файлы не перечисляют `argTypes` заново.

## VisualMatrix (обязателен)

- Имя экспорта: `VisualMatrix`.
- Теги: `['test', 'dev']`.
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

## Test stories

- Теги: `['test', 'dev']` — скрываются из sidebar Test Runner-ом.
- Используют `play` с `step()` для группировки.
- Для мока callback — `fn()` из `storybook/test`, прокидывать через `args`.
- Отдельный файл заводится **только** если assertion нельзя поставить в play Playground-а (специфичная последовательность действий, фокус-менеджмент, long-running await).

```tsx
export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onClick: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('Click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })
    await step('onClick called once', async () => {
      expect(args.onClick).toHaveBeenCalledTimes(1)
    })
  },
}
```

## Общие компоненты `#storybook/components`

| Экспорт          | Назначение                                           |
| ---------------- | ---------------------------------------------------- |
| `StoryTable`     | Таблица для VisualMatrix (дизайн-токены, единый вид) |
| `StoryWrapper`   | Общая обёртка story — подключена автоматически через `preview.tsx` decorator, вручную не импортировать |

Импорт: `import { StoryTable } from '#storybook/components'`.

## Inline-стили запрещены

В stories **нельзя** использовать проп `style={{ ... }}` — ни на wrapper'ах, ни на компонентах, ни на demo-разметке. Причины:

- Inline-стили обходят дизайн-токены (`@sbercloud/figma-variables`) и дают визуальный шум в visual regression.
- В PR-ревью теряется контроль над spacing/layout: story «подкручивается» в нотации, которую нельзя переиспользовать.
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

Допустимое исключение: `style` прокидывается **только** через публичный проп компонента, когда этот проп часть его API и демонстрируется в story.

## Tags — семантика

| Tag    | Что делает                                           |
| ------ | ---------------------------------------------------- |
| `dev`  | Показывать в sidebar Storybook                       |
| `test` | Включать в Test Runner / Playwright                  |

Тег `autodocs` не используем: автодокументация отключена, описания живут в `docs/*.mdx`.

Типовые комбинации:
- Playground: `['dev', 'test']`
- VisualMatrix / Test story: `['test', 'dev']`
- Доп. композиционные stories: `['dev']`

## Naming

- Английский PascalCase. `Playground`, `VisualMatrix`, `Polymorphic`, `ClickTest`, `KeyboardTest`, `Composition`.
- Запрещены: `Basic`, `Default`, `Example`, `Story1`, русские названия, имена «на ось» (см. раздел «Запрещённые файлы»).

## Чего НЕ делать

- Заводить файлы на одну ось / одно состояние (см. «Запрещённые файлы»).
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

- [ ] Есть `Playground` (все пропсы через `argTypes`) и `VisualMatrix` (все оси в `StoryTable`)
- [ ] В `args` Playground и use-case stories есть `data-test-id` (kebab-case от ComponentName; для слотов — `<component>-<slot>`)
- [ ] Все `data-test-id`, которые компонент ставит сам себе на внутренние слоты, — в `src/constants.ts::TEST_IDS` (реэкспорт через `src/index.ts`); инлайн-строк `data-test-id='...'` в `.tsx` нет
- [ ] Повторяющиеся в 2+ файлах id вынесены в `stories/<ComponentName>/testIds.ts`, инлайн-строки только для уникальных; stories-level id реэкспортируют `TEST_IDS` пакета, не дублируют строку
- [ ] Play-функции используют только `getByTestId`, нет `getByRole`/`getByText`/`getByLabelText`
- [ ] Доп. файлы оправданы правилом выше, имя не из списка «Запрещённые»
- [ ] Каждый файл имеет собственный `export default meta`
- [ ] CSF3, `StoryObj<typeof Component>`
- [ ] VisualMatrix использует `StoryTable` из `#storybook/components`
- [ ] Нет тегов `autodocs` и блоков `parameters.docs.description.*`
- [ ] Названия на английском, PascalCase, без `Basic`/`Default`
- [ ] Нет `React.*`-типов, нет `import type`
- [ ] Нет inline-стилей `style={{ ... }}` в разметке stories

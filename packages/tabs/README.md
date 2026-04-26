# Tabs

`@ds/tabs` — Пакет табов — compound-компонент Tabs c субкомпонентами TabBar, Tab и TabContent для горизонтальной и вертикальной навигации.

Пакет `@ds/tabs` — compound-компонент для переключения между разделами одного уровня. Родитель `Tabs` владеет состоянием; `TabBar`, `Tab`, `TabContent` читают его из контекста.

## Демо

<TabsDemo client:only="react" />

## Состав пакета

- ****Tabs**** — корневой контейнер с состоянием выбранного таба.
- ****TabBar**** — панель переключателей; задаёт размер, ориентацию и позицию маркера.
- ****Tab**** — одна вкладка внутри TabBar; поддерживает label и counter.
- ****TabContent**** — контейнер контента, рендерится только для активного value.

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'
import '@ds/tabs/style.css'
```

## Минимальный сценарий

```tsx
<Tabs defaultValue='overview'>
  <Tabs.TabBar>
    <Tabs.Tab value='overview' label='Overview' />
    <Tabs.Tab value='settings' label='Settings' />
  </Tabs.TabBar>
  <Tabs.TabContent value='overview'>Overview</Tabs.TabContent>
  <Tabs.TabContent value='settings'>Settings</Tabs.TabContent>
</Tabs>
```

## Когда использовать

- 2–7 связанных разделов одного уровня иерархии.
- Переключение между представлениями одного объекта (обзор / настройки / история).

Когда **не** подходит: для иерархической навигации используйте `Sidebar`, для шагов процесса — `Stepper`, для фильтров — `Chip`/`Select`.

## Общие принципы

- **Один primary Tabs на экран.** Не делайте «табы в табах» — это сигнал переделать иерархию.
- **Горизонтальный TabBar** — основной паттерн. Вертикальный — для settings-подобных экранов.
- **Counter — для содержательного сигнала** (непрочитанные, черновики), а не ради украшения.

## Tabs

Корневой контейнер Tabs — владеет состоянием выбранного таба, поддерживает контролируемый и неконтролируемый режим.

Корневой контейнер compound-компонента. Хранит `selectedTab` и передаёт его детям через React-контекст. Работает в двух режимах:

- **Неконтролируемый** — `defaultValue`, переключение через UI.
- **Контролируемый** — `value` + `onChange`, чаще всего синхронизируется с URL.

## Примеры использования

<Example title='Неконтролируемый режим' code={UncontrolledSrc}>
  <Uncontrolled client:only="react" />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Текущая вкладка |
| `defaultValue` | `string` | — | Выбранная вкладка по умолчанию |
| `onChange` | `((id: T) => void)` | — | Колбек выбора вкладки |

## Storybook

<StorybookEmbed storyId='components-tabs--playground' height={360} client:only="react" />

## TabBar

Панель табов — задаёт размер, ориентацию, позицию маркера и слот справа (after) для дополнительных действий.

Панель переключателей табов. Задаёт:

- `size` — `l` (верхнеуровневый) или `m` (внутри контента).
- `orientation` — `horizontal` (по умолчанию) или `vertical`.
- `markerPosition` — позиция активного маркера (`before` / `after`).
- `after` — слот справа от табов для дополнительных действий.

## Примеры использования

<Example title='Size L — верхнеуровневый' code={SizeLSrc}>
  <SizeL client:only="react" />
</Example>

<Example title='Vertical orientation' code={VerticalSrc}>
  <Vertical client:only="react" />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `children` | `ReactElement<TabProps, string | JSXElementConstructor<any>>[]` | — | Контент (элементы Tabs.Tab) |
| `after` | `ReactNode` | — | Дополнительный слот для кастомного контента справа от табов |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация |
| `markerPosition` | `"after"` \| `"before"` | `after` | Позиция маркера |
| `size` | `"l"` \| `"m"` | `l` | Размер панели табов: L — верхнеуровневый, M — на уровне контента |
| `disableDivider` | `boolean` | `false` | Скрыть разделитель под/рядом с панелью табов |
| `className` | `string` | — | CSS-класс |

## Storybook

<StorybookEmbed storyId='components-tabs--sizes' height={240} client:only="react" />

## Tab

Отдельная вкладка в TabBar — поддерживает label, counter и disabled.

Одна вкладка внутри `TabBar`. Идентифицируется по `value` — это же значение используется в `TabContent` для сопоставления. Поддерживает `counter` (встроенный `Counter`) и `disabled`.

## Примеры использования

<Example title='Tab с counter' code={WithCounterSrc}>
  <WithCounter client:only="react" />
</Example>

<Example title='Отключённый таб' code={DisabledSrc}>
  <Disabled client:only="react" />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Value вкладки |
| `label` | `string` | — | Заголовок вкладки |
| `disabled` | `boolean` | `false` | Деактивирована ли вкладка |
| `className` | `string` | — | CSS-класс |
| `counter` | `{ label: number; appearance?: Appearance; color?: Color; } | undefined` | — | Счетчик, отображающийся внутри кнопки переключения |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |

## TabContent

Контейнер контента таба — рендерится только когда его value совпадает с активным табом.

Контейнер контента. Рендерится только при совпадении `value` с активным табом. Формирует `<div role='tabpanel'>` и связывается с кнопкой таба через `aria-labelledby`.

## Примеры использования

<Example title='Пара Tab + TabContent' code={WithContentSrc}>
  <WithContent client:only="react" />
</Example>

## Доступность

- Каждый `TabContent` — `<div role='tabpanel'>` с `aria-labelledby={value}`.
- Неактивные панели не рендерятся в DOM — скринридер не попадает на скрытый контент.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |
| `className` | `string` | — |  |

## ScrollButton

```tsx
import { ScrollButton } from '@ds/tabs'

export function Example() {
  return <ScrollButton>Click me</ScrollButton>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"l"` \| `"m"` | — |  |
| `direction` | `"left"` \| `"right"` \| `"top"` \| `"bottom"` | — |  |
| `orientation` | `"horizontal"` \| `"vertical"` | — |  |
| `onClick` | `() => void` | — |  |

## Tabs.Tab

```tsx
import { Tabs.Tab } from '@ds/tabs'

export function Example() {
  return <Tabs.Tab>Click me</Tabs.Tab>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Value вкладки |
| `label` | `string` | — | Заголовок вкладки |
| `disabled` | `boolean` | — | Деактивирована ли вкладка |
| `className` | `string` | — | CSS-класс |
| `counter` | `{ label: number; appearance?: Appearance; color?: Color; } | undefined` | — | Счетчик, отображающийся внутри кнопки переключения |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |

## Tabs.TabBar

```tsx
import { Tabs.TabBar } from '@ds/tabs'

export function Example() {
  return <Tabs.TabBar>Click me</Tabs.TabBar>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `children` | `ReactElement<TabProps, string | JSXElementConstructor<any>>[]` | — | Контент (элементы Tabs.Tab) |
| `after` | `ReactNode` | — | Дополнительный слот для кастомного контента справа от табов |
| `orientation` | `"horizontal"` \| `"vertical"` | — | Ориентация |
| `markerPosition` | `"after"` \| `"before"` | — | Позиция маркера |
| `size` | `"l"` \| `"m"` | — | Размер панели табов: L — верхнеуровневый, M — на уровне контента |
| `disableDivider` | `boolean` | — | Скрыть разделитель под/рядом с панелью табов |
| `className` | `string` | — | CSS-класс |

## Tabs.TabContent

```tsx
import { Tabs.TabContent } from '@ds/tabs'

export function Example() {
  return <Tabs.TabContent>Click me</Tabs.TabContent>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |
| `className` | `string` | — |  |

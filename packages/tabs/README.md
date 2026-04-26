# Tabs

`@ds/tabs` — Пакет табов — compound-компонент Tabs c субкомпонентами TabBar, Tab и TabContent для горизонтальной и вертикальной навигации.

Пакет `@ds/tabs` — compound-компонент для переключения между разделами одного уровня. Родитель `Tabs` владеет состоянием; `TabBar`, `Tab`, `TabContent` читают его из контекста.

- ****Tabs**** — корневой компонент, хранит активную вкладку и раздаёт её через контекст.
- ****TabBar**** — контейнер для списка табов, управляет скроллингом и индикатором.
- ****Tab**** — отдельная кнопка-вкладка.
- ****TabContent**** — панель с содержимым активной вкладки.

## Когда использовать

- 2–7 связанных разделов одного уровня иерархии.
- Переключение между представлениями одного объекта (обзор / настройки / история).

Когда **не** подходит: для иерархической навигации используйте `Sidebar`, для шагов процесса — `Stepper`, для фильтров — `Chip`/`Select`.

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'
```

## Tabs

Корневой контейнер Tabs — владеет состоянием выбранного таба, поддерживает контролируемый и неконтролируемый режим.

Корневой контейнер compound-компонента. Хранит `selectedTab` и передаёт его детям через React-контекст. Работает в двух режимах:

- **Неконтролируемый** — `defaultValue`, переключение через UI.
- **Контролируемый** — `value` + `onChange`, чаще всего синхронизируется с URL.

## Когда использовать

- Нужен compound API с независимым положением `TabBar` и `TabContent` в разметке.
- Состояние активного таба должно синхронизироваться с внешними источниками (URL, стор).

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'
```

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

<StorybookEmbed storyId='components-tabs--playground' height={360} />

## Анатомия

### Orientation
`horizontal` — табы в строку (дефолт), `vertical` — колонкой (для боковых навигаций).

### Size
`m` — дефолт, `l` — для крупных лейаутов и посадочных страниц.

## TabBar

Панель табов — задаёт размер, ориентацию, позицию маркера и слот справа (after) для дополнительных действий.

Панель переключателей табов. Задаёт:

- `size` — `l` (верхнеуровневый) или `m` (внутри контента).
- `orientation` — `horizontal` (по умолчанию) или `vertical`.
- `markerPosition` — позиция активного маркера (`before` / `after`).
- `after` — слот справа от табов для дополнительных действий.

## Когда использовать

- Внутри `Tabs` как единственный контейнер списка кнопок-табов.
- Если нужно разместить дополнительные действия справа от табов (через слот `after`).

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Bar />
```

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

<StorybookEmbed storyId='components-tabs--sizes' height={240} />

## Анатомия

### Orientation
`horizontal` — бар в строку, `vertical` — колонкой.

### Size
`m` — дефолт, `l` — для крупных лейаутов.

### Marker position
Положение активного маркера относительно содержимого таба: `before` — перед, `after` — после.

## Tab

Отдельная вкладка в TabBar — поддерживает label, counter и disabled.

Одна вкладка внутри `TabBar`. Идентифицируется по `value` — это же значение используется в `TabContent` для сопоставления. Поддерживает `counter` (встроенный `Counter`) и `disabled`.

## Когда использовать

- Внутри `TabBar` для каждой доступной вкладки.
- Когда нужно показать счётчик (число уведомлений/записей) рядом с названием таба.

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Tab value='overview' label='Overview' />
```

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

## Storybook

<StorybookEmbed storyId='components-tabs--playground' height={240} />

## Анатомия

### Size
Высота таба: `m` — дефолт, `l` — для крупных лейаутов. Наследуется от `TabBar`.

### Marker position
Положение активного маркера: `before` — перед содержимым, `after` — после. Наследуется от `TabBar`.

## TabContent

Контейнер контента таба — рендерится только когда его value совпадает с активным табом.

Контейнер контента. Рендерится только при совпадении `value` с активным табом. Формирует `<div role='tabpanel'>` и связывается с кнопкой таба через `aria-labelledby`.

## Когда использовать

- Для каждой вкладки, у которой есть видимый контент.
- Когда нужен корректный `aria-labelledby`/`role='tabpanel'` из коробки.

## Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Content value='overview'>…</Tabs.Content>
```

## Примеры использования

<Example title='Пара Tab + TabContent' code={WithContentSrc}>
  <WithContent client:only="react" />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |
| `className` | `string` | — |  |

## Storybook

<StorybookEmbed storyId='components-tabs--playground' height={240} />

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

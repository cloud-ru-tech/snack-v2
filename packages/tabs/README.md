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

### Когда использовать

- Нужен compound API с независимым положением `TabBar` и `TabContent` в разметке.
- Состояние активного таба должно синхронизироваться с внешними источниками (URL, стор).

### Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'
```

### Примеры использования

#### Неконтролируемый режим

```tsx
import { Tabs } from '@ds/tabs';

export function Uncontrolled() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Alpha' />
        <Tabs.Tab value='b' label='Beta' />
      </Tabs.TabBar>
      <Tabs.TabContent value='a'>Alpha content</Tabs.TabContent>
      <Tabs.TabContent value='b'>Beta content</Tabs.TabContent>
    </Tabs>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined` | — |  |
| `defaultValue` | `string` | — | Выбранная вкладка по умолчанию |
| `onChange` | `((id: T) => void)` | — | Колбек выбора вкладки |
| `value` | `string` | — | Текущая вкладка |

### Анатомия

#### Orientation
`horizontal` — табы в строку (дефолт), `vertical` — колонкой (для боковых навигаций).

#### Size
`m` — дефолт, `l` — для крупных лейаутов и посадочных страниц.

## Tab

Отдельная вкладка в TabBar — поддерживает label, counter и disabled.

Одна вкладка внутри `TabBar`. Идентифицируется по `value` — это же значение используется в `TabContent` для сопоставления. Поддерживает `counter` (встроенный `Counter`) и `disabled`.

### Когда использовать

- Внутри `TabBar` для каждой доступной вкладки.
- Когда нужно показать счётчик (число уведомлений/записей) рядом с названием таба.

### Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Tab value='overview' label='Overview' />
```

### Примеры использования

#### Tab с counter

```tsx
import { Tabs } from '@ds/tabs';

export function WithCounter() {
  return (
    <Tabs defaultValue='inbox'>
      <Tabs.TabBar>
        <Tabs.Tab value='inbox' label='Входящие' counter={{ label: 12 }} />
        <Tabs.Tab value='archive' label='Архив' />
      </Tabs.TabBar>
    </Tabs>
  );
}
```

#### Отключённый таб

```tsx
import { Tabs } from '@ds/tabs';

export function Disabled() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Активен' />
        <Tabs.Tab value='b' label='Выключен' disabled />
      </Tabs.TabBar>
    </Tabs>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `counter` | `{ label: number; appearance?: Appearance; color?: Color; } | undefined` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

### Анатомия

#### Size
Высота таба: `m` — дефолт, `l` — для крупных лейаутов. Наследуется от `TabBar`.

#### Marker position
Положение активного маркера: `before` — перед содержимым, `after` — после. Наследуется от `TabBar`.

## TabBar

Панель табов — задаёт размер, ориентацию, позицию маркера и слот справа (after) для дополнительных действий.

Панель переключателей табов. Задаёт:

- `size` — `l` (верхнеуровневый) или `m` (внутри контента).
- `orientation` — `horizontal` (по умолчанию) или `vertical`.
- `markerPosition` — позиция активного маркера (`before` / `after`).
- `after` — слот справа от табов для дополнительных действий.

### Когда использовать

- Внутри `Tabs` как единственный контейнер списка кнопок-табов.
- Если нужно разместить дополнительные действия справа от табов (через слот `after`).

### Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Bar />
```

### Примеры использования

#### Size L — верхнеуровневый

```tsx
import { SIZE, Tabs } from '@ds/tabs';

export function SizeL() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar size={SIZE.L}>
        <Tabs.Tab value='a' label='Первая' />
        <Tabs.Tab value='b' label='Вторая' />
      </Tabs.TabBar>
    </Tabs>
  );
}
```

#### Vertical orientation

```tsx
import { ORIENTATION, Tabs } from '@ds/tabs';

export function Vertical() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar orientation={ORIENTATION.Vertical}>
        <Tabs.Tab value='a' label='Профиль' />
        <Tabs.Tab value='b' label='Безопасность' />
      </Tabs.TabBar>
    </Tabs>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `after` | `ReactNode` | — | Дополнительный слот для кастомного контента справа от табов |
| `children` | `ReactElement<TabProps, string | JSXElementConstructor<any>>[]` | — | Контент (элементы Tabs.Tab) |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disableDivider` | `boolean` | `false` | Скрыть разделитель под/рядом с панелью табов |
| `markerPosition` | `"after"` \| `"before"` | `after` | Позиция маркера |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация |
| `size` | `"l"` \| `"m"` | `l` | Размер панели табов: L — верхнеуровневый, M — на уровне контента |

### Анатомия

#### Orientation
`horizontal` — бар в строку, `vertical` — колонкой.

#### Size
`m` — дефолт, `l` — для крупных лейаутов.

#### Marker position
Положение активного маркера относительно содержимого таба: `before` — перед, `after` — после.

## TabContent

Контейнер контента таба — рендерится только когда его value совпадает с активным табом.

Контейнер контента. Рендерится только при совпадении `value` с активным табом. Формирует `<div role='tabpanel'>` и связывается с кнопкой таба через `aria-labelledby`.

### Когда использовать

- Для каждой вкладки, у которой есть видимый контент.
- Когда нужен корректный `aria-labelledby`/`role='tabpanel'` из коробки.

### Установка

```bash
pnpm add @ds/tabs
```

```ts
import { Tabs } from '@ds/tabs'

<Tabs.Content value='overview'>…</Tabs.Content>
```

### Примеры использования

#### Пара Tab + TabContent

```tsx
import { Tabs } from '@ds/tabs';

export function WithContent() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar>
        <Tabs.Tab value='a' label='Первая' />
        <Tabs.Tab value='b' label='Вторая' />
      </Tabs.TabBar>
      <Tabs.TabContent value='a'>
        <div style={{ padding: '12px 0' }}>Контент первого таба</div>
      </Tabs.TabContent>
      <Tabs.TabContent value='b'>
        <div style={{ padding: '12px 0' }}>Контент второго таба</div>
      </Tabs.TabContent>
    </Tabs>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |

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
| `direction` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — |  |
| `onClick` | `() => void` | — |  |
| `orientation` | `"horizontal"` \| `"vertical"` | — |  |
| `size` | `"l"` \| `"m"` | — |  |

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
| `className` | `string` | — | CSS-класс |
| `counter` | `{ label: number; appearance?: Appearance; color?: Color; } | undefined` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

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
| `after` | `ReactNode` | — | Дополнительный слот для кастомного контента справа от табов |
| `children` | `ReactElement<TabProps, string | JSXElementConstructor<any>>[]` | — | Контент (элементы Tabs.Tab) |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disableDivider` | `boolean` | — | Скрыть разделитель под/рядом с панелью табов |
| `markerPosition` | `"after"` \| `"before"` | — | Позиция маркера |
| `orientation` | `"horizontal"` \| `"vertical"` | — | Ориентация |
| `size` | `"l"` \| `"m"` | — | Размер панели табов: L — верхнеуровневый, M — на уровне контента |

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
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |

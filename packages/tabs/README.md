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

### Анатомия

#### Orientation
`horizontal` — табы в строку (дефолт), `vertical` — колонкой (для боковых навигаций).

#### Size
`m` — дефолт, `l` — для крупных лейаутов и посадочных страниц.

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

**TabsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `defaultValue` | `T` | — | Выбранная вкладка по умолчанию |
| `onChange` | `((id: T) => void)` | — | Колбек выбора вкладки |
| `value` | `T` | — | Текущая вкладка |

## Tab

Отдельная вкладка в TabBar — поддерживает label, counter и disabled.

Одна вкладка внутри `TabBar`. Идентифицируется по `value` — это же значение используется в `TabContent` для сопоставления. Поддерживает `counter` (встроенный `Counter`) и `disabled`.

### Когда использовать

- Внутри `TabBar` для каждой доступной вкладки.
- Когда нужно показать счётчик (число уведомлений/записей) рядом с названием таба.

### Анатомия

#### Size
Высота таба: `m` — дефолт, `l` — для крупных лейаутов. Наследуется от `TabBar`.

#### Marker position
Положение активного маркера: `before` — перед содержимым, `after` — после. Наследуется от `TabBar`.

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

**TabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `counter` | `CounterProps` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

##### Related types

- `Size` = `"l"` \| `"m"`

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

### Анатомия

#### Orientation
`horizontal` — бар в строку, `vertical` — колонкой.

#### Size
`m` — дефолт, `l` — для крупных лейаутов.

#### Marker position
Положение активного маркера относительно содержимого таба: `before` — перед, `after` — после.

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

**TabBarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `after` | `ReactNode` | — | Дополнительный слот для кастомного контента справа от табов |
| `children` | `TabProps` | — | Контент (элементы Tabs.Tab) |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disableDivider` | `boolean` | `false` | Скрыть разделитель под/рядом с панелью табов |
| `markerPosition` | `"after"` \| `"before"` | `after` | Позиция маркера относительно таб-бара. <br/> Значения ориентационно-нейтральны, в Figma та же ось названа сторонами: <br/> `before` = Figma `top` (horizontal) / `left` (vertical), <br/> `after` = Figma `bottom` (horizontal) / `right` (vertical). |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация |
| `size` | `"l"` \| `"m"` | `l` | Размер панели табов: L — верхнеуровневый, M — на уровне контента |

##### Related types

- `MarkerPosition` = `"after"` \| `"before"`

- `Orientation` = `"horizontal"` \| `"vertical"`

- `Size` = `"l"` \| `"m"`

**TabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | CSS-класс |
| `counter` | `CounterProps` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

## TabContent

Контейнер контента таба — рендерится только когда его value совпадает с активным табом.

Контейнер контента. Рендерится только при совпадении `value` с активным табом. Формирует `<div role='tabpanel'>` и связывается с кнопкой таба через `aria-labelledby`.

### Когда использовать

- Для каждой вкладки, у которой есть видимый контент.
- Когда нужен корректный `aria-labelledby`/`role='tabpanel'` из коробки.

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

**TabContentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `value` | `string` | — | Значение таба |

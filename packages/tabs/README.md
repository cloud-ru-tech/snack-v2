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
Проп `orientation` компонента `Tabs` задаёт ориентацию: `horizontal` — табы в строку (дефолт), `vertical` — колонкой (для боковых навигаций).

#### Variant
`primary` — по умолчанию, `secondary` — для навигации внутри контента.

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
| `className` | `string` | — | Дополнительный класс на корневой контейнер |
| `defaultValue` | `string` | — | Выбранная вкладка по умолчанию |
| `onChange` | `((id: T) => void)` | — | Колбек выбора вкладки |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация вкладок |
| `value` | `string` | — | Текущая вкладка |

##### Related types

- `Orientation` = `"horizontal"` \| `"vertical"`

## Tab

Отдельная вкладка в TabBar — поддерживает label, counter и disabled.

Одна вкладка внутри `TabBar`. Идентифицируется по `value` — это же значение используется в `TabContent` для сопоставления. Поддерживает `counter` (встроенный `Counter`) и `disabled`.

### Когда использовать

- Внутри `TabBar` для каждой доступной вкладки.
- Когда нужно показать счётчик (число уведомлений/записей) рядом с названием таба.

### Анатомия

#### Variant
Вариант таба: `primary` — по умолчанию, `secondary` — для навигации внутри контента. Наследуется от `TabBar`.

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
        <Tabs.Tab value='inbox' label='Входящие' counter={{ value: 12 }} />
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
| `counter` | `Appearance` \| `RoleAppearance` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

## TabBar

Панель табов — задаёт вариант, ориентацию, позицию маркера и слот справа (afterContent) для дополнительных действий.

Панель переключателей табов. Задаёт:

- `variant` — `primary` (по умолчанию, верхнеуровневый) или `secondary` (внутри контента).
- Ориентация задаётся через `Tabs.orientation`: `horizontal` (по умолчанию) или `vertical`.
- `markerPosition` — позиция активного маркера (`before` / `after`).
- `afterContent` — действие справа от горизонтального списка или снизу от вертикального. При отсутствии содержимого вся обёртка скрыта; разделитель проходит вдоль всей панели.

При переполнении появляются кнопки прокрутки: слева/справа для горизонтальной панели и сверху/снизу для вертикальной. У достигнутого края кнопка скрывается. Для вертикальной прокрутки контейнеру `Tabs` нужна ограниченная высота, например родитель с `height: 240px`.

### Когда использовать

- Внутри `Tabs` как единственный контейнер списка кнопок-табов.
- Если нужно разместить дополнительные действия справа от табов (через слот `afterContent`).

### Анатомия

#### Orientation
`horizontal` — бар в строку, `vertical` — колонкой.

#### Variant
`primary` — по умолчанию, `secondary` — для навигации внутри контента.

#### Marker position
Положение активного маркера относительно содержимого таба: `before` — перед, `after` — после.

### Примеры использования

#### Primary — верхнеуровневый

```tsx
import { Tabs, VARIANT } from '@ds/tabs';

export function Primary() {
  return (
    <Tabs defaultValue='a'>
      <Tabs.TabBar variant={VARIANT.Primary}>
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
    <Tabs defaultValue='a' orientation={ORIENTATION.Vertical}>
      <Tabs.TabBar>
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
| `afterContent` | `ReactNode` | — | Слот действия: контент после списка табов — справа при горизонтальной <br/> ориентации, снизу при вертикальной. Разделитель проходит вдоль всей панели. |
| `children` | `TabProps` | — | Контент (элементы Tabs.Tab) |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `divider` | `boolean` | `true` | Показывать разделитель под/рядом с панелью табов |
| `markerPosition` | `"after"` \| `"before"` | `after` | Позиция маркера относительно таб-бара. <br/> Значения ориентационно-нейтральны, в Figma та же ось названа сторонами: <br/> `before` = Figma `top` (horizontal) / `left` (vertical), <br/> `after` = Figma `bottom` (horizontal) / `right` (vertical). |
| `variant` | `"primary"` \| `"secondary"` | `primary` | Вариант панели: primary — верхнеуровневый, secondary — на уровне контента |

##### Related types

- `MarkerPosition` = `"after"` \| `"before"`

**TabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | CSS-класс |
| `counter` | `Appearance` \| `RoleAppearance` | — | Счетчик, отображающийся внутри кнопки переключения |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Деактивирована ли вкладка |
| `label` | `string` | — | Заголовок вкладки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — | Колбек клика по кнопке переключения |
| `value` | `string` | — | Value вкладки |

- `Variant` = `"primary"` \| `"secondary"`

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

# SegmentControl

`@ds/segment-control` — Сегментированный переключатель — компактная радио-группа с единственным выбором, токенами размеров s/m/l, иконками, счётчиками и режимом полной ширины.

Радио-группа с единственным выбором, оформленная как сегментированный контрол. Подходит для переключения режимов отображения, фильтров с малым числом значений и компактных табов на плотных поверхностях. Поддерживает controlled и uncontrolled режим, клавиатурную навигацию (Arrow/Home/End с пропуском disabled), иконки, счётчики и режим полной ширины.

## Когда использовать

- Когда вариантов от 2 до 5 и все они одновременно видимы на экране.
- Для переключения режимов отображения (list/grid/kanban, day/week/month).
- Для компактных фильтров с взаимоисключающим выбором.

Когда **не** нужен `SegmentControl`:

- Вариантов больше 5:
  - используйте `Tabs` или `Select`.
- Допускается множественный выбор:
  - используйте чекбоксы или `ToggleGroup`.
- Выбор приводит к загрузке тяжёлого контента и нужны отдельные урлы:
  - используйте `Tabs`.

## Анатомия

### Size (default `m`)

Размерный ряд: `s` / `m` / `l` — стандартные плотности.

### Width (default `auto`)

- `auto` — ширина по контенту.
- `full` — растягивает контейнер на всю ширину родителя, сегменты делят ширину поровну. Уместен в формах и фильтрах с фиксированной шириной поля.

### Outline (default `false`)

Булевый флаг — добавляет обводку контейнеру. Используется на «лёгких» поверхностях, где контрол должен явно отделяться от фона.

### Segment slots

Каждый элемент `items[i]` собирается из:

- `label` — текст сегмента.
- `icon` — иконка с `iconPosition: 'before' | 'after'`.
- `counter` — счётчик после `label`.

Дополнительно:

- Сегмент может быть icon-only (без `label`).
- Отдельный сегмент можно сделать `disabled` — клавиатурная навигация его пропускает.

## Установка

```bash
pnpm add @ds/segment-control
```

```ts
import { SegmentControl } from '@ds/segment-control'
```

## Примеры использования

### 1. Базовый сценарий

Uncontrolled режим через defaultValue — компонент сам хранит выбор

```tsx
import { SegmentControl } from '@ds/segment-control';

export function Basic() {
  return (
    <SegmentControl
      defaultValue='overview'
      items={[
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'reports', label: 'Reports' },
      ]}
    />
  );
}
```

### 2. Все размеры

s / m / l

```tsx
import { SegmentControl } from '@ds/segment-control';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl size='s' defaultValue='one' items={items} />
      <SegmentControl size='m' defaultValue='one' items={items} />
      <SegmentControl size='l' defaultValue='one' items={items} />
    </div>
  );
}
```

### 3. С иконками и icon-only

label + icon, или icon без label для плотных тулбаров

```tsx
import { HomeSVG, PlusSVG, SettingsSVG } from '@ds/icons/interface/system';
import { SegmentControl } from '@ds/segment-control';

export function WithIcons() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl
        defaultValue='home'
        items={[
          { value: 'home', label: 'Home', icon: <HomeSVG /> },
          { value: 'settings', label: 'Settings', icon: <SettingsSVG /> },
          { value: 'add', label: 'Add', icon: <PlusSVG /> },
        ]}
      />
      <SegmentControl
        defaultValue='home'
        items={[
          { value: 'home', icon: <HomeSVG /> },
          { value: 'settings', icon: <SettingsSVG /> },
          { value: 'add', icon: <PlusSVG /> },
        ]}
      />
    </div>
  );
}
```

### 4. Со счётчиком

counter рендерится после label и переиспользует @ds/counter

```tsx
import { SegmentControl } from '@ds/segment-control';

export function WithCounter() {
  return (
    <SegmentControl
      defaultValue='inbox'
      items={[
        { value: 'inbox', label: 'Inbox', counter: 12 },
        { value: 'drafts', label: 'Drafts', counter: 3 },
        { value: 'archive', label: 'Archive' },
      ]}
    />
  );
}
```

### 5. Полная ширина и outline

width='full' растягивает на родителя; outline даёт обводку контейнера

```tsx
import { SegmentControl } from '@ds/segment-control';

export function FullWidth() {
  return (
    <div style={{ width: 480, maxWidth: '100%' }}>
      <SegmentControl
        width='full'
        outline
        defaultValue='day'
        items={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
      />
    </div>
  );
}
```

### 6. Disabled сегмент

Клавиатурная навигация Arrow/Home/End пропускает заблокированные элементы

```tsx
import { SegmentControl } from '@ds/segment-control';

export function DisabledSegment() {
  return (
    <SegmentControl
      defaultValue='one'
      items={[
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two', disabled: true },
        { value: 'three', label: 'Three' },
      ]}
    />
  );
}
```

### 7. Controlled с useState

value + onChange когда нужен внешний источник правды

```tsx
import { SegmentControl } from '@ds/segment-control';
import { useState } from 'react';

export function Controlled() {
  const [view, setView] = useState<'list' | 'grid' | 'kanban'>('list');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl
        value={view}
        onChange={setView}
        items={[
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' },
          { value: 'kanban', label: 'Kanban' },
        ]}
      />
      <span>Selected: {view}</span>
    </div>
  );
}
```

## Props

**SegmentControlProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс контейнера. |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `IdType` | — | ID выбранного по умолчанию сегмента (uncontrolled). |
| `items` | `Segment` | — | Набор сегментов. |
| `name` | `string` | — | Имя поля (hidden input для формы). |
| `onChange` | `((value: Value) => void)` | — | Колбек смены выбранного сегмента. |
| `outline` | `boolean` | — | Обводка. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента. |
| `value` | `IdType` | — | Value выбранного сегмента. |
| `width` | `"auto"` \| `"full"` | `auto` | Управление шириной компонента. |

#### Related types

- `IconPosition` = `"after"` \| `"before"`

**Segment**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `counter` | `string \| number \| undefined` | — | Счётчик в сегменте (отображается после лейбла). |
| `disabled` | `boolean \| undefined` | — | Состояние активности сегмента. |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка сегмента. |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно лейбла. |
| `label` | `string \| undefined` | — | Текстовый заголовок сегмента. |
| `renderWrapSegment` | `((segment: ReactNode) => ReactNode) \| undefined` | — | Render-обёртка над сегментом. |
| `value` | `Value` | — | Идентификатор сегмента. |

- `Size` = `"l"` \| `"m"` \| `"s"`

- `Width` = `"auto"` \| `"full"`

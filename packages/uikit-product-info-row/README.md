# UikitProductInfoRow

`@ds/uikit-product-info-row` — Строки «метка — значение» по макету Figma infoRow — компонент InfoRow и группа InfoGroup по данным.

Пакет `@ds/uikit-product-info-row` — строки сводки по макету [Figma `infoRow`](https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3040-21176): одна или две колонки значений, токены `@sbercloud/figma-variables`, интеграция с `@ds/button`, `@ds/divider`, `@ds/tooltip`, `@ds/skeleton`, `@ds/truncate-string`.

## Состав пакета

- ****InfoRow**** — одна строка «метка — значение»; опционально две пары в ряд (`column="2"`), действия, скелетон, `withTip` для кнопок.
- ****InfoGroup**** — несколько строк по объекту `data` и схеме полей `items` (`accessorKey` или `render`).
- **MobileInfoRow** / **MobileInfoGroup** — вертикальная строка и список (comfort-раскладка); на корне включается **density `comfort`** (`getThemeClassnames`); разделители и отступы от **`position`** (`first` / `inner` / `last`).
- **AdaptiveInfoRow** / **AdaptiveInfoGroup** — переключение **compact** (горизонтальная плотная, `InfoRow` / `InfoGroup`) и **comfort** (вертикальная, `MobileInfoRow` / `MobileInfoGroup`) по **`layoutType`**: `'compact'` \| `'comfort'`. Вспомогательная **`getPosition({ index, length })`** для `position` в списке.

## Установка

```bash
pnpm add @ds/uikit-product-info-row
```

```ts
import {
  AdaptiveInfoGroup,
  AdaptiveInfoRow,
  InfoGroup,
  InfoRow,
  LAYOUT_TYPE,
  NO_DATA_PLACEHOLDER,
  useGetContent,
} from '@ds/uikit-product-info-row'
import '@ds/uikit-product-info-row/style.css'
```

## Когда какой использовать

| Задача

## AdaptiveInfoGroup

```tsx
import { AdaptiveInfoGroup } from '@ds/uikit-product-info-row'

export function Example() {
  return <AdaptiveInfoGroup>Click me</AdaptiveInfoGroup>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `data` | `DataType | undefined` | — |  |
| `items` | `InfoGroupItem<T>[]` | — |  |
| `className` | `string` | — |  |
| `loading` | `boolean` | — |  |
| `columns` | `"single"` \| `"double"` | — |  |
| `width` | `"fixed"` \| `"full"` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — | Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) |
| `layoutType` | `"compact"` \| `"comfort"` | — |  |

## AdaptiveInfoRow

```tsx
import { AdaptiveInfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <AdaptiveInfoRow>Click me</AdaptiveInfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст метки |
| `labelTruncate` | `number` | — | Максимальное число строк метки (TruncateString) |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `secondaryLabel` | `string` | — | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки при `column="2"` |
| `secondaryLabelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у второй метки |
| `topDivider` | `boolean` | — | Разделитель над строкой |
| `bottomDivider` | `boolean` | — | Разделитель под строкой |
| `className` | `string` | — |  |
| `labelClassName` | `string` | — |  |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при `column="2"` |
| `rowClassName` | `string` | — |  |
| `content` | `ReactNode` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `rowActionsSlot` | `ReactNode` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры).
Если задано, рендерится вместо `rowActions`. |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryRowActionsSlot` | `ReactNode` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `loading` | `boolean` | — |  |
| `width` | `"fixed"` \| `"full"` | — | Ширина строки относительно контейнера |
| `labelWidth` | `"fixed"` \| `"auto"` | — | Ширина колонки метки |
| `column` | `"1"` \| `"2"` | — | Ось Figma `column`: одна или две колонки значений |
| `maxWidth` | `boolean` | — | Ось Figma `maxWidth` |
| `layoutType` | `"compact"` \| `"comfort"` | — |  |
| `position` | `"inner"` \| `"first"` \| `"last"` | — |  |

## getPosition

```tsx
import { getPosition } from '@ds/uikit-product-info-row'

export function Example() {
  return <getPosition>Click me</getPosition>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — |  |
| `length` | `number` | — |  |

## InfoGroup

```tsx
import { InfoGroup } from '@ds/uikit-product-info-row'

export function Example() {
  return <InfoGroup columns="single" width="fixed">Click me</InfoGroup>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `data` | `DataType | undefined` | — |  |
| `items` | `InfoGroupItem<T>[]` | — |  |
| `className` | `string` | — |  |
| `loading` | `boolean` | — |  |
| `columns` | `"single"` \| `"double"` | `single` |  |
| `width` | `"fixed"` \| `"full"` | `fixed` |  |
| `formatBoolean` | `((value: boolean) => string)` | — | Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) |

## InfoRow

```tsx
import { InfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <InfoRow labelTruncate="1" secondaryLabel="" topDivider bottomDivider width="fixed" column="1">Click me</InfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст метки |
| `labelTruncate` | `number` | `1` | Максимальное число строк метки (TruncateString) |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `secondaryLabel` | `string` | `` | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки при `column="2"` |
| `secondaryLabelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у второй метки |
| `topDivider` | `boolean` | `true` | Разделитель над строкой |
| `bottomDivider` | `boolean` | `true` | Разделитель под строкой |
| `className` | `string` | — |  |
| `labelClassName` | `string` | — |  |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при `column="2"` |
| `rowClassName` | `string` | — |  |
| `content` | `ReactNode` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `rowActionsSlot` | `ReactNode` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры).
Если задано, рендерится вместо `rowActions`. |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryRowActionsSlot` | `ReactNode` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `loading` | `boolean` | `false` |  |
| `width` | `"fixed"` \| `"full"` | `fixed` | Ширина строки относительно контейнера |
| `labelWidth` | `"fixed"` \| `"auto"` | — | Ширина колонки метки |
| `column` | `"1"` \| `"2"` | `1` | Ось Figma `column`: одна или две колонки значений |
| `maxWidth` | `boolean` | `false` | Ось Figma `maxWidth` |

## InfoRowActionPlaceholder

```tsx
import { InfoRowActionPlaceholder } from '@ds/uikit-product-info-row'

export function Example() {
  return <InfoRowActionPlaceholder>Click me</InfoRowActionPlaceholder>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## MobileInfoGroup

```tsx
import { MobileInfoGroup } from '@ds/uikit-product-info-row'

export function Example() {
  return <MobileInfoGroup>Click me</MobileInfoGroup>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `data` | `DataType | undefined` | — |  |
| `items` | `MobileInfoGroupItem<T>[]` | — |  |
| `className` | `string` | — |  |
| `loading` | `boolean` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — |  |

## MobileInfoRow

```tsx
import { MobileInfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <MobileInfoRow position="inner" topDivider bottomDivider>Click me</MobileInfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `position` | `"inner"` \| `"first"` \| `"last"` | `inner` |  |
| `label` | `string` | — |  |
| `labelTruncate` | `number` | — | Если > 0 — обрезка через `TruncateString` (в legacy мобильного пакета не было; опционально для паритета с десктопом). |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — |  |
| `topDivider` | `boolean` | `true` |  |
| `bottomDivider` | `boolean` | `true` |  |
| `className` | `string` | — |  |
| `content` | `ReactNode` | — |  |
| `rowActions` | `MobileRowActionsPair` | — |  |
| `loading` | `boolean` | `false` |  |

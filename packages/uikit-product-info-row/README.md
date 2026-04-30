# UikitProductInfoRow

`@ds/uikit-product-info-row` — Строки «метка — значение» по макету Figma infoRow — компонент InfoRow и группа InfoGroup по данным.

Пакет `@ds/uikit-product-info-row` — строки сводки по макету [Figma `infoRow`](https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3040-21176): одна или две колонки значений, токены `@sbercloud/figma-variables`, интеграция с `@ds/button`, `@ds/divider`, `@ds/tooltip`, `@ds/skeleton`, `@ds/truncate-string`.

## Состав пакета

- ****InfoRow**** — одна строка «метка — значение»; опционально две пары в ряд (`column="2"`), действия, скелетон, `withTip` для кнопок.
- ****InfoGroup**** — несколько строк по объекту `data` и схеме полей `items` (`accessorKey` или `render`).
- **MobileInfoRow** / **MobileInfoGroup** — вертикальная строка и список (comfort-раскладка); на корне включается **density `comfort`** (`getThemeClassnames`); разделители и отступы от **`position`** (`first` / `inner` / `last`).
- **AdaptiveInfoRow** / **AdaptiveInfoGroup** — переключение **desktop** (горизонтальная плотная, `InfoRow` / `InfoGroup`) и **mobile** (вертикальная, `MobileInfoRow` / `MobileInfoGroup`) по **`layoutType`**: `'desktop'` \| `'mobile'`. Вспомогательная **`getPosition({ index, length })`** для `position` в списке.

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
| `className` | `string` | — |  |
| `columns` | `"double"` \| `"single"` | — |  |
| `data` | `DataType | undefined` | — |  |
| `data-test-id` | `string` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — | Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) |
| `items` | `InfoGroupItem<T>[]` | — |  |
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `loading` | `boolean` | — |  |
| `width` | `"fixed"` \| `"full"` | — |  |

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
| `bottomDivider` | `boolean` | — | Разделитель под строкой |
| `className` | `string` | — |  |
| `column` | `"1"` \| `"2"` | — | Ось Figma `column`: одна или две колонки значений |
| `content` | `ReactNode` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст метки |
| `labelClassName` | `string` | — |  |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `labelTruncate` | `number` | — | Максимальное число строк метки (TruncateString) |
| `labelWidth` | `"auto"` \| `"fixed"` | — | Ширина колонки метки |
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `loading` | `boolean` | — |  |
| `maxWidth` | `boolean` | — | Ось Figma `maxWidth` |
| `position` | `"first"` \| `"inner"` \| `"last"` | — |  |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `rowActionsSlot` | `ReactNode` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры).
Если задано, рендерится вместо `rowActions`. |
| `rowClassName` | `string` | — |  |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryLabel` | `string` | — | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при `column="2"` |
| `secondaryLabelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у второй метки |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки при `column="2"` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `secondaryRowActionsSlot` | `ReactNode` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `topDivider` | `boolean` | — | Разделитель над строкой |
| `width` | `"fixed"` \| `"full"` | — | Ширина строки относительно контейнера |

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
| `className` | `string` | — |  |
| `columns` | `"double"` \| `"single"` | `single` |  |
| `data` | `DataType | undefined` | — |  |
| `data-test-id` | `string` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — | Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) |
| `items` | `InfoGroupItem<T>[]` | — |  |
| `loading` | `boolean` | — |  |
| `width` | `"fixed"` \| `"full"` | `fixed` |  |

## InfoRow

```tsx
import { InfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <InfoRow bottomDivider column="1" labelTruncate="1" secondaryLabel="" topDivider width="fixed">Click me</InfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bottomDivider` | `boolean` | `true` | Разделитель под строкой |
| `className` | `string` | — |  |
| `column` | `"1"` \| `"2"` | `1` | Ось Figma `column`: одна или две колонки значений |
| `content` | `ReactNode` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст метки |
| `labelClassName` | `string` | — |  |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `labelTruncate` | `number` | `1` | Максимальное число строк метки (TruncateString) |
| `labelWidth` | `"auto"` \| `"fixed"` | — | Ширина колонки метки |
| `loading` | `boolean` | `false` |  |
| `maxWidth` | `boolean` | `false` | Ось Figma `maxWidth` |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `rowActionsSlot` | `ReactNode` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры).
Если задано, рендерится вместо `rowActions`. |
| `rowClassName` | `string` | — |  |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryLabel` | `string` | `` | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при `column="2"` |
| `secondaryLabelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — | Подсказка у второй метки |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки при `column="2"` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `secondaryRowActionsSlot` | `ReactNode` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `topDivider` | `boolean` | `true` | Разделитель над строкой |
| `width` | `"fixed"` \| `"full"` | `fixed` | Ширина строки относительно контейнера |

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
| `className` | `string` | — |  |
| `data` | `DataType | undefined` | — |  |
| `data-test-id` | `string` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — |  |
| `items` | `MobileInfoGroupItem<T>[]` | — |  |
| `loading` | `boolean` | — |  |

## MobileInfoRow

```tsx
import { MobileInfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <MobileInfoRow bottomDivider position="inner" topDivider>Click me</MobileInfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bottomDivider` | `boolean` | `true` |  |
| `className` | `string` | — |  |
| `content` | `ReactNode` | — |  |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — |  |
| `labelTooltip` | `string | Pick<QuestionTooltipProps, "open" | "onOpenChange" | "trigger" | "placement" | "tip" | "disableMaxWidth">` | — |  |
| `labelTruncate` | `number` | — | Если > 0 — обрезка через `TruncateString` (в legacy мобильного пакета не было; опционально для паритета с десктопом). |
| `loading` | `boolean` | `false` |  |
| `position` | `"first"` \| `"inner"` \| `"last"` | `inner` |  |
| `rowActions` | `MobileRowActionsPair` | — |  |
| `topDivider` | `boolean` | `true` |  |

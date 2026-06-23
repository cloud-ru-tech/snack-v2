# InfoRow

`@ds/uikit-product-info-row` — Строки «метка — значение» по макету Figma infoRow — компонент InfoRow и группа InfoGroup по данным.

Пакет `@ds/uikit-product-info-row` — строки сводки по макету [Figma `infoRow`](https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3040-21176): одна или две колонки значений, токены `@sbercloud/figma-variables`, интеграция с `@ds/button`, `@ds/divider`, `@ds/tooltip`, `@ds/skeleton`, `@ds/truncate-string`.

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
  NO_DATA_PLACEHOLDER,
  useGetContent,
} from '@ds/uikit-product-info-row'
import { LAYOUT_TYPE } from '@ds/utils'
import '@ds/uikit-product-info-row/style.css'
```

## Состав пакета

- ****InfoRow**** — одна строка «метка — значение»; опционально две пары в ряд (`column="2"`), действия, скелетон, `withTip` для кнопок.
- ****InfoGroup**** — несколько строк по объекту `data` и схеме полей `items` (`accessorKey` или `render`).
- **MobileInfoRow** / **MobileInfoGroup** — вертикальная строка и список (comfort-раскладка); на корне включается **density `comfort`** (`getThemeClassnames`); разделители и отступы от **`position`** (`first` / `inner` / `last`).
- **AdaptiveInfoRow** / **AdaptiveInfoGroup** — переключение **desktop** (горизонтальная плотная, `InfoRow` / `InfoGroup`) и **mobile** (вертикальная, `MobileInfoRow` / `MobileInfoGroup`) по **`layoutType`**: `'desktop'` \| `'mobile'`. Вспомогательная **`getPosition({ index, length })`** для `position` в списке.

## Когда какой использовать

| Задача

## InfoGroup

```tsx
import { InfoGroup } from '@ds/uikit-product-info-row';

type Project = { name: string; status: string; active: boolean };

const data: Project = { name: 'Mercury', status: 'Running', active: true };

export function InfoGroupBasic() {
  return (
    <InfoGroup
      data={data}
      items={[
        { label: 'Имя', accessorKey: 'name' },
        { label: 'Статус', accessorKey: 'status' },
        { label: 'Активен', accessorKey: 'active' },
      ]}
    />
  );
}
```

### Props `InfoGroupProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `columns` | `"double"` \| `"single"` | `single` |  |
| `data` | `T` | — |  |
| `data-test-id` | `string` | — |  |
| `formatBoolean` | `((value: boolean) => string)` | — | Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) |
| `items` | `InfoGroupItem` \| `InfoRowPropsBase` \| `T` | — |  |
| `loading` | `boolean` | — |  |
| `width` | `"fixed"` \| `"full"` | `fixed` |  |

#### Related types

- `InfoGroupItem` = `PropsWithRender<T> | PropsWithAccessorKey<T>`

- `InfoRowColumn` = `"1"` \| `"2"`

**InfoRowPropsBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bottomDivider` | `boolean \| undefined` | — | Разделитель под строкой |
| `className` | `string \| undefined` | — |  |
| `column` | `"1"` \| `"2"` | — | Ось Figma `column`: одна или две колонки значений |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `label` | `string` | — | Текст метки |
| `labelClassName` | `string \| undefined` | — |  |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `labelTruncate` | `number \| undefined` | — | Максимальное число строк метки (TruncateString) |
| `labelWidth` | `"auto"` \| `"fixed"` | — | Ширина колонки метки |
| `loading` | `boolean \| undefined` | — |  |
| `maxWidth` | `boolean \| undefined` | — | Ось Figma `maxWidth` |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `rowActionsSlot` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры). <br/> Если задано, рендерится вместо `rowActions`. |
| `rowClassName` | `string \| undefined` | — |  |
| `secondaryContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryLabel` | `string \| undefined` | — | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelClassName` | `string \| undefined` | — | Класс блока второй метки при `column="2"` |
| `secondaryLabelTooltip` | `QuestionTooltipProps` | — | Подсказка у второй метки |
| `secondaryLabelTruncate` | `number \| undefined` | — | Макс. строк второй метки при `column="2"` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `secondaryRowActionsSlot` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `topDivider` | `boolean \| undefined` | — | Разделитель над строкой |
| `width` | `"fixed"` \| `"full"` | — | Ширина строки относительно контейнера |

**RowActionsPair**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `first` | `RowActionButton` | — |  |
| `second` | `RowActionButton` | — |  |

## InfoRow

```tsx
import { PlaceholderSVG } from '@ds/icons';
import { InfoRow, InfoRowFieldItem, useGetContent } from '@ds/uikit-product-info-row';

type Row = { name: string; active: boolean };

const data: Row = { name: 'Project', active: true };

const items: InfoRowFieldItem<Row>[] = [
  {
    label: 'Name',
    accessorKey: 'name',
    rowActions: {
      first: {
        icon: <PlaceholderSVG />,
        'aria-label': 'Изменить',
        'data-test-id': 'data-list-action-first',
      },
      second: {
        icon: <PlaceholderSVG />,
        'aria-label': 'Копировать',
        'data-test-id': 'data-list-action-second',
      },
    },
  },
  { label: 'Active', accessorKey: 'active' },
];

export function DataListExample() {
  const getContent = useGetContent();

  return (
    <div>
      {items.map((item, index) => {
        const { label, accessorKey, render, ...rowProps } = item;
        const content = getContent<Row>({ data, render, accessorKey });
        return (
          <InfoRow
            key={String(accessorKey ?? label)}
            label={label}
            content={content}
            topDivider={index === 0}
            bottomDivider
            width='full'
            column='1'
            data-test-id={`data-list-row-${index}`}
            {...rowProps}
          />
        );
      })}
    </div>
  );
}
```

### Props `InfoRowProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bottomDivider` | `boolean` | `true` | Разделитель под строкой |
| `className` | `string` | — |  |
| `column` | `"1"` \| `"2"` | `1` | Ось Figma `column`: одна или две колонки значений |
| `content` | `ReactNode` | — | Первая колонка значений (ось Figma `column=1` или левая при `column=2`) |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст метки |
| `labelClassName` | `string` | — |  |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка у метки: строка или пропсы QuestionTooltip |
| `labelTruncate` | `number` | `1` | Максимальное число строк метки (TruncateString) |
| `labelWidth` | `"auto"` \| `"fixed"` | — | Ширина колонки метки |
| `loading` | `boolean` | `false` |  |
| `maxWidth` | `boolean` | `false` | Ось Figma `maxWidth` |
| `rowActions` | `RowActionsPair` | — | До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` |
| `rowActionsSlot` | `ReactNode` | — | Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры). <br/> Если задано, рендерится вместо `rowActions`. |
| `rowClassName` | `string` | — |  |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при `column="2"`, ось Figma) |
| `secondaryLabel` | `string` | `` | Вторая метка слева от второго значения (только при `column="2"`) |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при `column="2"` |
| `secondaryLabelTooltip` | `QuestionTooltipProps` | — | Подсказка у второй метки |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки при `column="2"` |
| `secondaryRowActions` | `RowActionsPair` | — | Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) |
| `secondaryRowActionsSlot` | `ReactNode` | — | Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` |
| `topDivider` | `boolean` | `true` | Разделитель над строкой |
| `width` | `"fixed"` \| `"full"` | `fixed` | Ширина строки относительно контейнера |

#### Related types

- `InfoRowColumn` = `"1"` \| `"2"`

**RowActionButton**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tip` | `TooltipProps` | — |  |

**RowActionsPair**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `first` | `RowActionButton` | — |  |
| `second` | `RowActionButton` | — |  |

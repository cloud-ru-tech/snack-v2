# UikitProductInfoRow

`@ds/uikit-product-info-row` — Строка «метка — значение» по макету Figma infoRow ([`3040-21176`](https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3040-21176)): **compact** (плотная горизонтальная) и **comfort** (вертикальная + density comfort через `Adaptive*` / `Mobile*`).

**InfoRow** — compact-строка: одна строка по [Figma `infoRow`](https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3040-21176). При **`column="1"`** — одна пара «метка (+ QuestionTooltip) — значение»; при **`column="2"`** — две такие пары в ряд: **`label`** / **`labelTooltip`** и **`content`** слева направо в первой половине, **`secondaryLabel`** / **`secondaryLabelTooltip`** и **`secondaryContent`** — во второй. Ось **`maxWidth`** — как в макете. Для второй половины также **`secondaryRowActions`**.

Для **нескольких строк по данным** отдельного компонента нет: используйте **`useGetContent`** и тип **`InfoRowFieldItem`** (см. пример ниже).

## InfoRow

В режиме **`column="1"`** слева — метка (`TruncateString`, опционально `QuestionTooltip`), справа — значение (скелетон при `loading`) и до двух кнопок `@ds/button` (tonal neutral, **size m**; слот действий в локальном **density compact**, чтобы размер совпадал с макетом и при `sn-comfort`). В **`column="2"`** две одинаковые пары «метка — значение — действия» в одной строке. Разделители — `@ds/divider` (thin).

Утилита **`withTip`** оборачивает кнопку в `Tooltip` по `tip` в `rowActions`.

## Несколько строк по данным

<Example title='Список полей' description='Несколько строк: useGetContent и map по массиву полей' code={DataListSrc}>
  <DataListExample client:load />
</Example>

## Когда использовать

- Сводка атрибутов в карточке или панели.
- Пары полей без полноценной таблицы; при необходимости две колонки значений в одной строке — `column="2"`.

### Figma

<FigmaEmbed node={FIGMA_INFO_ROW} client:load />

### Установка

```bash
pnpm add @ds/uikit-product-info-row
```

```ts
import { InfoRow, useGetContent, NO_DATA_PLACEHOLDER } from '@ds/uikit-product-info-row'
import '@ds/uikit-product-info-row/style.css'
```

### Props

<PropsTable data={infoRowDoc.InfoRow} />

### Storybook

<StorybookEmbed storyId='components-uikitproductinforow-inforow--playground' height={420} client:load />

## Доступность

- Разделители: `role="separator"`.
- Кнопки: поведение `@ds/button`.
- `QuestionTooltip`: кнопка-триггер с `aria-label`.

## InfoRow

```tsx
import { InfoRow } from '@ds/uikit-product-info-row'

export function Example() {
  return <InfoRow labelTruncate="1" topDivider bottomDivider width="fixed" column="1">Click me</InfoRow>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — | Стабильный идентификатор для тестов (WithSupportProps) |
| `label` | `string` | — | Текст метки слева |
| `labelTruncate` | `number` | `1` | Максимум строк метки (TruncateString / maxLines) |
| `labelTooltip` | `string | QuestionTooltipProps` | — | Подсказка у метки: строка (текст tip) или частичные пропсы QuestionTooltip (tip, trigger, placement и т.д.) |
| `secondaryLabel` | `string` | — | Текст второй метки при column="2" (правая половина строки) |
| `secondaryLabelTruncate` | `number` | — | Макс. строк второй метки; по умолчанию как labelTruncate |
| `secondaryLabelTooltip` | `string | QuestionTooltipProps` | — | Подсказка у второй метки (только при column="2") |
| `topDivider` | `boolean` | `true` | Показать разделитель над строкой |
| `bottomDivider` | `boolean` | `true` | Показать разделитель под строкой |
| `className` | `string` | — | Класс корневой обёртки |
| `labelClassName` | `string` | — | Класс блока первой метки |
| `secondaryLabelClassName` | `string` | — | Класс блока второй метки при column="2" |
| `rowClassName` | `string` | — | Класс внутренней строки (между разделителями) |
| `content` | `ReactNode` | — | Первая колонка значений (при column=1 — единственная; при column=2 — левая) |
| `secondaryContent` | `ReactNode` | — | Вторая колонка значений (только при column="2") |
| `rowActions` | `{ first: RowActionButton; second?: RowActionButton }` | — | До двух кнопок у первой колонки (@ds/button tonal neutral, size m). RowActionButton: пропсы Button без size/appearance/view, опционально tip |
| `secondaryRowActions` | `{ first: RowActionButton; second?: RowActionButton }` | — | До двух кнопок у второй колонки (при column="2") |
| `loading` | `boolean` | `false` | Состояние загрузки: скелетон вместо контента колонок |
| `width` | `"fixed"` \| `"full"` | `fixed` | Ширина строки (data-width на корне) |
| `labelWidth` | `"fixed"` \| `"auto"` | — | Режим ширины колонки метки для обеих меток при column="2" (data-label-width) |
| `column` | `"1"` \| `"2"` | `1` | Ось Figma: одна или две колонки значений в строке |
| `maxWidth` | `boolean` | `false` | Ось Figma maxWidth для строки |

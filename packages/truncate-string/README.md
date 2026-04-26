# TruncateString

`@ds/truncate-string` — Обрезает длинный текст и показывает полный текст в тултипе — варианты `end` и `middle`, поддержка многострочного обрезания.

Обрезает длинный текст в ограниченной по ширине области и раскрывает полный вариант в тултипе при наведении. Два варианта обрезания — с конца (`end`) и посередине (`middle`) — решают разные задачи: читаемый заголовок и распознаваемое имя файла соответственно.

## Демо
<TruncateStringDemo client:visible />

## Когда использовать
- В списках, таблицах и карточках, где ширина ячейки зафиксирована.
- Для имён файлов, идентификаторов и коммитов — чтобы сохранить начало и конец строки (`middle`).
- Для заголовков и описаний, длина которых непредсказуема.

Когда **не** нужен: если контейнер может расти по содержимому (например, body статьи) — проще обернуть текст в абзац без обрезания.

## Установка
```bash
pnpm add @ds/truncate-string
```

```ts
import { TruncateString } from '@ds/truncate-string'
```

## Примеры использования
<Example title='Обрезание с конца' code={TruncateEndSrc}>
  <TruncateEnd client:visible />
</Example>

<Example title='Обрезание посередине — имя файла' code={TruncateMiddleSrc}>
  <TruncateMiddle client:visible />
</Example>

<Example title='Многострочное описание' code={TruncateMultilineSrc}>
  <TruncateMultiline client:visible />
</Example>

## Props
<PropsTable data={truncateStringDoc.TruncateString} />

## Storybook
<StorybookEmbed storyId='components-truncatestring--playground' height={360} />

### Variant
Где обрезается строка: `end` — троеточие в конце (стандартный CSS `ellipsis`), `middle` — обрезка посередине (для путей, email, ID — чтобы видеть начало и конец).

## TruncateString

```tsx
import { TruncateString } from '@ds/truncate-string'

export function Example() {
  return <TruncateString variant="end">Click me</TruncateString>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"middle"` \| `"end"` | `end` | Вариант обрезания строки: `End` - с конца
`Middle` - по середине |
| `data-test-id` | `string` | — |  |
| `className` | `string` | — |  |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `hideTooltip` | `boolean` | — | Скрывать ли тултип с полным текстом |
| `maxLines` | `number` | — | Максимальное кол-во строк, до которого может сворачиваться текст. |
| `placement` | `"left"` \| `"left-start"` \| `"left-end"` \| `"right"` \| `"right-start"` \| `"right-end"` \| `"top"` \| `"top-start"` \| `"top-end"` \| `"bottom"` \| `"bottom-start"` \| `"bottom-end"` | — | Положение тултипа относительно обрезанного текста. |
| `text` | `string` | — | Текст, который будет обрезаться |
| `trigger` | `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocusVisible"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | — | Условие отображения тултипа |

## TruncateStringEnd

```tsx
import { TruncateStringEnd } from '@ds/truncate-string'

export function Example() {
  return <TruncateStringEnd maxLines="1" placement="top" trigger="hoverAndFocusVisible">Click me</TruncateStringEnd>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — |  |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `hideTooltip` | `boolean` | — | Скрывать ли тултип с полным текстом |
| `maxLines` | `number` | `1` | Максимальное кол-во строк, до которого может сворачиваться текст. |
| `placement` | `"left"` \| `"left-start"` \| `"left-end"` \| `"right"` \| `"right-start"` \| `"right-end"` \| `"top"` \| `"top-start"` \| `"top-end"` \| `"bottom"` \| `"bottom-start"` \| `"bottom-end"` | `top` | Положение тултипа относительно обрезанного текста. |
| `text` | `string` | — | Текст, который будет обрезаться |
| `trigger` | `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocusVisible"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `hoverAndFocusVisible` | Условие отображения тултипа |

## TruncateStringMiddle

```tsx
import { TruncateStringMiddle } from '@ds/truncate-string'

export function Example() {
  return <TruncateStringMiddle placement="top" trigger="hoverAndFocusVisible">Click me</TruncateStringMiddle>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — |  |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `hideTooltip` | `boolean` | — |  |
| `placement` | `"left"` \| `"left-start"` \| `"left-end"` \| `"right"` \| `"right-start"` \| `"right-end"` \| `"top"` \| `"top-start"` \| `"top-end"` \| `"bottom"` \| `"bottom-start"` \| `"bottom-end"` | `top` |  |
| `text` | `string` | — |  |
| `trigger` | `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocusVisible"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `hoverAndFocusVisible` |  |

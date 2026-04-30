# TruncateString

`@ds/truncate-string` — Обрезает длинный текст и показывает полный текст в тултипе — варианты `end` и `middle`, поддержка многострочного обрезания.

Обрезает длинный текст в ограниченной по ширине области и раскрывает полный вариант в тултипе при наведении. Два варианта обрезания — с конца (`end`) и посередине (`middle`) — решают разные задачи: читаемый заголовок и распознаваемое имя файла соответственно.

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
### Обрезание с конца

```tsx
import { TruncateString } from '@ds/truncate-string';

export function TruncateEnd() {
  return (
    <div style={{ width: 220 }}>
      <TruncateString variant='end' text='Очень длинный заголовок, который не помещается' maxLines={1} />
    </div>
  );
}
```

### Обрезание посередине — имя файла

```tsx
import { TruncateString } from '@ds/truncate-string';

export function TruncateMiddle() {
  return (
    <div style={{ width: 220 }}>
      <TruncateString variant='middle' text='2024-quarterly-report-final-v3.pdf' />
    </div>
  );
}
```

### Многострочное описание

```tsx
import { TruncateString } from '@ds/truncate-string';

export function TruncateMultiline() {
  return (
    <div style={{ width: 260 }}>
      <TruncateString
        variant='end'
        maxLines={3}
        text='Длинное описание, которое укладывается в три строки, а затем обрезается с троеточием в конце.'
      />
    </div>
  );
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `hideTooltip` | `boolean` | — | Скрывать ли тултип с полным текстом |
| `maxLines` | `number` | — | Максимальное кол-во строк, до которого может сворачиваться текст. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Положение тултипа относительно обрезанного текста. |
| `text` | `string` | — | Текст, который будет обрезаться |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения тултипа |
| `variant` | `"end"` \| `"middle"` | `end` | Вариант обрезания строки: `End` - с конца
`Middle` - по середине |

## Анатомия

### Variant
Где обрезается строка: `end` — троеточие в конце (стандартный CSS `ellipsis`), `middle` — обрезка посередине (для путей, email, ID — чтобы видеть начало и конец).

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
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `hideTooltip` | `boolean` | — | Скрывать ли тултип с полным текстом |
| `maxLines` | `number` | `1` | Максимальное кол-во строк, до которого может сворачиваться текст. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение тултипа относительно обрезанного текста. |
| `text` | `string` | — | Текст, который будет обрезаться |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `hoverAndFocusVisible` | Условие отображения тултипа |

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
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `hideTooltip` | `boolean` | — |  |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` |  |
| `text` | `string` | — |  |
| `tooltipClassName` | `string` | — | Стиль для тултипа |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `hoverAndFocusVisible` |  |

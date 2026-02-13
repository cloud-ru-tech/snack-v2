# Truncate String

Компонент для обрезки длинного текста с многоточием. При обрезке по умолчанию показывает тултип с полным текстом при наведении. Поддерживает два варианта: обрезка с конца (End) и по середине (Middle).

## Installation

```bash
npm install @design-system/truncate-string
# or
yarn add @design-system/truncate-string
# or
pnpm add @design-system/truncate-string
```

## Exports

```typescript
import {
  TruncateString,
  type TruncateStringProps,
  VARIANT,
  type Variant
} from '@design-system/truncate-string';
```

## Live examples

### Обрезка с конца (End)

```tsx
import { TruncateString } from '@design-system/truncate-string';

Вариант по умолчанию. Текст обрезается с конца, многоточие в конце строки.
<div style={{ maxWidth: '280px' }}>
<TruncateString
text="Очень длинная строка текста, которая будет обрезана с конца и при наведении покажет полный текст в тултипе"
/>
</div>
```

### Обрезка по середине (Middle)

```tsx
import { TruncateString, VARIANT } from '@design-system/truncate-string';

Удобно для длинных путей, URL и идентификаторов: сохраняются начало и конец строки, середина заменяется на `...`.
<div style={{ maxWidth: '280px' }}>
<TruncateString
variant={VARIANT.Middle}
text="Путь/к/очень/длинному/файлу/или/ссылке.txt"
/>
</div>
```

### Многострочный текст (maxLines)

```tsx
import { TruncateString } from '@design-system/truncate-string';

Только для варианта End. Текст сворачивается до заданного числа строк.
<div style={{ maxWidth: '200px' }}>
<TruncateString
text="Очень длинная строка или путь к файлу /project/src/components/TruncateString.tsx"
maxLines={1}
hideTooltip
/>
</div>
<div style={{ maxWidth: '200px' }}>
<TruncateString
text="Очень длинная строка или путь к файлу /project/src/components/TruncateString.tsx"
maxLines={2}
hideTooltip
/>
</div>
<div style={{ maxWidth: '200px' }}>
<TruncateString
text="Очень длинная строка или путь к файлу /project/src/components/TruncateString.tsx"
maxLines={3}
hideTooltip
/>
</div>
```

### Без тултипа (hideTooltip)

```tsx
import { TruncateString } from '@design-system/truncate-string';

Текст по-прежнему обрезается, но тултип с полным текстом не показывается. Подходит для списков и таблиц, где полный текст доступен по клику или в другой колонке.
<div style={{ maxWidth: '200px' }}>
<TruncateString
text="Длинная строка без тултипа при наведении"
hideTooltip
/>
</div>
```


## Usage

### Базовый пример (обрезка с конца)

```tsx
import { TruncateString } from '@design-system/truncate-string';

export function Example() {
  return (
    <TruncateString text="Очень длинная строка текста, которая будет обрезана с конца" />
  );
}
```

### Обрезка по середине

```tsx
import { TruncateString, VARIANT } from '@design-system/truncate-string';

export function Example() {
  return (
    <TruncateString
      variant={VARIANT.Middle}
      text="Путь/к/очень/длинному/файлу/или/ссылке.txt"
    />
  );
}
```

### Многострочный текст и настройка тултипа

```tsx
import { TruncateString } from '@design-system/truncate-string';

export function Example() {
  return (
    <TruncateString
      text="Длинный текст на несколько строк"
      maxLines={2}
      placement="bottom"
      tooltipClassName="my-tooltip"
    />
  );
}
```

## Props

### TruncateStringProps
| name | type | default value | description |
|------|------|---------------|-------------|
| text* | `string` | - | Текст, который будет обрезаться |
| variant | "middle" \| "end" | end | Вариант обрезания строки: `End` - с конца `Middle` - по середине |
| className | `string` | - | CSS-класс |
| tooltipClassName | `string` | - | Стиль для тултипа |
| hideTooltip | `boolean` | - | Скрывать ли тултип с полным текстом |
| maxLines | `number` | - | Максимальное кол-во строк, до которого может сворачиваться текст. |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Положение тултипа относительно обрезанного текста. |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения тултипа |

## Best Practices

1. **Выбор варианта** — используйте **End** для обычного текста и подписей; **Middle** — для путей, URL и длинных идентификаторов, где важно видеть начало и конец.
2. **Тултип** — в плотных списках или таблицах отключайте тултип через `hideTooltip`, если полный текст доступен по клику или в другой колонке.
3. **Ограничение ширины** — задавайте `max-width` контейнеру (или родителю), иначе текст не будет обрезаться.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

# Counter

The Counter component displays numeric indicators (notification counters, item counts, metrics, etc.) in a compact format. It supports multiple value display variants: regular counter (count), plus format when threshold is exceeded (count-plus), and shortened notation in thousands (count-k), controlled by variant and plusLimit props.

## Installation

```bash
npm install @design-system/counter
# or
yarn add @design-system/counter
# or
pnpm add @design-system/counter
```

## Exports

```typescript
import {
  Counter,
  type CounterProps,
  APPEARANCE,
  VARIANT,
  SIZE,
  COLOR,
  DEFAULT_PLUS_LIMIT,
  type Appearance,
  type Variant,
  type Size,
  type Color
} from '@design-system/counter';
```

## Live examples

### Basic usage

```tsx
import { APPEARANCE, Counter } from '@design-system/counter';

<Counter value={9} />
<Counter value={42} appearance={APPEARANCE.Primary} />
<Counter value={128} appearance={APPEARANCE.Neutral} />
```

### Variants

```tsx
import { Counter, VARIANT } from '@design-system/counter';

<Counter value={9} variant={VARIANT.Count} />
<Counter value={15} variant={VARIANT.CountPlus} plusLimit={10} />
<Counter value={8500} variant={VARIANT.CountK} />
```

### Sizes

```tsx
import { Counter, SIZE } from '@design-system/counter';

<Counter value={9} size={SIZE.XS} />
<Counter value={9} size={SIZE.S} />
```

### Appearances

```tsx
import { APPEARANCE, Counter } from '@design-system/counter';

<Counter value={9} appearance={APPEARANCE.Primary} />
<Counter value={9} appearance={APPEARANCE.Neutral} />
<Counter value={9} appearance={APPEARANCE.Red} />
```

### Colors

```tsx
import { COLOR, Counter } from '@design-system/counter';

<Counter value={9} color={COLOR.Accent} />
<Counter value={9} color={COLOR.Decor} />
```

### With plus limit

```tsx
import { Counter, VARIANT } from '@design-system/counter';

<Counter value={9} variant={VARIANT.CountPlus} plusLimit={10} />
<Counter value={15} variant={VARIANT.CountPlus} plusLimit={10} />
<Counter value={150} variant={VARIANT.CountPlus} plusLimit={100} />
```


## Usage

### Basic example

```tsx
import { Counter } from '@design-system/counter';

export function NotificationBadge() {
  return <Counter value={9} />;
}
```

### With variant

```tsx
import { Counter, VARIANT } from '@design-system/counter';

export function NotificationBadge() {
  return (
    <>
      <Counter value={9} variant={VARIANT.Count} />
      <Counter value={15} variant={VARIANT.CountPlus} plusLimit={10} />
      <Counter value={8500} variant={VARIANT.CountK} />
    </>
  );
}
```

### Custom appearance and size

```tsx
import { Counter, APPEARANCE, SIZE } from '@design-system/counter';

export function NotificationBadge() {
  return <Counter value={10} appearance={APPEARANCE.Red} size={SIZE.S} />;
}
```

## Props

### CounterProps
| name | type | default value | description |
|------|------|---------------|-------------|
| value* | `number` | - | Значение |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"red"` | primary | Внешний вид |
| variant | enum Variant: `"count"`, `"count-plus"`, `"count-k"` | count | Вариант |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |
| plusLimit | `number` | 10 | Порог сокращения значения в формат v+. Например `1500` -> `999+` для 1000 |
| className | `string` | - | CSS-класс |
| color | enum Color: `"accent"`, `"decor"` | accent | Семантический цвет |

## Best Practices

1. **Use appropriate variants** — Choose count, count-plus, or count-k based on your use case
2. **Set plusLimit appropriately** — Configure the threshold based on your data range
3. **Consistent size usage** — Match counter size to context and importance
4. **Consider contrast** — Ensure counter values are readable against background colors
5. **Use in context** — Counter is designed to be used inside other UI elements (buttons, tags, menu items)
6. **Handle large values** — Use count-k variant for values over 1000 to keep display compact

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

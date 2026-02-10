# Tooltip

{/* TODO: Add component description */}

## Installation

```bash
npm install @design-system/tooltip
# or
yarn add @design-system/tooltip
# or
pnpm add @design-system/tooltip
```

## Exports

```typescript
import {
  TRIGGER,
  PLACEMENT,
  Tooltip,
  type TooltipProps,
  type Placement
} from '@design-system/tooltip';
```

## Live examples

### Basic usage

```tsx
import { Tooltip } from '@design-system/tooltip';

<Tooltip />
```


## Usage

### Basic example

```tsx
import { Tooltip } from '@design-system/tooltip';

export function Example() {
  return <Tooltip />;
}
```

### With props

```tsx
import { Tooltip } from '@design-system/tooltip';

export function Example() {
  return <Tooltip prop="value" />;
}
```

## Props

### TooltipProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Содержимое тултипа (текст или разметка) |
| children* | `ReactNode` | - | Элемент, при наведении на который показывается тултип |
| hoverDelayOpen | `number` | 200 | Задержка открытия по ховеру (мс) |
| hoverDelayClose | `number` | 100 | Задержка закрытия по ховеру (мс) |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PLACEMENT.Top | Положение поповера относительно своего триггера (children). |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | TRIGGER.HoverAndFocusVisible | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |

## Best Practices

{/* TODO: Add best practices */}

1. **Best practice 1** — Description
2. **Best practice 2** — Description
3. **Best practice 3** — Description

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

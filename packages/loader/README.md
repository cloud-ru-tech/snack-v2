# Loader

The Loader package provides loading indicators: **Spinner** (circular) and **Sun** (sunburst). Both support multiple sizes and are used to indicate loading or progress.

## Installation

```bash
npm install @design-system/loader
# or
yarn add @design-system/loader
# or
pnpm add @design-system/loader
```

## Exports



## Live examples

### Sizes

```tsx
import { Spinner } from '@design-system/loader';

<Spinner size="2xs" />
<Spinner size="xs" />
<Spinner size="s" />
<Spinner size="m" />
<Spinner size="l" />
```

### Sizes

```tsx
import { Sun } from '@design-system/loader';

<Sun size="xs" />
<Sun size="s" />
<Sun size="m" />
<Sun size="l" />
```


## Usage

### Basic

```tsx
import { Spinner } from '@design-system/loader';

export function LoadingState() {
  return <Spinner size="m" />;
}
```

### Default size

```tsx
import { Spinner } from '@design-system/loader';

export function Example() {
  return <Spinner />;   {/* size S by default */}
}
```

### Basic

```tsx
import { Sun } from '@design-system/loader';

export function LoadingState() {
  return <Sun size="m" />;
}
```

## Props

### SpinnerProps
| name | type | default value | description |
|------|------|---------------|-------------|
| size | enum LoaderSize: `"2xs"`, `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| className | `string` | - | CSS-класс |

### SunProps
| name | type | default value | description |
|------|------|---------------|-------------|
| size | enum SunSize: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| className | `string` | - | CSS-класс |

## Best Practices

1. **Match size to context** — Use smaller sizes (2XS, XS, S) inline; M/L for full-page or prominent loading
2. **Provide context** — Combine with text or `aria-live` so screen reader users know loading is in progress

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

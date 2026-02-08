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

### Spinner

```tsx
import { LOADER_SIZE, Spinner } from '@design-system/loader';

<Spinner size={LOADER_SIZE['2XS']} />
<Spinner size={LOADER_SIZE.XS} />
<Spinner size={LOADER_SIZE.S} />
<Spinner size={LOADER_SIZE.M} />
<Spinner size={LOADER_SIZE.L} />
```

### Sun

```tsx
import { SUN_SIZE, Sun } from '@design-system/loader';

<Sun size={SUN_SIZE.XS} />
<Sun size={SUN_SIZE.S} />
<Sun size={SUN_SIZE.M} />
<Sun size={SUN_SIZE.L} />
```

### Both variants

```tsx
import { LOADER_SIZE, SUN_SIZE, Spinner, Sun } from '@design-system/loader';

<Spinner size={LOADER_SIZE.M} />
<Sun size={SUN_SIZE.M} />
```


## Usage

### Spinner

```tsx
import { Spinner, LOADER_SIZE } from '@design-system/loader';

export function LoadingState() {
  return <Spinner size={LOADER_SIZE.M} />;
}
```

### Sun

```tsx
import { Sun, SUN_SIZE } from '@design-system/loader';

export function LoadingState() {
  return <Sun size={SUN_SIZE.M} />;
}
```

### Default size

```tsx
import { Spinner, Sun } from '@design-system/loader';

export function Example() {
  return (
    <>
      <Spinner />   {/* size S by default */}
      <Sun />       {/* size S by default */}
    </>
  );
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

1. **Choose the right variant** — Use Spinner for generic loading; Sun when a lighter or alternative style is needed
2. **Match size to context** — Use smaller sizes (2XS, XS, S) inline; M/L for full-page or prominent loading
3. **Provide context** — Combine with text or `aria-live` so screen reader users know loading is in progress
4. **Avoid multiple loaders** — One loader per logical loading state to reduce visual noise

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

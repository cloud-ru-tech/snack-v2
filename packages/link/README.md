# Link

Textual navigation element with variants and underline control.

**Version:** `0.1.0`

**Package:** `@design-system/link`

---

Use Link for inline navigation and contextual actions. It supports visual variants, weight, underline behavior, and automatic external attributes.

**Version:** `0.1.0`

## Changelog

## Live examples

<div style={{ display: 'grid', gap: 12 }}>
  <Link href="#">Primary link</Link>
  <Link href="#" variant="muted">
    Muted link
  </Link>
  <Link href="#" variant="ghost">
    Ghost link
  </Link>
  <Link href="https://example.com" isExternal>
    External link
  </Link>
  <Link href="#" underline="always">
    Always underline
  </Link>
  <Link href="#" underline="none" weight="semibold">
    No underline, semibold
  </Link>
</div>

## Storybook

## Usage

```tsx

export function Example() {
  return (
    <p>
      Go to{' '}
      <Link href="https://example.com" isExternal>
        example.com
      </Link>
    </p>
  );
}
```

## Variants

- `primary` — brand accent
- `muted` — subdued text links
- `ghost` — neutral text

## Underline

- `hover` (default) — underline on hover/focus
- `always` — underline always visible
- `none` — no underline

## Props

- `variant` (`primary | muted | ghost`)
- `weight` (`regular | semibold`)
- `underline` (`hover | always | none`)
- `isExternal` (`boolean`) — adds `target="_blank" rel="noopener noreferrer"`
- All native anchor attributes

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

# Button

Action trigger component with variants and sizes.

**Version:** `0.1.0`

**Package:** `@design-system/button`

---

The Button component provides consistent, accessible triggers for user actions across the design system.

**Version:** `0.1.0`

## Changelog

## Live examples

<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="primary" size="lg">
    Large
  </Button>
  <Button variant="primary" size="sm">
    Small
  </Button>
  <Button variant="primary" isFullWidth>
    Full width
  </Button>
</div>

## Storybook

## Usage

```tsx

export function Example() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Variants

- `primary` — main calls to action
- `secondary` — secondary emphasis
- `ghost` — low-emphasis contextual actions

## Props

- `variant` (`primary | secondary | ghost`) — visual styling
- `size` (`sm | md | lg`) — control density
- `isFullWidth` (`boolean`) — stretch to container width
- `...ButtonHTMLAttributes` — all native button props

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

# Counter

Counter component for displaying numeric values with automatic formatting.

**Version:** `0.1.0`

**Package:** `@design-system/counter`

---

The Counter component displays numeric values in a compact badge format. It automatically formats large numbers (99+, 1K, 2K, etc.) and supports multiple visual variants and color schemes.

**Version:** `0.1.0`

## Changelog

## Overview

Counter is a flexible component for displaying numeric indicators in your application. It automatically handles:

- **Automatic formatting** of large numbers (99+, 1K, 2K, etc.)
- **Multiple sizes**: extra small (xs) and small (s)
- **Two visual variants**: accent (solid) and decor (light)
- **Three color schemes**: green (primary), neutral (grey), and red
- **Accessibility** with proper semantic HTML

## Live examples

### Basic usage

### Variants

### Appearances

### Sizes

### Content types

## Storybook

## Usage

### Basic example

```tsx

export function NotificationBadge() {
  return <Counter value={5} />;
}
```

### With variant and appearance

```tsx

export function AlertCounter() {
  return <Counter value={12} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />;
}
```

### Automatic formatting

```tsx

export function Counters() {
  return (
    <>
      <Counter value={9} /> {}
      <Counter value={100} /> {}
      <Counter value={5000} /> {}
    </>
  );
}
```

### Custom max value

```tsx

export function CustomCounter() {
  // Customize when "+" formatting is applied
  return <Counter value={150} maxValue={200} />; // Displays: 150 (not 99+)
}
```

## Use cases

### Notification badges

Display unread message counts, notification indicators, and activity badges:

```tsx
<div style={{ position: 'relative' }}>
  <div
    style={
      {
        
      }
    }
  >
    🔔
  </div>
  <div style={{ position: 'absolute', top: -4, right: -4 }}>
    <Counter value={5} size={SIZE.Xs} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
  </div>
</div>
```

### Status indicators

Show item counts, status numbers, and quantity indicators:

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span>Inbox</span>
  <Counter value={12} size={SIZE.Xs} variant={VARIANT.Accent} appearance={APPEARANCE.Primary} />
</div>
```

### Navigation and menus

Use in navigation items, menu badges, and tab indicators:

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span>Messages</span>
  <Counter value={9} size={SIZE.Xs} variant={VARIANT.Accent} appearance={APPEARANCE.Primary} />
</div>
```

### Cards and lists

Display counts in card headers, list items, and dashboard widgets:

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
    <div>Active Projects</div>
    <div style={{ fontSize: 12, color: '#666' }}>Currently in progress</div>
  </div>
  <Counter value={24} size={SIZE.S} variant={VARIANT.Accent} appearance={APPEARANCE.Primary} />
</div>
```

## Variants

Counter supports two visual variants:

- `accent` (default) — Solid background with white/light text. Use for high-contrast, prominent indicators.
- `decor` — Light background with darker text. Use for subtle, low-emphasis indicators.

Choose variants based on visual hierarchy:

- **Accent**: Primary notifications, important counts, error states
- **Decor**: Secondary information, subtle indicators, background elements

## Appearances

Counter provides three color schemes:

- `primary` (green) — Success, positive status, completed items
- `neutral` (grey, default) — Default, neutral status, general counts
- `red` — Error, warning, alert status, urgent items

Use appearances to convey meaning:

- **Primary**: Success states, positive indicators, completed tasks
- **Neutral**: General counts, default states, neutral information
- **Red**: Errors, warnings, urgent items, attention-required states

## Sizes

Counter supports two size variants:

- `xs` — Extra small (default). Use in compact spaces, navigation, small badges
- `s` — Small. Use in cards, headers, prominent indicators

Choose sizes based on context:

- **xs**: Navigation items, icon badges, compact lists, inline indicators
- **s**: Card headers, dashboard widgets, prominent displays, standalone badges

## Formatting rules

The component automatically formats values based on the following rules:

- **Values 1-99**: Displayed as-is (e.g., `9`, `42`)
- **Values 100-999**: Displayed with "+" suffix (e.g., `99+`)
- **Values 1000+**: Displayed with "K" suffix (e.g., `1K`, `5K`, `12K`)

You can customize the `maxValue` prop to change when the "+" formatting is applied:

```tsx
// Default: 99+ for values >= 100
<Counter value={100} /> // Displays: 99+

// Custom: 199+ for values >= 200
<Counter value={150} maxValue={200} /> // Displays: 150
<Counter value={250} maxValue={200} /> // Displays: 199+
```

## Props

### Required

- `value` (`number`) — Numeric value to display. Required.

### Optional

- `appearance` (`'primary' | 'neutral' | 'red'`) — Color scheme. Default: `'neutral'`.
- `size` (`'xs' | 's'`) — Component size. Default: `'xs'`.
- `variant` (`'accent' | 'decor'`) — Visual style variant. Default: `'accent'`.
- `maxValue` (`number`) — Maximum value before "+" formatting is applied. Default: `999`.
- `className` (`string`) — Additional CSS class.
- `...HTMLSpanAttributes` — All standard span HTML attributes are supported.

## Accessibility

- Uses semantic `<span>` element for proper screen reader support
- Text content is readable and meaningful
- Color contrast meets WCAG guidelines for all variants
- Component accepts all standard HTML attributes for customization

## Best practices

1. **Use appropriate colors** — Match appearance to the meaning (red for errors, green for success)
2. **Choose the right size** — Use xs for compact spaces, s for prominent displays
3. **Consider context** — Use accent variant for important indicators, decor for subtle ones
4. **Handle large numbers** — Component automatically formats, but ensure values are meaningful
5. **Maintain consistency** — Use consistent sizing and appearance within the same context
6. **Test formatting** — Verify that automatic formatting (99+, K) works as expected for your use case

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

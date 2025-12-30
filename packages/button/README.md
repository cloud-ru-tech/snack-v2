# Button

Button components in various visual variants for user interactions.

**Version:** `0.1.0`

**Package:** `@design-system/button`

---

The Button components provide flexible, accessible buttons in various visual variants for different use cases and interaction patterns.

**Version:** `0.1.0`

## Changelog

## Overview

Button components support:

- **Six visual variants** — Filled, Tonal, Outline, Elevated, Simple, and Function
- **Three sizes** — Small (s), Medium (m), and Large (l)
- **Three appearances** — Primary, Neutral, and Destructive
- **Multiple states** — Default, hover, active, focus, disabled, and loading
- **Icon support** — With icon before or after label, or icon-only
- **Accessibility** — Proper semantic HTML, keyboard navigation, and ARIA attributes

## Live examples

### Button Variants

### Sizes

### Appearances

### States

## Storybook

## Usage

### Basic example

```tsx

export function MyComponent() {
  return (
    <ButtonFilled
      size={SIZE.M}
      appearance={APPEARANCE.Primary}
      label="Click me"
      onClick={() => console.log('Clicked!')}
    />
  );
}
```

### All button variants

```tsx

export function ButtonExamples() {
  return (
    <>
      <ButtonFilled label="Filled" appearance={APPEARANCE.Primary} />
      <ButtonTonal label="Tonal" appearance={APPEARANCE.Primary} />
      <ButtonOutline label="Outline" appearance={APPEARANCE.Primary} />
      <ButtonElevated label="Elevated" appearance={APPEARANCE.Primary} />
      <ButtonSimple label="Simple" appearance={APPEARANCE.Primary} />
      <ButtonFunction label="Function" appearance={APPEARANCE.Primary} />
    </>
  );
}
```

## Button Variants

### ButtonFilled

Filled button with solid background. Use for primary actions.

**When to use:**
- Primary call-to-action buttons
- Important actions that need emphasis
- Submit buttons in forms
- Confirmation actions

### ButtonTonal

Tonal button with subtle background. Use for secondary actions.

**When to use:**
- Secondary actions
- Actions that need less emphasis than primary
- Alternative actions in forms

### ButtonOutline

Outline button with border and transparent background. Use for secondary actions with emphasis.

**When to use:**
- Secondary actions that need visual emphasis
- Actions in toolbars
- Navigation actions

### ButtonElevated

Elevated button with shadow. Use for floating actions or elevated primary actions.

**When to use:**
- Floating action buttons (FAB)
- Actions that need to stand out from the background
- Prominent actions in cards

### ButtonSimple

Simple button with transparent background and text only. Use for tertiary actions.

**When to use:**
- Tertiary actions
- Text-only actions
- Actions in navigation
- Less important actions

### ButtonFunction

Function button with reduced opacity. Use for functional/utility actions.

**When to use:**
- Utility actions
- Functional buttons in toolbars
- Less prominent actions
- Actions that should be discoverable but not prominent

## Sizes

Buttons support three size variants:

- `s` — Small (default). Use in compact spaces, toolbars, inline actions
- `m` — Medium. Use for standard actions, forms, cards
- `l` — Large. Use for prominent actions, hero sections, important CTAs

Choose sizes based on context:

- **Small**: Compact spaces, toolbars, dense interfaces, secondary actions
- **Medium**: Standard actions, forms, most common use cases
- **Large**: Prominent actions, hero sections, primary CTAs, important actions

## Appearances

Buttons support three appearance variants:

- `primary` (default) — Primary actions, positive actions, success states
- `neutral` — Default actions, neutral actions, standard interactions
- `destructive` — Destructive actions, delete, remove, danger states

Use appearances to convey meaning:

- **Primary**: Main actions, positive actions, success, confirmation
- **Neutral**: Standard actions, default interactions, secondary actions
- **Destructive**: Delete, remove, destructive actions, danger states

## Props

All button components share the same props interface:

### Optional

- `label` (`string`) — Button label text
- `icon` (`ReactElement`) — Icon element
- `iconPosition` (`'before' | 'after'`) — Icon position relative to label (default: `'after'`)
- `size` (`'s' | 'm' | 'l'`) — Button size (default: `'s'`)
- `appearance` (`'primary' | 'neutral' | 'destructive'`) — Button appearance (default: `'primary'`)
- `disabled` (`boolean`) — Disabled state
- `loading` (`boolean`) — Loading state
- `fullWidth` (`boolean`) — Full width button
- `href` (`string`) — Link URL (renders as `<a>` if provided)
- `target` (`string`) — Link target (default: `'_blank'`)
- `onClick` (`MouseEventHandler`) — Click handler
- `className` (`string`) — Additional CSS class
- `...HTMLButtonAttributes` / `...HTMLAnchorAttributes` — All standard HTML attributes are supported

## Accessibility

- Uses semantic HTML elements (`<button>` or `<a>`)
- Proper keyboard navigation support
- ARIA attributes for disabled and loading states
- Focus management with visible focus indicators
- Color contrast meets WCAG guidelines for all variants
- Supports screen readers with proper labeling

## Best practices

1. **Choose the right variant** — Use Filled for primary actions, Tonal/Outline for secondary, Simple/Function for tertiary
2. **Use appropriate sizes** — Match button size to importance and context
3. **Provide clear labels** — Use descriptive, action-oriented text
4. **Handle states properly** — Show loading states for async actions, disable buttons when appropriate
5. **Maintain consistency** — Use consistent button styles within the same context
6. **Consider accessibility** — Ensure keyboard navigation and screen reader support
7. **Use icons wisely** — Icons can enhance understanding but shouldn't replace clear labels

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

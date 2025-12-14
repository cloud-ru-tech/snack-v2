# Avatar

User avatar component with image support, initials fallback, multiple sizes, shapes, and color schemes.

**Version:** `0.1.0`

**Package:** `@design-system/avatar`

---

The Avatar component displays user profile pictures or initials. It supports images with automatic fallback to generated initials, multiple sizes, shapes (round and square), and various color schemes.

**Version:** `0.1.0`

## Changelog

## Overview

Avatar is a flexible component for displaying user identity in your application. It automatically handles:

- **Image loading** with graceful fallback to initials
- **Initials generation** from user names (1 or 2 characters)
- **Multiple sizes** from extra small (xs) to extra large (10xl)
- **Two shapes**: round and square
- **Nine color schemes** for visual variety and categorization
- **Accessibility** with proper ARIA attributes

## Live examples

### Basic usage

### With images

### Two symbols

### Sizes

### Shapes

### Color schemes

## Storybook

## Usage

### Basic example

```tsx

export function UserProfile() {
  return <Avatar name="John Doe" />;
}
```

### With image

```tsx

export function UserProfile() {
  return <Avatar name="John Doe" src="https://example.com/avatar.jpg" />;
}
```

### Custom appearance and size

```tsx

export function UserProfile() {
  return <Avatar name="Jane Smith" appearance={APPEARANCE.Primary} size={SIZE.Xl} />;
}
```

### Two symbols

```tsx

export function UserProfile() {
  return <Avatar name="John Doe" showTwoSymbols />;
}
```

## Use cases

### User profiles and lists

Display user avatars in profile pages, user lists, comments, and activity feeds:

```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar name="John Doe" size={SIZE.M} />
  <div>
    <div>John Doe</div>
    <div style={{ fontSize: 12, color: '#666' }}>Software Engineer</div>
  </div>
</div>
```

### Navigation and menus

Use smaller avatars in navigation bars, dropdown menus, and user account sections:

```tsx
<Avatar name="John Doe" size={SIZE.S} appearance={APPEARANCE.Primary} />
```

### Status indicators

Combine with status badges or use different color schemes to indicate user status, roles, or categories:

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Avatar name="Admin" appearance={APPEARANCE.Red} size={SIZE.M} />
  <Avatar name="User" appearance={APPEARANCE.Neutral} size={SIZE.M} />
  <Avatar name="Guest" appearance={APPEARANCE.Blue} size={SIZE.M} />
</div>
```

### Team and group displays

Show team members, collaborators, or group participants:

```tsx
<div style={{ display: 'flex', gap: -8 }}>
  <Avatar name="John Doe" size={SIZE.S} />
  <Avatar name="Jane Smith" size={SIZE.S} appearance={APPEARANCE.Green} />
  <Avatar name="Bob Johnson" size={SIZE.S} appearance={APPEARANCE.Blue} />
</div>
```

### Cards and previews

Use in card layouts, preview components, and dashboard widgets:

```tsx
<div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar name="John Doe" size={SIZE.Xl} />
    <div>
      <div style={{ fontWeight: 'bold' }}>Project Name</div>
      <div style={{ fontSize: 12, color: '#666' }}>Last updated 2 hours ago</div>
    </div>
  </div>
</div>
```

## Sizes

Avatar supports seven size variants:

- `xs` — Extra small (16px)
- `s` — Small (24px, default)
- `m` — Medium (32px)
- `xl` — Extra large (48px)
- `3xl` — 3X large (64px)
- `6xl` — 6X large (96px)
- `10xl` — 10X large (128px)

Choose sizes based on context:

- **xs, s**: Navigation, compact lists, badges
- **m, xl**: Standard user profiles, cards, comments
- **3xl, 6xl, 10xl**: Hero sections, profile pages, featured displays

## Shapes

- `round` (default) — Circular avatar, most common for user profiles
- `square` — Square avatar with rounded corners, useful for brand logos or special cases

## Appearance (color schemes)

Avatar provides nine color schemes for visual variety:

- `neutral` (default) — Subtle gray, suitable for most cases
- `primary` — Brand primary color
- `red` — For warnings, errors, or high-priority users
- `orange` — Warm accent color
- `yellow` — Bright accent color
- `green` — Success states, active users
- `blue` — Trust, information, standard users
- `violet` — Premium or special roles
- `pink` — Soft accent color

Use color schemes to:

- **Categorize users** by role, status, or type
- **Indicate priority** or importance
- **Match brand** or design system colors
- **Create visual hierarchy** in lists and grids

## Initials generation

Avatar automatically generates initials from the `name` prop:

- **Single word**: First letter (e.g., "John" → "J")
- **Multiple words**: First letter of first and last word (e.g., "John Michael Doe" → "JD")
- **Two symbols mode**: Use `showTwoSymbols={true}` to always show two characters

The component handles:

- Special characters and punctuation (removed)
- Cyrillic and Latin alphabets
- Edge cases (empty strings, single characters)

## Image fallback

When an image URL is provided via `src`:

1. Component attempts to load the image
2. If loading fails, automatically falls back to initials
3. If `src` changes, the error state resets and the component tries loading again

This ensures avatars always display something meaningful, even with broken image URLs.

## Props

### Required

- `name` (`string`) — User name for generating initials. Required even when `src` is provided (used as fallback).

### Optional

- `src` (`string`) — URL of the avatar image. Falls back to initials if loading fails.
- `appearance` (`'neutral' | 'primary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'pink'`) — Color scheme. Default: `'neutral'`.
- `size` (`'xs' | 's' | 'm' | 'xl' | '3xl' | '6xl' | '10xl'`) — Avatar size. Default: `'s'`.
- `shape` (`'round' | 'square'`) — Avatar shape. Default: `'round'`.
- `showTwoSymbols` (`boolean`) — Display two characters instead of one. Default: `false`.
- `className` (`string`) — Additional CSS class.
- `...HTMLDivAttributes` — All standard div HTML attributes are supported.

## Accessibility

- Images use `alt=""` and `aria-hidden="true"` since they are decorative
- Initials are readable text, providing meaningful fallback
- Component accepts all standard HTML attributes for customization
- Semantic HTML structure ensures screen reader compatibility

## Best practices

1. **Always provide a meaningful `name`** — Even with images, names ensure fallback works correctly
2. **Use appropriate sizes** — Match avatar size to context and importance
3. **Consistent color usage** — Establish clear rules for when to use each appearance
4. **Handle image errors gracefully** — Component handles this automatically, but ensure image URLs are valid
5. **Consider contrast** — Ensure text/initials are readable against background colors
6. **Group related avatars** — Use consistent sizing and spacing when displaying multiple avatars

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

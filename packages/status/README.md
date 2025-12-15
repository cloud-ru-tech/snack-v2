# Status

Status and StatusIndicator components for displaying status information with visual indicators.

**Version:** `0.1.0`

**Package:** `@design-system/status`

---

The Status components provide visual indicators for displaying status information in your application. The package includes two components: `StatusIndicator` (a simple circular dot) and `Status` (a badge with indicator and text).

**Version:** `0.1.0`

## Changelog

## Overview

The Status package provides two complementary components:

- **StatusIndicator** — A simple circular dot indicator for displaying status visually
- **Status** — A badge component that combines an indicator with text label

Both components support:

- **Multiple sizes** — From extra small (4xs) to small (s) for StatusIndicator, xs and s for Status
- **Nine color schemes** — Primary, neutral, red, orange, yellow, green, blue, violet, and pink
- **Accessibility** — Proper semantic HTML and color contrast

## Live examples

### StatusIndicator

#### Basic usage

#### Sizes

#### Appearances

### Status

#### Basic usage

#### Sizes

#### Appearances

#### With custom text

## Storybook

## Usage

### StatusIndicator

#### Basic example

```tsx

export function UserStatus() {
  return <StatusIndicator appearance="primary" />;
}
```

#### With size

```tsx

export function StatusIndicators() {
  return (
    <>
      <StatusIndicator appearance="primary" size={STATUS_INDICATOR_SIZE.Xs} />
      <StatusIndicator appearance="primary" size={STATUS_INDICATOR_SIZE.S} />
    </>
  );
}
```

### Status

#### Basic example

```tsx

export function UserStatus() {
  return <Status appearance="primary">Online</Status>;
}
```

#### With size and appearance

```tsx

export function StatusBadges() {
  return (
    <>
      <Status appearance={APPEARANCE.Green} size={STATUS_SIZE.Xs}>
        Online
      </Status>
      <Status appearance={APPEARANCE.Red} size={STATUS_SIZE.S}>
        Offline
      </Status>
    </>
  );
}
```

## Use cases

### User status indicators

Display user online/offline status, activity indicators, and presence information:

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <StatusIndicator appearance={APPEARANCE.Green} size={STATUS_INDICATOR_SIZE.Xs} />
  <span>John Doe</span>
  <Status appearance={APPEARANCE.Green} size={STATUS_SIZE.Xs}>
    Online
  </Status>
</div>
```

### System status

Show system health, service status, and operational states:

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <span>API Service</span>
  <Status appearance={APPEARANCE.Green} size={STATUS_SIZE.Xs}>
    Operational
  </Status>
</div>
```

### Task and workflow status

Display task progress, workflow states, and process indicators:

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Status appearance={APPEARANCE.Blue} size={STATUS_SIZE.Xs}>
    In Progress
  </Status>
  <span>Task #1234</span>
</div>
```

### Notification status

Show notification states, message status, and alert indicators:

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <StatusIndicator appearance={APPEARANCE.Green} size={STATUS_INDICATOR_SIZE.S} />
  <div>
    <div style={{ fontWeight: 500 }}>Message delivered</div>
    <div style={{ fontSize: 12, color: '#666' }}>Your message was sent successfully</div>
  </div>
</div>
```

## StatusIndicator

### Sizes

StatusIndicator supports five size variants:

- `4xs` — Extra extra extra small (4px). Use for minimal indicators, inline dots
- `3xs` — Extra extra small (8px). Use for compact indicators
- `2xs` — Extra small (12px). Use for small status dots
- `xs` — Extra small (16px, default). Use for standard status indicators
- `s` — Small (24px). Use for prominent status indicators

Choose sizes based on context:

- **4xs, 3xs**: Minimal indicators, inline status dots, compact spaces
- **2xs, xs**: Standard status indicators, list items, user avatars
- **s**: Prominent indicators, card headers, dashboard widgets

### Appearances

StatusIndicator supports nine color schemes:

- `primary` (green) — Success, positive status, active states
- `neutral` (grey) — Default, neutral status, inactive states
- `red` — Error, critical status, danger states
- `orange` — Warning, pending status, attention-required
- `yellow` — Caution, alert status, temporary states
- `green` — Success, healthy status, completed states
- `blue` — Information, processing status, in-progress states
- `violet` — Special status, custom states
- `pink` — Custom status, special indicators

Use appearances to convey meaning:

- **Primary/Green**: Success, healthy, active, completed
- **Neutral**: Default, inactive, neutral information
- **Red**: Error, critical, danger, blocked
- **Orange**: Warning, pending, attention-required
- **Yellow**: Caution, alert, temporary
- **Blue**: Information, processing, in-progress
- **Violet/Pink**: Custom states, special indicators

## Status

### Sizes

Status supports two size variants:

- `xs` — Extra small (default). Use in compact spaces, lists, inline status
- `s` — Small. Use in cards, headers, prominent displays

Choose sizes based on context:

- **xs**: Compact spaces, list items, inline status, navigation
- **s**: Card headers, dashboard widgets, prominent displays, standalone badges

### Appearances

Status supports the same nine color schemes as StatusIndicator. The badge uses a light background color (decor) with a matching indicator dot (accent color).

## Props

### StatusIndicator

#### Optional

- `appearance` (`'primary' | 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'pink'`) — Color scheme. Default: `'primary'`.
- `size` (`'4xs' | '3xs' | '2xs' | 'xs' | 's'`) — Component size. Default: `'xs'`.
- `className` (`string`) — Additional CSS class.
- `...HTMLDivAttributes` — All standard div HTML attributes are supported.

### Status

#### Required

- `children` (`React.ReactNode`) — Text content to display. Required.

#### Optional

- `appearance` (`'primary' | 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'pink'`) — Color scheme. Default: `'primary'`.
- `size` (`'xs' | 's'`) — Component size. Default: `'xs'`.
- `className` (`string`) — Additional CSS class.
- `...HTMLDivAttributes` — All standard div HTML attributes are supported.

## Accessibility

- Uses semantic HTML elements (`<div>` for StatusIndicator, `<div>` for Status container)
- Text content in Status is readable and meaningful
- Color contrast meets WCAG guidelines for all variants
- Components accept all standard HTML attributes for customization
- StatusIndicator can be used with `aria-label` for screen reader support

## Best practices

1. **Use appropriate colors** — Match appearance to the meaning (red for errors, green for success)
2. **Choose the right size** — Use smaller sizes for compact spaces, larger for prominent displays
3. **Provide meaningful text** — Use descriptive labels in Status components
4. **Maintain consistency** — Use consistent sizing and appearance within the same context
5. **Consider accessibility** — Ensure color is not the only indicator of status
6. **Use StatusIndicator for minimal UI** — When space is limited or visual indicator is sufficient
7. **Use Status for clarity** — When text label is needed to clarify the status meaning

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

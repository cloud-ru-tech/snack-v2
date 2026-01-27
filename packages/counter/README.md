# Counter
The Counter component displays numeric indicators (notification counters, item counts, metrics, etc.) in a compact format. It supports multiple value display variants: regular counter (count), plus format when threshold is exceeded (count-plus), and shortened notation in thousands (count-k), controlled by variant and plusLimit props.
**Version:** ``
## Changelog
## Overview
Counter is a flexible component for displaying numeric indicators in your application. It automatically handles:
- **Value formatting with multiple variants (count, count-plus, count-k)**
- **Threshold control for plus format (plusLimit prop)**
- **Multiple sizes (xs, s)**
- **Three appearance options (primary, neutral, red)**
- **Two color schemes (accent, decor)**
- **Compact display suitable for use inside other UI elements**
## Live examples
### Basic usage
### Variants
### Sizes
### Appearances
### Colors
### With plus limit
## Storybook
## Usage
### Basic example
```tsx
export function NotificationBadge()  />;
```
### With variant
```tsx
export function NotificationBadge()  variant= />
      <Counter value= variant= plusLimit= />
      <Counter value= variant= />
    </>
  );
```
### Custom appearance and size
```tsx
export function NotificationBadge() 
      appearance=
      size=
    />
  );
```
### With plus limit
```tsx
export function NotificationBadge() 
      variant=
      plusLimit=
    />
  );
```
## Props
### Required
- **value** (number) — Numeric value to display. Required.
### Optional
- **appearance** ('primary' | 'neutral' | 'red') — Visual appearance. Default: 'primary'.
- **variant** ('count' | 'count-plus' | 'count-k') — Value display variant. Default: 'count'.
- **size** ('xs' | 's') — Counter size. Default: 'xs'.
- **plusLimit** (number) — Threshold for shortening value to v+ format. For example, 1500 -> 999+ for 1000. Default: 10.
- **color** ('accent' | 'decor') — Semantic color. Default: 'accent'.
- **className** (string) — Additional CSS class.
- **...HTMLDivAttributes** — All standard div HTML attributes are supported.
## Accessibility
- Semantic HTML structure ensures screen reader compatibility
- Component accepts all standard HTML attributes for customization
- Numeric values are readable text, providing meaningful information
## Best practices
1. **Use appropriate variants** — Choose count, count-plus, or count-k based on your use case
2. **Set plusLimit appropriately** — Configure the threshold based on your data range
3. **Consistent size usage** — Match counter size to context and importance
4. **Consider contrast** — Ensure counter values are readable against background colors
5. **Use in context** — Counter is designed to be used inside other UI elements (buttons, tags, menu items)
6. **Handle large values** — Use count-k variant for values over 1000 to keep display compact

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

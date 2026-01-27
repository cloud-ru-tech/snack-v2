# Avatar
The Avatar component displays user profile pictures or initials. It supports images with automatic fallback to generated initials, multiple sizes, shapes (round and square), and various color schemes.
**Version:** ``
## Changelog
## Overview
Avatar is a flexible component for displaying user identity in your application. It automatically handles:
- **Image loading with graceful fallback to initials**
- **Initials generation from user names (1 or 2 characters)**
- **Multiple sizes from extra small (xs) to extra large (10xl)**
- **Two shapes: round and square**
- **Nine color schemes for visual variety and categorization**
- **Accessibility with proper ARIA attributes**
## Live examples
### Basic usage
### With images
### Sizes
### Shapes
### Color schemes
## Storybook
## Usage
### Basic example
```tsx
export function UserProfile() 
```
### With image
```tsx
export function UserProfile() 
```
### Custom appearance and size
```tsx
export function UserProfile()  size= />;
```
## Props
### Required
- **name** (string) — User name for generating initials. Required even when src is provided (used as fallback).
### Optional
- **src** (string) — URL of the avatar image. Falls back to initials if loading fails.
- **appearance** — Color scheme. Default: 'neutral'.
- **size** — Avatar size. Default: 's'.
- **shape** ('round' | 'square') — Avatar shape. Default: 'round'.
- **showTwoSymbols** (boolean) — Display two characters instead of one. Default: false.
- **className** (string) — Additional CSS class.
- **...HTMLDivAttributes** — All standard div HTML attributes are supported.
## Accessibility
- Images use `alt=""` and `aria-hidden="true"` since they are decorative
- Initials are readable text, providing meaningful fallback
- Component accepts all standard HTML attributes for customization
- Semantic HTML structure ensures screen reader compatibility
## Best practices
1. **Always provide a meaningful name** — Even with images, names ensure fallback works correctly
2. **Use appropriate sizes** — Match avatar size to context and importance
3. **Consistent color usage** — Establish clear rules for when to use each appearance
4. **Handle image errors gracefully** — Component handles this automatically, but ensure image URLs are valid
5. **Consider contrast** — Ensure text/initials are readable against background colors
6. **Group related avatars** — Use consistent sizing and spacing when displaying multiple avatars

---

## Additional Resources

- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history
- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions

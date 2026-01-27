# Avatar

The Avatar component displays user profile pictures or initials. It supports images with automatic fallback to generated initials, multiple sizes, shapes (round and square), and various color schemes.

## Installation

```bash
npm install @design-system/avatar
# or
yarn add @design-system/avatar
# or
pnpm add @design-system/avatar
```

## Exports

```typescript
import {
  Avatar,
  type AvatarProps,
  APPEARANCE,
  SHAPE,
  SIZE,
  type Appearance,
  type Shape,
  type Size
} from '@design-system/avatar';
```

## Usage

### Basic example

```tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="John Doe" />;
}
```

### With image

```tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="John Doe" src="https://example.com/avatar.jpg" />;
}
```

### Custom appearance and size

```tsx
import { Avatar, APPEARANCE, SIZE } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="Jane Smith" appearance={APPEARANCE.Primary} size={SIZE.Xl} />;
}
```

## Best Practices

1. **Always provide a meaningful name** — Even with images, names ensure fallback works correctly
2. **Use appropriate sizes** — Match avatar size to context and importance
3. **Consistent color usage** — Establish clear rules for when to use each appearance
4. **Handle image errors gracefully** — Component handles this automatically, but ensure image URLs are valid
5. **Consider contrast** — Ensure text/initials are readable against background colors
6. **Group related avatars** — Use consistent sizing and spacing when displaying multiple avatars

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

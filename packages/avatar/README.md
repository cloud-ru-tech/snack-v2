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

## Live examples

### Basic usage

```tsx
import { APPEARANCE, Avatar } from '@design-system/avatar';

<Avatar name="John Doe" />
<Avatar name="Jane Smith" appearance={APPEARANCE.Primary} />
<Avatar name="Bob Johnson" appearance={APPEARANCE.Blue} />
```

### With images

```tsx
import { APPEARANCE, Avatar } from '@design-system/avatar';

<Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
<Avatar
  name="Jane Smith"
  src="https://i.pravatar.cc/150?img=2"
  appearance={APPEARANCE.Primary}
/>
<Avatar
  name="Bob Johnson"
  src="https://i.pravatar.cc/150?img=3"
  appearance={APPEARANCE.Green}
/>
```

### Sizes

```tsx
import { Avatar, SIZE } from '@design-system/avatar';

<Avatar name="XS" size={SIZE.Xs} />
<Avatar name="S" size={SIZE.S} />
<Avatar name="M" size={SIZE.M} />
<Avatar name="L" size={SIZE.L} />
<Avatar name="3XL" size={SIZE['3Xl']} />
<Avatar name="6XL" size={SIZE['6Xl']} />
<Avatar name="10XL" size={SIZE['10Xl']} />
```

### Shapes

```tsx
import { Avatar, SHAPE } from '@design-system/avatar';

<Avatar name="Round" shape={SHAPE.Round} />
<Avatar name="Square" shape={SHAPE.Square} />
```

### Color schemes

```tsx
import { APPEARANCE, Avatar } from '@design-system/avatar';

<Avatar name="Neutral" appearance={APPEARANCE.Neutral} />
<Avatar name="Primary" appearance={APPEARANCE.Primary} />
<Avatar name="Red" appearance={APPEARANCE.Red} />
<Avatar name="Orange" appearance={APPEARANCE.Orange} />
<Avatar name="Yellow" appearance={APPEARANCE.Yellow} />
<Avatar name="Green" appearance={APPEARANCE.Green} />
<Avatar name="Blue" appearance={APPEARANCE.Blue} />
<Avatar name="Violet" appearance={APPEARANCE.Violet} />
<Avatar name="Pink" appearance={APPEARANCE.Pink} />
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

## Props

### AvatarProps
| name | type | default value | description |
|------|------|---------------|-------------|
| name* | `string` | - | Имя пользователя для генерации аббревиатуры |
| src | `string` | - | URL изображения аватара |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | neutral | Внешний вид (цвет) |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"`, `"3xl"`, `"6xl"`, `"10xl"` | s | Размер |
| shape | enum Shape: `"round"`, `"square"` | round | Форма: круглая или квадратная |
| showTwoSymbols | `boolean` | - | Отображение двух заглавных символов имени вместо одного |
| className | `string` | - | CSS-класс |

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

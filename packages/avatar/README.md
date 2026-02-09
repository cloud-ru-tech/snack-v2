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
import { Avatar } from '@design-system/avatar';

<Avatar name='John Doe' />
<Avatar name='Jane Smith' appearance="primary" />
<Avatar name='Bob Johnson' appearance="blue" />
```

### With images

```tsx
import { Avatar } from '@design-system/avatar';

<Avatar name='John Doe' src='https://i.pravatar.cc/150?img=1' />
<Avatar name='Jane Smith' src='https://i.pravatar.cc/150?img=2' appearance="primary" />
<Avatar name='Bob Johnson' src='https://i.pravatar.cc/150?img=3' appearance="green" />
```

### Sizes

```tsx
import { Avatar } from '@design-system/avatar';

<Avatar name='XS' size="xs" />
<Avatar name='S' size="s" />
<Avatar name='M' size="m" />
<Avatar name='L' size="l" />
<Avatar name='3XL' size="3xl" />
<Avatar name='6XL' size="6xl" />
<Avatar name='10XL' size="10xl" />
```

### Shapes

```tsx
import { Avatar } from '@design-system/avatar';

<Avatar name='Round' shape="round" />
<Avatar name='Square' shape="square" />
```

### Color schemes

```tsx
import { Avatar } from '@design-system/avatar';

<Avatar name='Neutral' appearance="neutral" />
<Avatar name='Primary' appearance="primary" />
<Avatar name='Red' appearance="red" />
<Avatar name='Orange' appearance="orange" />
<Avatar name='Yellow' appearance="yellow" />
<Avatar name='Green' appearance="green" />
<Avatar name='Blue' appearance="blue" />
<Avatar name='Violet' appearance="violet" />
<Avatar name='Pink' appearance="pink" />
```


## Usage

### Basic example

```tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name='John Doe' />;
}
```

### With image

```tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name='John Doe' src='https://example.com/avatar.jpg' />;
}
```

### Custom appearance and size

```tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name='Jane Smith' appearance="primary" size="l" />;
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

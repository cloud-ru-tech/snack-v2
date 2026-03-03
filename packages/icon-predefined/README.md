# Icon Predefined

Компонент оборачивает SVG-иконки из пакета `@design-system/icons` и применяет к ним предустановленное стилевое оформление. Задаёт цвет через `appearance`, размер через `size`, форму контейнера через `shape` и опциональную цветную подложку через `decor`.

## Installation

```bash
npm install @design-system/icon-predefined
# or
yarn add @design-system/icon-predefined
# or
pnpm add @design-system/icon-predefined
```

## Exports

```typescript
import {
  IconPredefined,
  type IconPredefinedProps,
  APPEARANCE,
  SIZE,
  type Appearance,
  type Size
} from '@design-system/icon-predefined';
```

## Live examples

### Basic usage

```tsx
import { APPEARANCE, IconPredefined } from '@design-system/icon-predefined';

<IconPredefined icon={PlaceholderSVG} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Primary} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Red} />
```

### Sizes

```tsx
import { IconPredefined, SIZE } from '@design-system/icon-predefined';

<IconPredefined icon={PlaceholderSVG} size={SIZE.M} />
<IconPredefined icon={PlaceholderSVG} size={SIZE.L} />
<IconPredefined icon={PlaceholderSVG} size={SIZE['5XL']} />
```

### Shapes

```tsx
import { IconPredefined } from '@design-system/icon-predefined';

<IconPredefined icon={PlaceholderSVG} shape="round" />
<IconPredefined icon={PlaceholderSVG} shape="square" />
```

### With and without decor

```tsx
import { IconPredefined } from '@design-system/icon-predefined';

<IconPredefined icon={PlaceholderSVG} decor />
<IconPredefined icon={PlaceholderSVG} decor={false} />
```

### Color schemes

```tsx
import { APPEARANCE, IconPredefined } from '@design-system/icon-predefined';

<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Primary} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Neutral} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Red} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Orange} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Yellow} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Green} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Blue} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Violet} />
<IconPredefined icon={PlaceholderSVG} appearance={APPEARANCE.Pink} />
```


## Usage

### Basic example

```tsx
import { IconPredefined } from '@design-system/icon-predefined';
import { PlaceholderSVG } from '@design-system/icons';

export function Example() {
  return <IconPredefined icon={PlaceholderSVG} />;
}
```

### With custom appearance and size

```tsx
import { IconPredefined, APPEARANCE, SIZE } from '@design-system/icon-predefined';
import { PlaceholderSVG } from '@design-system/icons';

export function Example() {
  return (
    <IconPredefined
      icon={PlaceholderSVG}
      appearance={APPEARANCE.Red}
      size={SIZE.L}
      shape="round"
      decor
    />
  );
}
```

### Without background (decor=false)

```tsx
import { IconPredefined } from '@design-system/icon-predefined';
import { SearchSVG } from '@design-system/icons';

export function Example() {
  return <IconPredefined icon={SearchSVG} decor={false} appearance="neutral" />;
}
```

## Props

### IconPredefinedProps
| name | type | default value | description |
|------|------|---------------|-------------|
| icon* | `JSXElementConstructor<{ size?: number; className?: string; }>` | - | JSX иконки |
| className | `string` | - | CSS-класс |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| decor | `boolean` | true | Наличие цветной подложки |
| size | enum Size: `"m"`, `"l"`, `"5xl"` | m | Размер |
| shape | "round" \| "square" | round | Форма: круглая или квадратная |

## Best Practices

1. **Используйте standalone-иконки** — передавайте компоненты из `@design-system/icons` (PlaceholderSVG, SearchSVG и т.д.)
2. **Выбирайте appearance по контексту** — primary для основных действий, neutral для второстепенных, red/orange для предупреждений
3. **decor для акцента** — включайте подложку, когда иконка должна выделяться на фоне
4. **Согласованность размеров** — используйте SIZE.M для кнопок и списков, SIZE.L для крупных блоков
5. **Контраст** — на тёмном фоне используйте appearance с достаточным контрастом (например, primary, neutral)

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

# Block

Компонент-слот для отображения любого содержимого на подложке, имитирующей материал (матовое/полупрозрачное стекло).

## Installation

```bash
npm install @design-system/block
# or
yarn add @design-system/block
# or
pnpm add @design-system/block
```

## Exports

```typescript
import {
  Block,
  type BlockProps,
  VARIANT,
  SIZE,
  type Variant,
  type Size
} from '@design-system/block';
```

## Live examples

### Basic usage

```tsx
import { Block, VARIANT } from '@design-system/block';

<Block variant={VARIANT.Simple}>Simple acrylic</Block>
<Block variant={VARIANT.Outline}>With outline</Block>
<Block variant={VARIANT.Shadow}>With shadow</Block>
<Block variant={VARIANT.Transparent}>Transparent</Block>
```

### Variants

```tsx
import { Block, SIZE, VARIANT } from '@design-system/block';

<Block variant={VARIANT.Simple} size={SIZE.M}>
  Simple acrylic background
</Block>
<Block variant={VARIANT.Outline} size={SIZE.M}>
  Acrylic with border
</Block>
<Block variant={VARIANT.Shadow} size={SIZE.M}>
  Acrylic with shadow
</Block>
<Block variant={VARIANT.Transparent} size={SIZE.M}>
  Transparent matte glass
</Block>
```

### Sizes

```tsx
import { Block, SIZE, VARIANT } from '@design-system/block';

<Block variant={VARIANT.Simple} size={SIZE.S}>
  Small
</Block>
<Block variant={VARIANT.Simple} size={SIZE.M}>
  Medium
</Block>
<Block variant={VARIANT.Simple} size={SIZE.L}>
  Large
</Block>
```


## Usage

### Basic example

```tsx
import { Block } from '@design-system/block';

export function ContentCard() {
  return (
    <Block>
      <span>Your content here</span>
    </Block>
  );
}
```

### With variant and size

```tsx
import { Block, VARIANT, SIZE } from '@design-system/block';

export function ContentCard() {
  return (
    <Block variant={VARIANT.Shadow} size={SIZE.L}>
      <h3>Card Title</h3>
      <p>Card content with shadow effect</p>
    </Block>
  );
}
```

### Different variants

```tsx
import { Block, VARIANT, SIZE } from '@design-system/block';

export function Example() {
  return (
    <>
      <Block variant={VARIANT.Simple} size={SIZE.M}>
        Simple acrylic
      </Block>
      <Block variant={VARIANT.Outline} size={SIZE.M}>
        With outline
      </Block>
      <Block variant={VARIANT.Shadow} size={SIZE.M}>
        With shadow
      </Block>
      <Block variant={VARIANT.Transparent} size={SIZE.M}>
        Transparent
      </Block>
    </>
  );
}
```

## Props

### BlockProps
| name | type | default value | description |
|------|------|---------------|-------------|
| children | `ReactNode` | - | Содержимое |
| variant | enum Variant: `"simple"`, `"outline"`, `"shadow"`, `"transparent"` | simple | Вариант |
| size | enum Size: `"s"`, `"m"`, `"l"` | l | Размер |

## Best Practices

1. **Вариант** — simple для базовых контейнеров, outline для акцента, shadow для приподнятых элементов, transparent для оверлеев
2. **Размер** — s в компактных местах, m для обычного контента, l для крупных блоков
3. **Фон** — из-за backdrop blur важен контраст с контентом под блоком
4. **Группировка** — Block удобен для визуальной группировки связанного контента
5. **Читаемость** — обеспечивайте достаточный контраст текста на акриловом фоне
6. **Композиция** — Block хорошо сочетается с карточками, панелями и другими UI-компонентами

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

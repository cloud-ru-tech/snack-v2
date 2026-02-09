# Typography

Компонент типографики, использующий стили из `@sbercloud/figma-variables`. Поддерживает различные варианты, размеры и начертания шрифтов.

## Installation

```bash
npm install @design-system/typography
# or
yarn add @design-system/typography
# or
pnpm add @design-system/typography
```

## Exports

```typescript
import {
  Typography,
  type TypographyProps,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_WEIGHT,
  SIZE,
  VARIANT,
  WEIGHT,
  type TypographySize,
  type TypographyVariant,
  type TypographyWeight
} from '@design-system/typography';
```

## Live examples

### Basic usage

```tsx
import { Typography } from '@design-system/typography';

<Typography>Базовый текст</Typography>
```

### Variants

```tsx
import { Typography } from '@design-system/typography';

<Typography variant="display" size="l">
  Display Large
</Typography>
<Typography variant="headline" size="l">
  Headline Large
</Typography>
<Typography variant="title" size="m">
  Title Medium
</Typography>
<Typography variant="label" size="s">
  Label Small
</Typography>
<Typography variant="body" size="m">
  Body Medium - основной текст для чтения
</Typography>
```

### Sizes

```tsx
import { Typography } from '@design-system/typography';

<Typography variant="headline" size="s">
  Headline Small
</Typography>
<Typography variant="headline" size="m">
  Headline Medium
</Typography>
<Typography variant="headline" size="l">
  Headline Large
</Typography>
```

### Weights

```tsx
import { Typography } from '@design-system/typography';

<Typography variant="headline" size="l" weight="regular">
  Regular Weight
</Typography>
<Typography variant="headline" size="l" weight="thin">
  Thin Weight
</Typography>
<Typography variant="headline" size="l" weight="mono">
  Mono Weight
</Typography>
```


## Usage

### Basic example

```tsx
import { Typography } from '@design-system/typography';

export function Example() {
  return <Typography>Текст</Typography>;
}
```

### With variant and size

```tsx
import { Typography } from '@design-system/typography';

export function Example() {
  return (
    <Typography variant="headline" size="l">
      Заголовок
    </Typography>
  );
}
```

### With weight

```tsx
import { Typography } from '@design-system/typography';

export function Example() {
  return (
    <Typography variant="body" size="m" weight="thin">
      Тонкий текст
    </Typography>
  );
}
```

## Props

### TypographyProps
| name | type | default value | description |
|------|------|---------------|-------------|
| children | `ReactNode` | - | Дочерние элементы |
| variant | enum TypographyVariant: `"title"`, `"display"`, `"headline"`, `"label"`, `"body"` | VARIANT.body | Вариант типографики |
| size | enum TypographySize: `"s"`, `"m"`, `"l"` | SIZE.m | Размер типографики |
| weight | enum TypographyWeight: `"regular"`, `"thin"`, `"mono"` | WEIGHT.regular | Начертание шрифта |
| as | `ElementType` | - | HTML тег для рендеринга |
| className | `string` | - | CSS-класс |
### TypographySizeProps
| name | type | default value | description |
|------|------|---------------|-------------|
### TypographyVariantProps
| name | type | default value | description |
|------|------|---------------|-------------|
### TypographyWeightProps
| name | type | default value | description |
|------|------|---------------|-------------|

## Best Practices

1. **Используйте правильные варианты** — выбирайте вариант типографики в соответствии с семантикой контента (display для главных заголовков, body для основного текста)

2. **Соблюдайте иерархию** — используйте размеры последовательно для создания визуальной иерархии

3. **Выбирайте начертание осознанно** — regular для основного контента, thin для акцентов, mono для кода и технических данных

4. **Используйте семантические теги** — позвольте компоненту автоматически выбирать тег, или явно укажите `as` для лучшей семантики

5. **Не смешивайте стили** — используйте компонент Typography вместо прямого применения CSS классов для консистентности

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

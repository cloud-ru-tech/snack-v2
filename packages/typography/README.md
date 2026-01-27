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
import { Typography, VARIANT, SIZE } from '@design-system/typography';

export function Example() {
  return (
    <Typography variant={VARIANT.headline} size={SIZE.l}>
      Заголовок
    </Typography>
  );
}
```

### With weight

```tsx
import { Typography, VARIANT, SIZE, WEIGHT } from '@design-system/typography';

export function Example() {
  return (
    <Typography variant={VARIANT.body} size={SIZE.m} weight={WEIGHT.thin}>
      Тонкий текст
    </Typography>
  );
}
```

## Props

| name | type | default value | description |
|------|------|---------------|-------------|
| children | `ReactNode` | - | Дочерние элементы |
| variant | enum TypographyVariant: `"title"`, `"display"`, `"headline"`, `"label"`, `"body"` | VARIANT.body | Вариант типографики |
| size | enum TypographySize: `"s"`, `"m"`, `"l"` | SIZE.m | Размер типографики |
| weight | enum TypographyWeight: `"regular"`, `"thin"`, `"mono"` | WEIGHT.regular | Начертание шрифта |
| as | `ElementType<any, keyof IntrinsicElements>` | - | HTML тег для рендеринга |
| className | `string` | - | CSS-класс |
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
### Props
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

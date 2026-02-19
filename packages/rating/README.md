# Rating

Компонент `Rating` отображает рейтинг в виде **звёзд**. Поддерживает **контролируемый и неконтролируемый** режимы (`value` / `defaultValue`), **настраиваемое количество звёзд** (`count`, по умолчанию 5), **половинчатые звёзды** (`allowHalf`), **сброс при повторном клике** (`allowClear`) и **режим только чтения** (`readonly`).

## Installation

```bash
npm install @design-system/rating
# or
yarn add @design-system/rating
# or
pnpm add @design-system/rating
```

## Exports

```typescript
import {
  Rating,
  type RatingProps,
  APPEARANCE,
  SIZE,
  type Appearance,
  type Size
} from '@design-system/rating';
```

## Live examples

### Basic usage

```tsx
import { Rating } from '@design-system/rating';

<Rating count={5} defaultValue={0} />
```

### С половинчатыми звёздами и сбросом

```tsx
import { Rating } from '@design-system/rating';

<Rating count={5} defaultValue={2.5} allowHalf allowClear />
<Rating count={5} defaultValue={3} readonly />
```

### Размеры и варианты

```tsx
import { Rating } from '@design-system/rating';

<Rating count={5} defaultValue={2} size="xs" />
<Rating count={5} defaultValue={4} size="s" appearance="yellow" />
<Rating count={5} defaultValue={1} size="s" appearance="primary" />
```


## Usage

### Неконтролируемый рейтинг

```tsx
import { Rating } from '@design-system/rating';

export function Example() {
  return (
    <Rating
      count={5}
      defaultValue={3}
      allowHalf={false}
      allowClear
      onChange={(value) => console.log('Rating:', value)}
    />
  );
}
```

### Контролируемый рейтинг

```tsx
import { useState } from 'react';
import { Rating } from '@design-system/rating';

export function Example() {
  const [value, setValue] = useState<number>(0);

  return (
    <Rating
      count={5}
      value={value}
      onChange={setValue}
      allowHalf
      allowClear
      appearance="yellow"
    />
  );
}
```

### Только чтение и кастомное количество звёзд

```tsx
import { Rating } from '@design-system/rating';

export function Example() {
  return (
    <Rating
      count={10}
      defaultValue={7}
      readonly
      size="s"
      data-test-id="product-rating"
    />
  );
}
```

## Props



## Best Practices

1. **Выбирайте контролируемый режим** при привязке к форме или API; используйте `defaultValue` для простого отображения с опциональным `onChange`.
2. **Используйте `allowHalf`** там, где нужна более тонкая градация (например, средние оценки).
3. **Включайте `allowClear`**, если по сценарию пользователь может снять оценку.
4. **Задавайте `readonly`** для отображения уже выставленного рейтинга без возможности редактирования.
5. **Добавляйте `data-test-id`** при необходимости стабильных автотестов.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

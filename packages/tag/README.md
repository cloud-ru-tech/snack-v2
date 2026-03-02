# Tag

Пакет компонентов для отображения тегов: одиночный тег (**Tag**) и строка тегов (**TagRow**).

## Installation

```bash
npm install @design-system/tag
# or
yarn add @design-system/tag
# or
pnpm add @design-system/tag
```

## Exports

```typescript
import {
  type Appearance,
  type Size,
  type TagLinkProps,
  type TagRowItem,
  type TagProps,
  type TagRowProps
} from '@design-system/tag';
```



## Usage



## Props



## Best Practices

1. Задавайте `rowLimit`, когда строка может быть длинной, чтобы не ломать верстку.
2. Для удаляемых тегов в списке «ещё» передавайте `onItemRemove` и при необходимости уникальные `id` в `items`.
3. Используйте один и тот же `size` для всей строки.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

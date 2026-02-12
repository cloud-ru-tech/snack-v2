# Divider

Divider — компонент для визуального разделения контента.

## Installation

```bash
npm install @design-system/divider
# or
yarn add @design-system/divider
# or
pnpm add @design-system/divider
```

## Exports

```typescript
import {
  ORIENTATION,
  VARIANT
} from '@design-system/divider';
```



## Usage



## Props

### DividerProps
| name | type | default value | description |
|------|------|---------------|-------------|
| variant | enum DividerVariant: `"regular"`, `"thin"` | regular | Вариант толщины линии (regular: 1px, thin: 0.5px). По умолчанию: regular |
| orientation | enum DividerOrientation: `"horizontal"`, `"vertical"` | horizontal | Ориентация: горизонтальная или вертикальная. По умолчанию: horizontal |
| className | `string` | - | CSS-класс |

## Best Practices

1. **Горизонтальный разделитель** — используйте между блоками контента (секции, параграфы, карточки в колонке).
2. **Вертикальный разделитель** — используйте внутри flex-рядов (тулбары, списки действий), обязательно задайте высоту контейнера (например, `height` или `alignItems: 'stretch'`).
3. **Regular vs Thin** — regular для явного разделения секций, thin — когда нужно визуально ослабить границу (вложенные блоки, плотные списки).
4. **Не перегружайте интерфейс** — не ставьте разделители между каждым элементом; группируйте логические блоки.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

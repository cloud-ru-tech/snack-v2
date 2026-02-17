# Icons

Набор React-компонентов интерфейсных иконок и компонент **Sprite** для вставки кастомных SVG-спрайтов. Иконки поддерживают размер, наследование цвета через `fill: currentColor` и типизированные пропсы.

## Installation

```bash
npm install @design-system/icons
# or
yarn add @design-system/icons
# or
pnpm add @design-system/icons
```

## Exports

```typescript
import {
  type ISvgIconProps
} from '@design-system/icons';
```

## Live examples

### Одна иконка с размером

```tsx
import { CheckSVG } from '@design-system/icons';

<CheckSVG size={24} />
<CheckSVG size={16} />
```

### Несколько иконок

```tsx
import { CheckSVG, SearchSVG } from '@design-system/icons';

<CheckSVG size={24} />
<SearchSVG size={24} />
```


## Usage

### Подключение спрайта (один раз на странице)

```tsx
import { Sprite, SpriteSnackIconsSVG, SpriteProductIconsSVG, SpriteWebIconsSVG } from '@design-system/icons';

export function RootLayout({ children }) {
  return (
    <>
      <Sprite content={SpriteSnackIconsSVG as unknown as string} />
      <Sprite content={SpriteProductIconsSVG as unknown as string} />
      <Sprite content={SpriteWebIconsSVG as unknown as string} />
      {children}
    </>
  );
}
```

### Импорт и использование иконки

```tsx
import { CheckSVG, ArrowDownSVG } from '@design-system/icons';

export function Example() {
  return (
    <>
      <CheckSVG size={24} />
      <ArrowDownSVG size={16} className='my-icon' />
    </>
  );
}
```

### Иконки из Product Icons и Web Icons

```tsx
import { ProductIcons, WebIcons } from '@design-system/icons';

// Именованные экспорты: ProductIcons.AcceptSpriteSVG, WebIcons.ServerSpriteSVG и т.д.
export function Example() {
  const AcceptIcon = ProductIcons.AcceptSpriteSVG;
  const ServerIcon = WebIcons.ServerSpriteSVG;
  return (
    <>
      <AcceptIcon size={24} />
      <ServerIcon size={24} />
    </>
  );
}
```

## Props

### ISvgIconProps
| name | type | default value | description |
|------|------|---------------|-------------|
| size | `number` | 24 |  |
| className | `string` | - | CSS-класс |
| style | `CSSProperties` | - |  |
### SpriteProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `string` | - |  |

## Best Practices

1. **Единый размер в блоке** — в одном UI-блоке используйте один размер иконок (например, везде 24 или везде 16).
2. **Цвет через inherit** — иконки наследуют `fill` от родителя; задавайте цвет через `color` в CSS родителя.
3. **Sprite для множества иконок** — если на странице много разных иконок, подключайте спрайт один раз и используйте компоненты в режиме sprite для уменьшения разметки.
4. **Выбор режима** — sprite даёт меньше DOM-узлов; standalone удобен для изолированных виджетов или когда спрайт не используется.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

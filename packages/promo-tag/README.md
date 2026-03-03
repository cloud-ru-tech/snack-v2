# Promo Tag

Компонент промо-тега. Поддерживает текст, внешний вид (appearance), роль (role: accent, decor), размеры (xs, s, m), контент до/после текста (beforeContent, afterContent) и опциональный клик (onClick — рендерит кнопку). Состояния задаются через data-атрибуты для стилизации.

## Installation

```bash
npm install @design-system/promo-tag
# or
yarn add @design-system/promo-tag
# or
pnpm add @design-system/promo-tag
```

## Exports

```typescript
import {
  PromoTag,
  type PromoTagProps,
  APPEARANCE,
  SIZE,
  ROLE_APPEARANCE,
  type Appearance,
  type Size,
  type RoleAppearance
} from '@design-system/promo-tag';
```

## Live examples

### Basic usage

```tsx
import { APPEARANCE, PromoTag } from '@design-system/promo-tag';

<PromoTag text='−20%' />
<PromoTag text='Акция' appearance={APPEARANCE.Primary} />
<PromoTag text='Новинка' appearance={APPEARANCE.Green} />
```

### Appearances

```tsx
import { APPEARANCE, PromoTag } from '@design-system/promo-tag';

{Object.values(APPEARANCE).map(appearance => (
    <PromoTag text={appearance} appearance={appearance} />
))}
```

### Sizes

```tsx
import { PromoTag, SIZE } from '@design-system/promo-tag';

<PromoTag text='XS' size={SIZE.Xs} />
<PromoTag text='S' size={SIZE.S} />
<PromoTag text='M' size={SIZE.M} />
```

### Role

```tsx
import { APPEARANCE, PromoTag } from '@design-system/promo-tag';

<PromoTag text='Акцент' role={ROLE_APPEARANCE.Accent} appearance={APPEARANCE.Primary} />
<PromoTag text='Декоративный' role={ROLE_APPEARANCE.Decor} appearance={APPEARANCE.Primary} />
```

### Clickable

```tsx
import { APPEARANCE, PromoTag } from '@design-system/promo-tag';

<PromoTag text='Подробнее' onClick={() => {}} appearance={APPEARANCE.Primary} />
```


## Usage

### Basic example

```tsx
import { PromoTag } from '@design-system/promo-tag';

export function Example() {
  return <PromoTag text='−20%' />;
}
```

### With appearance and size

```tsx
import { PromoTag } from '@design-system/promo-tag';

export function Example() {
  return <PromoTag text='Акция' appearance='primary' size='s' role='accent' />;
}
```

### Clickable tag

```tsx
import { PromoTag } from '@design-system/promo-tag';

export function Example() {
  return <PromoTag text='Подробнее об акции' onClick={() => window.open('/promo')} />;
}
```

## Props

### PromoTagProps
| name | type | default value | description |
|------|------|---------------|-------------|
| text | `string` | - | Текст компонента |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| role | enum RoleAppearance: `"accent"`, `"decor"` | accent | Роль промо-тега |
| className | `string` | - | CSS-класс |
| onClick | `(e: MouseEvent<HTMLButtonElement, MouseEvent>) => void` | - | Колбэк для обработки клика на тег |
| beforeContent | `ReactNode` | - | Контент перед текстом |
| afterContent | `ReactNode` | - | Контент после текста |
| size | enum Size: `"xs"`, `"s"`, `"m"` | xs | Размер |

## Best Practices

1. **Краткий текст** — используйте короткие подписи («−20%», «Акция», «Новинка»), чтобы тег не перегружал интерфейс.
2. **Выбор appearance** — primary для основных акций, цветные варианты — для семантики (скидка, новинка, ограниченное предложение).
3. **role** — accent для акцентных промо на контрастном фоне, decor для декоративных тегов с прозрачным фоном.
4. **Размер** — xs в карточках и списках, s/m для крупных блоков и баннеров.
5. **Клик** — передавайте onClick только когда тег ведёт к действию (открытие модалки, переход); иначе оставляйте статичный тег (рендер как div).

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

# PromoTag

`@ds/promo-tag` — Промо-тег — цветной лейбл для маркетинговых акцентов, выделения категорий и статусных ярлыков. Опционально кликабельный.

Компактный цветной тег для маркетинговых подписей (`NEW`, `SALE`, `BETA`), категорий и акцентных меток. По умолчанию — `<div>`; при `onClick` — `<button>`; при `as='a'` или `as={Link}` — ссылка с пробросом `href` / `to`.

## Когда использовать
- Пометка карточки товара/услуги — новинка, скидка, хит.
- Цветовая категоризация в списках (темы, теги статей).
- Статусная метка, которая **не** несёт функциональной семантики (для статусов берите `Status`).

Когда **не** нужен: интерактивные chip'ы с удалением — берите `Chip`/`Tag`; функциональные статусы — берите `Status`.

## Анатомия

### Appearance
Цветовая палитра: `primary` — брендовый акцент, `neutral` — без окраски; `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink` — декоративные категории.

### Size
`xs` — плотные ленты/карточки; `s` — дефолт; `m` — для крупных промо-блоков.

### Role appearance
`accent` — насыщенная заливка (главные метки: новинка, sale); `decor` — мягкая декоративная подложка для категоризации и тегов.

## Установка
```bash
pnpm add @ds/promo-tag
```

```ts
import { PromoTag } from '@ds/promo-tag'
```

## Примеры использования
### Базовый тег

```tsx
import { PromoTag } from '@ds/promo-tag';

export function Basic() {
  // eslint-disable-next-line jsx-a11y/aria-role -- `role` здесь — пропс компонента PromoTag, не ARIA-атрибут
  return <PromoTag label='NEW' appearance='primary' role='accent' />;
}
```

### Палитра

Основные цветовые appearance.

```tsx
import { PromoTag } from '@ds/promo-tag';

export function Colors() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag label='Primary' appearance='primary' />
      <PromoTag label='Green' appearance='green' />
      <PromoTag label='Red' appearance='red' />
      <PromoTag label='Violet' appearance='violet' />
    </div>
  );
}
```

### Polymorphic

as=&apos;a&apos; с href или as={Link} с to — для react-router-dom и внешних ссылок.

```tsx
import { APPEARANCE, PromoTag, ROLE_APPEARANCE } from '@ds/promo-tag';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type MockLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { to: string };

const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ to, onClick, children, ...rest }, ref) => (
  <a ref={ref} href={to} onClick={onClick} {...rest}>
    {children}
  </a>
));
MockLink.displayName = 'MockLink';

export function Polymorphic() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag
        as='a'
        href='https://example.com'
        target='_blank'
        label='External promo'
        appearance={APPEARANCE.Blue}
        role={ROLE_APPEARANCE.Decor}
      />
      <PromoTag
        as={MockLink}
        to='https://example.com'
        label='Preview link'
        appearance={APPEARANCE.Primary}
        role={ROLE_APPEARANCE.Accent}
      />
    </div>
  );
}
```

## Props
**PromoTagProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `ReactNode` | `null` | Контент после текста |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | `primary` | Внешний вид |
| `as` | `T` | — | Элемент или компонент для рендера: 'button' \| 'a' \| Link из react-router-dom и т.п. |
| `beforeContent` | `ReactNode` | `null` | Контент перед текстом |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Явный проп вместо forwardRef — как в Button и AiToolBadge. |
| `label` | `string` | — | Текст компонента |
| `onClick` | `MouseEventHandler<HTMLElement>` | — | Колбэк для обработки клика на тег |
| `role` | `"accent"` \| `"decor"` | `accent` | Роль промо-тега |
| `size` | `"m"` \| `"s"` \| `"xs"` | `s` | Размер |

#### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

- `RoleAppearance` = `"accent"` \| `"decor"`

- `Size` = `"m"` \| `"s"` \| `"xs"`

# PromoTagPredefined

`@ds/uikit-product-promo-tag-predefined` — Предопределённый промо-тег продукта с локализованным текстом и tooltip — preview, connecting, partner.

Один компонент с преднастроенными пресетами промо-тега: **`PromoTag`** + **`Tooltip`**. Текст и подсказка локализуются через `@ds/locale`.

## Когда использовать

- Нужен стандартный product-тег Preview / Connecting / Partner без ручной сборки текста и tooltip.
- В карточках сервисов, виджетах и списках продуктов Cloud.ru.

Когда **не** нужен `PromoTagPredefined`:

- Произвольный текст и цвет — используйте **`PromoTag`** напрямую.

## Анатомия

### variant (обязательный)

- `preview` — синий тег «Preview»; tooltip зависит от `context`.
- `connecting` — neutral «Подключается».
- `partner` — orange «Partner».

### context (default `service`, только для `variant='preview'`)

- `service` — tooltip про сервис в Preview.
- `functional` — tooltip про функциональность в Preview.

### tooltip

- `placement` — позиция tooltip (default `top`).
- `trigger` — `hover` (default) или `click` (ось Figma `tooltipTrigger`).

## Установка

```bash
pnpm add @ds/uikit-product-promo-tag-predefined
```

```ts
import { PromoTagPredefined } from '@ds/uikit-product-promo-tag-predefined'
```

## Примеры использования

### Preview (service)

```tsx
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function PreviewService() {
  return <PromoTagPredefined variant={VARIANTS.Preview} context={PREVIEW_CONTEXT.Service} />;
}
```

### Preview (functional)

```tsx
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function PreviewFunctional() {
  return <PromoTagPredefined variant={VARIANTS.Preview} context={PREVIEW_CONTEXT.Functional} />;
}
```

### Connecting

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function Connecting() {
  return <PromoTagPredefined variant={VARIANTS.Connecting} />;
}
```

### Partner

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function Partner() {
  return <PromoTagPredefined variant={VARIANTS.Partner} />;
}
```

### Polymorphic

PromoTagPredefined как ссылка: as={Link} и to для react-router-dom.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
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
    <PortalContextProvider>
      <PromoTagPredefined
        as={MockLink}
        to='https://example.com'
        variant={VARIANTS.Preview}
        context={PREVIEW_CONTEXT.Service}
      />
    </PortalContextProvider>
  );
}
```

## Props

**PromoTagPredefinedProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `"functional"` \| `"service"` | `service` | Контекст тега с вариантом "preview" |
| `data-test-id` | `string` | — |  |
| `tooltip` | `TooltipProps` | — | Настройки тултипа |
| `variant` | `"connecting"` \| `"partner"` \| `"preview"` | — | Вариант промо-тега |

#### Related types

- `PreviewContext` = `"functional"` \| `"service"`

- `Variant` = `"connecting"` \| `"partner"` \| `"preview"`

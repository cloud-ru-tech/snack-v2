# PromoTagPredefined

`@ds/uikit-product-promo-tag-predefined` — Предопределённый промо-тег продукта с локализованным текстом и tooltip — пресеты product-статусов Cloud.ru.

Один компонент с преднастроенными пресетами промо-тега: **`PromoTag`** + **`Tooltip`**. Текст локализуется через `@ds/locale`; для части вариантов tooltip задаётся потребителем.

## Когда использовать

- Нужен стандартный product-тег (Preview, Connecting, Partner, Free tier и др.) без ручной сборки текста и внешнего вида.
- В карточках сервисов, виджетах и списках продуктов Cloud.ru.

Когда **не** нужен `PromoTagPredefined`:

- Произвольный текст и цвет — используйте **`PromoTag`** напрямую.

## Анатомия

### variant (обязательный)

- `preview` — синий тег «Preview»; tooltip зависит от `context`.
- `connecting` — neutral «Подключается»; обязательный `tooltip.onSupportClick`, фраза «обратитесь в поддержку» всегда ссылка.
- `partner` — orange «Partner».
- `freeTier` — синий «Free tier».
- `soon` — violet «Скоро»; опциональный кастомный `tooltip.tip`.
- `default` — primary «По умолчанию»; без tooltip.
- `latest` — primary «Latest»; опциональный кастомный `tooltip.tip`.
- `private` — green «Приватный»; опциональный кастомный `tooltip.tip`.
- `public` — синий «Публичный»; опциональный кастомный `tooltip.tip`.

### context (default `service`, только для `variant='preview'`)

- `service` — tooltip про сервис в Preview.
- `functional` — tooltip про функциональность в Preview.

### tooltip

- Для `partner` / `preview` / `freeTier` — опциональные `placement`, `trigger`, `open`, `onOpenChange`; текст tooltip встроенный.
- Для `connecting` — `tooltip` обязателен; обязательный `onSupportClick` (фраза поддержки всегда `Link`).
- Для `soon` / `latest` / `private` / `public` — `tooltip` опционален; если передан — `tip` обязателен. Без `tooltip` тултип не рендерится.
- Для `default` — проп недоступен (tooltip не рендерится).

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

Для connecting обязателен `tooltip.onSupportClick`: фраза «обратитесь в поддержку» всегда ссылка.

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { MouseEvent } from 'react';

function handleSupportClick(e: MouseEvent) {
  e.preventDefault();
}

export function Connecting() {
  return <PromoTagPredefined variant={VARIANTS.Connecting} tooltip={{ onSupportClick: handleSupportClick }} />;
}
```

### Partner

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function Partner() {
  return <PromoTagPredefined variant={VARIANTS.Partner} />;
}
```

### Free tier

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function FreeTier() {
  return <PromoTagPredefined variant={VARIANTS.FreeTier} />;
}
```

### Default (без tooltip)

```tsx
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

export function Default() {
  return <PromoTagPredefined variant={VARIANTS.Default} />;
}
```

### Кастомный tip

Для soon, latest, private и public tooltip опционален: без tooltip.tip тег рендерится без подсказки.

```tsx
import { Link } from '@ds/link';
import { Typography } from '@ds/typography';
import { PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Fragment, MouseEvent } from 'react';

const CUSTOM_TOOLTIP_CONTENT = `Demo content, for replacement, use the property: ◆Slot...
Connect your local component with unique content to this property`;

const customTipVariants = [VARIANTS.Soon, VARIANTS.Latest, VARIANTS.Private, VARIANTS.Public] as const;

function handleLinkClick(e: MouseEvent) {
  e.preventDefault();
}

function CustomTooltipTip() {
  return (
    <>
      <Typography variant='body' size='s' style={{ whiteSpace: 'pre-line' }}>
        {CUSTOM_TOOLTIP_CONTENT}
      </Typography>
      <Link underlined insideText appearance='invertNeutral' label='Link text' onClick={handleLinkClick} />
    </>
  );
}

export function CustomTip() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Typography variant='body' size='s'>
        Без тултипа
      </Typography>
      <Typography variant='body' size='s'>
        С тултипом
      </Typography>
      {customTipVariants.map(variant => (
        <Fragment key={variant}>
          <div>
            <PromoTagPredefined variant={variant} />
          </div>
          <div>
            <PromoTagPredefined variant={variant} tooltip={{ tip: <CustomTooltipTip /> }} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
```

## Props

**PromoTagPredefinedProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `"functional"` \| `"service"` | — | Контекст тега с вариантом "preview" |
| `data-test-id` | `string` | — |  |
| `tooltip` | `TooltipSettings` | — | Настройки тултипа <br/> Настройки тултипа; если передан — `tip` обязателен. Без `tooltip` тултип не рендерится |
| `variant` | `"connecting"` \| `"default"` \| `"freeTier"` \| `"latest"` \| `"partner"` \| `"preview"` \| `"private"` \| `"public"` \| `"soon"` | — | Вариант промо-тега |

#### Related types

**TooltipSettings**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpenChange` | `((isOpen: boolean) => void) \| undefined` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean \| undefined` | — | Управляет состоянием показан/не показан. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Положение поповера относительно своего триггера (children). |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |

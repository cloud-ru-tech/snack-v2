# Price summary

`@ds/uikit-product-price-summary` — Блоки итоговой цены для checkout и конфигураторов — полный PriceSummary и компактный PriceSummarySmall.

Пакет `@ds/uikit-product-price-summary` — итоговая стоимость заказа с периодом биллинга, скидками, детализацией позиций и состояниями загрузки/ошибки. Использует `@ds/uikit-product-button-predefined` для выбора периода и токены Product UI Kit.

## Установка

```bash
pnpm add @ds/uikit-product-price-summary
```

`ButtonDropdown` для периода входит в пакет через зависимость `@ds/uikit-product-button-predefined` — отдельно ставить не нужно.

```ts
import { PricePeriod, PriceSummary, PriceSummarySmall } from '@ds/uikit-product-price-summary'
```

## Состав пакета

- ****PriceSummary**** — полный блок: период (`ButtonDropdown`), сумма, скидки, аккордеон деталей заказа, ссылка на расчёт.
- ****PriceSummarySmall**** — компактный итог (`size=small` в Figma): метка, сумма, опциональная function-ссылка.

## Когда какой использовать

| Задача

## PriceSummary

Блок итоговой цены с периодом, скидками, детализацией заказа и ссылкой на расчёт.

Итоговая цена для checkout и конфигураторов: заголовок с периодом (`ButtonDropdown`), базовая сумма, скидки, аккордеон деталей заказа, состояния `loading` / `dataError` и ссылка на расчёт.

### Демо

{/* client:only — @cloud-ru/ft-formatters не для SSR */}

### Когда использовать

- Страница заказа или боковая панель с полной детализацией цены.
- Нужен выбор периода биллинга (`period` + `periodOptions`) и callback `onPeriodChanged`.
- Требуется раскрываемый список позиций заказа (`invoice`) со скидками по строкам.

Когда **не** нужен `PriceSummary`:

- Достаточно одной строки «Итого» без аккордеона и периода — **`PriceSummarySmall`**.
- Только выпадающий список периода без блока цены — **`ButtonDropdown`**.

### Анатомия

Корневой контейнер с acrylic-фоном (`@ds/materials`) и внутренними секциями:

#### HeaderBlock

Строка «Итого» + период. При нескольких `periodOptions` рендерится `ButtonDropdown` (desktop — `Droplist`, mobile — modal). При одном периоде — статический текст.

#### ContentBlock

Обёртка контента с состояниями:

- `loading` — спиннер вместо контента.
- `dataError` — сообщение и кнопка retry (`onRetry`).
- иначе — дочерние блоки ниже.

#### DiscountBlock

Опционально при `discount`: базовая цена и строки скидок с процентами.

#### TotalValueBlock

Крупная сумма (`value`), префикс `totalSumType='from'`, подсказки (`hint`, `hintTooltipText`), дельта (`valueDelta`).

#### InvoiceBlock

Опционально при `invoice`: аккордеон «Детали заказа» с секциями и позициями.

#### docsLink

Function-ссылка внизу блока (по умолчанию текст из locale).

#### layoutType

`desktop` | `mobile` — пробрасывается в период, invoice и вложенные ячейки.

### Примеры использования

{/* client:only — @cloud-ru/ft-formatters не для SSR */}

#### Со скидкой

Базовая цена и строки скидок.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PRICE_PERIOD, PriceSummary } from '@ds/uikit-product-price-summary';
import { useRef } from 'react';

import styles from '../demoSurface.module.scss';

export function WithDiscount() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummary
            value={10800}
            period={PRICE_PERIOD.Month}
            periodOptions={[PRICE_PERIOD.Month]}
            discount={{
              price: 12000,
              discounts: [{ value: 1200, percent: 10 }],
            }}
          />
        </div>
      </div>
    </PortalContextProvider>
  );
}
```

#### С детализацией заказа

Аккордеон с invoice-секциями.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PRICE_PERIOD } from '@ds/uikit-product-price-summary';
import { useRef } from 'react';

import styles from '../demoSurface.module.scss';
import { PriceSummaryControlled } from '../PriceSummaryControlled';

export function WithInvoice() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummaryControlled
            value={10800}
            period={PRICE_PERIOD.Month}
            periodOptions={[PRICE_PERIOD.Month, PRICE_PERIOD.Year]}
            invoice={[
              {
                title: 'Compute',
                items: [{ label: 'vCPU', price: 8000, primary: true }],
              },
            ]}
          />
        </div>
      </div>
    </PortalContextProvider>
  );
}
```

### Props

**PriceSummaryProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс корневого контейнера. |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — |  |
| `discount` | `DiscountDetails` | — | Блок базовой цены и скидок. |
| `docsLink` | `LinkProps` | — | Ссылка «Подробнее о расчёте». |
| `hint` | `string` | — |  |
| `hintAppearance` | `"default"` \| `"systemError"` \| `"userError"` \| `"warning"` | — |  |
| `hintLink` | `{ href?: string; text: string; }` | — |  |
| `hintTooltipText` | `ReactNode` | — |  |
| `invoice` | `InvoiceDetails` | — | Секции детализации заказа в аккордеоне. |
| `invoiceExpandedDefault` | `boolean` | `true` | Начальное состояние раскрытия аккордеона invoice. |
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `loading` | `boolean` | — |  |
| `onPeriodChanged` | `PricePeriod` | — |  |
| `onRetry` | `(() => void)` | — |  |
| `period` | `"day"` \| `"hour"` \| `"minute"` \| `"month"` \| `"year"` | — |  |
| `periodOptions` | `PricePeriod` | — |  |
| `promoBadge` | `PromoTagOwnProps` \| `PromoTagProps` | — |  |
| `showHintLink` | `boolean` | — |  |
| `showHintTooltip` | `boolean` | `false` |  |
| `totalSumType` | `"equal"` \| `"from"` | — |  |
| `value` | `number` | — |  |
| `valueDelta` | `PriceDeltaDetails` | — |  |

##### Related types

- `AppearanceState` = `"default"` \| `"systemError"` \| `"userError"` \| `"warning"`

**DiscountDetails**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `discounts` | `DiscountItem` | — | Список применённых скидок. |
| `price` | `number` | — | Базовая цена до применения скидок. |

**DiscountInvoiceItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `discount` | `DiscountItem` | — | Скидка без собственной цены. |

**DiscountItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percent` | `number \| undefined` | — | Процент скидки для бейджа `−N%`. |
| `tooltip` | `QuestionTooltipProps` | — | Контент тултипа-пояснения к скидке. |
| `value` | `number` | — | Сумма скидки в валюте (в UI выводится со знаком «−»). |

**InvoiceDetails**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DiscountInvoiceItem` \| `InvoiceItem` \| `PriceInvoiceItem` | — | Строки секции детализации. |
| `price` | `number \| undefined` | — | Цена секции детализации. |
| `quantity` | `string \| number \| undefined` | — | Количество рядом с заголовком секции. |
| `title` | `string \| undefined` | — | Заголовок секции детализации. |

- `InvoiceItem` = `PrimaryInvoiceItem | SecondaryInvoiceItem`

**PriceDeltaDetails**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"decreased"` \| `"increased"` | — | Тип изменения: повышение или снижение. |
| `value` | `number` | — | Величина изменения цены. |

**PriceInvoiceItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `discount` | `DiscountItem` | — | Скидка для строки с ценой. |
| `label` | `string` | — | Подпись строки детализации. |

- `PricePeriod` = `"day"` \| `"hour"` \| `"minute"` \| `"month"` \| `"year"`

- `TotalSumType` = `"equal"` \| `"from"`

## PriceSummarySmall

Компактный блок итога с ссылкой на стоимость.

Компактный вариант Figma `price-summary-small`: метка «Итого», сумма и опциональная function-ссылка. Без выбора периода, скидок и аккордеона invoice.

### Демо

{/* client:only — @cloud-ru/ft-formatters не для SSR */}

### Когда использовать

- Узкая колонка или карточка, где нужен только итог и ссылка «Стоимость» / «Подробнее».
- Состояния `loading` и `dataError` с `onRetry` — как у полного `PriceSummary`, но без детализации.

Когда **не** подходит:

- Нужен период, скидки или раскрываемый заказ — **`PriceSummary`**.

### Анатомия

#### Заголовок

Текст `total` из locale («Итого»).

#### Сумма

`Typography` headline + `formatCurrency(value)`.

#### docsLink

Опциональная `Button` `view='function'` со ссылкой (`docsLink.href`, `docsLink.text` или locale `costLink`).

#### ContentBlock

Те же `loading` / `dataError` / `onRetry`, что и у `PriceSummary`.

### Примеры использования

{/* client:only — @cloud-ru/ft-formatters не для SSR */}

#### Итог со ссылкой

Итог и ссылка на стоимость.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { useRef } from 'react';

import { FIGMA_SHOWCASE_SMALL_ARGS } from '../stories/PriceSummarySmall/constants';
import styles from './demoSurface.module.scss';

export function PriceSummarySmallDemo() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummarySmall {...FIGMA_SHOWCASE_SMALL_ARGS} />
        </div>
      </div>
    </PortalContextProvider>
  );
}
```

#### Загрузка

Состояние loading — skeleton вместо суммы.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { useRef } from 'react';

import styles from '../demoSurface.module.scss';

export function SmallLoading() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummarySmall value={undefined} loading />
        </div>
      </div>
    </PortalContextProvider>
  );
}
```

#### Ошибка данных

dataError с onRetry: повторный запрос показывает loading и затем сумму.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { useRef, useState } from 'react';

import styles from '../demoSurface.module.scss';

export function SmallError() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(true);

  const handleRetry = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setDataError(false);
    }, 800);
  };

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummarySmall value={10800} loading={loading} dataError={dataError} onRetry={handleRetry} />
        </div>
      </div>
    </PortalContextProvider>
  );
}
```

### Props

**PriceSummarySmallProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс корневого контейнера. |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — |  |
| `docsLink` | `LinkProps` | — | Function-ссылка внизу блока. |
| `hintTooltipText` | `ReactNode` | — | Контент подсказки для иконки рядом с итоговой суммой. |
| `loading` | `boolean` | — |  |
| `onRetry` | `(() => void)` | — |  |
| `value` | `number` | `0` | Итоговая сумма. |

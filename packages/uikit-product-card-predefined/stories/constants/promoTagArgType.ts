import { CardPromoTagProps } from '@ds/uikit-product-card-predefined';
import { VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { ValueOf } from '@ds/utils';
import { fn } from 'storybook/test';

/**
 * Ключ пресета — то, что реально хранится в `args.promoTag` до того, как Storybook применит
 * `mapping`. Тип пропа `promoTag` при этом не меняем — `meta`/`Story` остаются типизированы под
 * реальный `CardPromoTagProps`, а несовпадение снимается одним точечным кастом в месте
 * присвоения `args.promoTag` (см. использование в Playground-story).
 */
export type PromoTagPresetKey = ValueOf<typeof VARIANTS>;

// Спред массива `[key, value][]` в объект (`{...arr}`) даёт числовые ключи по индексу, а не
// `preview`/`connecting`/…, поэтому пары собираются через `Object.fromEntries`, не спредом.
const PROMO_TAG_MAPPING = {
  ...(Object.fromEntries(Object.values(VARIANTS).map(variant => [variant, { variant }])) as Record<
    ValueOf<typeof VARIANTS>,
    CardPromoTagProps
  >),
  // `connecting` — единственный вариант с обязательным `tooltip.onSupportClick`, переопределяем
  // generic-запись выше.
  [VARIANTS.Connecting]: { variant: VARIANTS.Connecting, tooltip: { onSupportClick: fn() } },
} satisfies Record<PromoTagPresetKey, CardPromoTagProps | undefined>;

export const PROMO_TAG_ARG_TYPE = {
  control: 'select' as const,
  options: Object.keys(PROMO_TAG_MAPPING),
  mapping: PROMO_TAG_MAPPING,
};

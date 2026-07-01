import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { PRICE_PERIOD, PriceSummary } from '@ds/uikit-product-price-summary';

export function MobileLayout() {
  return (
    <div style={{ maxWidth: 360 }}>
      <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
        <PriceSummary
          value={10800}
          period={PRICE_PERIOD.Month}
          periodOptions={[PRICE_PERIOD.Month, PRICE_PERIOD.Year]}
          discount={{
            price: 12000,
            discounts: [{ value: 1200, percent: 10 }],
          }}
          hint='Дополнительная информация'
          hintTooltipText='Итоговая сумма с учётом скидки за выбранный период.'
        />
      </AdaptiveProvider>
    </div>
  );
}

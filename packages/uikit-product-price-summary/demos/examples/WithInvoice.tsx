import { PRICE_PERIOD } from '@ds/uikit-product-price-summary';

import styles from '../demoSurface.module.scss';
import { PriceSummaryControlled } from '../PriceSummaryControlled';

export function WithInvoice() {
  return (
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
  );
}

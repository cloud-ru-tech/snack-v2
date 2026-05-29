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

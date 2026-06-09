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

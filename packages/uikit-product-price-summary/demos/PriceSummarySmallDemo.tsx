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

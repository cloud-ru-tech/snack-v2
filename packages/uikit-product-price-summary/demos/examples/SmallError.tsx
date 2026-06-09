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

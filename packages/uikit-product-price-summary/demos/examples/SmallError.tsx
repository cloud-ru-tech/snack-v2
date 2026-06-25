import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { useState } from 'react';

import styles from '../demoSurface.module.scss';

export function SmallError() {
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
    <div className={styles.surface}>
      <PriceSummarySmall value={10800} loading={loading} dataError={dataError} onRetry={handleRetry} />
    </div>
  );
}

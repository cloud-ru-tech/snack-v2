import { PriceSummarySmall } from '@ds/uikit-product-price-summary';

import styles from '../demoSurface.module.scss';

export function SmallLoading() {
  return (
    <div className={styles.surface}>
      <PriceSummarySmall value={undefined} loading />
    </div>
  );
}

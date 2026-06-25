import { PriceSummarySmall } from '@ds/uikit-product-price-summary';

import { FIGMA_SHOWCASE_SMALL_ARGS } from '../stories/PriceSummarySmall/constants';
import styles from './demoSurface.module.scss';

export function PriceSummarySmallDemo() {
  return (
    <div className={styles.surface}>
      <PriceSummarySmall {...FIGMA_SHOWCASE_SMALL_ARGS} />
    </div>
  );
}

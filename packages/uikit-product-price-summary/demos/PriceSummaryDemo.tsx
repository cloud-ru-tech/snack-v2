import { FIGMA_SHOWCASE_ARGS } from '../stories/PriceSummary/constants';
import styles from './demoSurface.module.scss';
import { PriceSummaryControlled } from './PriceSummaryControlled';

export function PriceSummaryDemo() {
  return (
    <div className={styles.surface}>
      <PriceSummaryControlled {...FIGMA_SHOWCASE_ARGS} periodOptions={[...FIGMA_SHOWCASE_ARGS.periodOptions]} />
    </div>
  );
}

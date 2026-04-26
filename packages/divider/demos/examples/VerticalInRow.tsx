import { Divider } from '@ds/divider';

import styles from './VerticalInRow.module.scss';

export function VerticalInRow() {
  return (
    <div className={styles.row}>
      <span className={styles.label}>Left</span>
      <div className={styles.dividerCell}>
        <Divider orientation='vertical' />
      </div>
      <span className={styles.label}>Right</span>
    </div>
  );
}

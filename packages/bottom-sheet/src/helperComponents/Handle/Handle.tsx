import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

/** Drag-индикатор сверху bottom-sheet'а (32×4px). Декоративный — `aria-hidden`. */
export function Handle() {
  return (
    <div className={styles.wrapper} aria-hidden>
      <span className={styles.handle} data-test-id={TEST_IDS.handle} />
    </div>
  );
}

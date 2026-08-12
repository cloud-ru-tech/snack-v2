import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

export function SlotContent() {
  return (
    <span className={styles.slotContent} data-test-id={TEST_IDS.dropzone.slotContent}>
      # slot content
    </span>
  );
}

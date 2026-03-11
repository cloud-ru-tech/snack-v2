import { Popover } from '@design-system/popover';

import styles from './styles.module.scss';

export function PopoverBasicExample() {
  return (
    <Popover trigger='click' placement='right' content={<div className={styles.popoverContent}>Контент поповера</div>}>
      <button type='button'>Открыть поповер</button>
    </Popover>
  );
}

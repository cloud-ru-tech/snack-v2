import { PopoverPrivate } from '@design-system/popover-private';

import styles from './styles.module.scss';

export function PopoverBasicExample() {
  return (
    <PopoverPrivate
      trigger='click'
      placement='right'
      popoverContent={<div className={styles.popoverContent}>Контент поповера</div>}
    >
      <button type='button'>Открыть поповер</button>
    </PopoverPrivate>
  );
}

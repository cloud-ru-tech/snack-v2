import { Tooltip } from '@ds/tooltip';

import styles from './TooltipDemo.module.scss';

export function TooltipDemo() {
  return (
    <div className={styles.root}>
      <Tooltip tip='Подсказка сверху' placement='top'>
        <button type='button' className={styles.button}>
          Top
        </button>
      </Tooltip>
      <Tooltip tip='Подсказка справа' placement='right'>
        <button type='button' className={styles.button}>
          Right
        </button>
      </Tooltip>
      <Tooltip tip='Подсказка снизу' placement='bottom'>
        <button type='button' className={styles.button}>
          Bottom
        </button>
      </Tooltip>
      <Tooltip tip='Подсказка слева' placement='left'>
        <button type='button' className={styles.button}>
          Left
        </button>
      </Tooltip>
    </div>
  );
}

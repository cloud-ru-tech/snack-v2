import { TrashSVG } from '@ds/icons/interface/system';

import styles from './Color.module.scss';

export function Color() {
  return (
    <div className={styles.row}>
      <span className={styles.main}>
        <TrashSVG size={24} aria-label='Основной цвет' />
      </span>
      <span className={styles.accent}>
        <TrashSVG size={24} aria-label='Акцентный цвет' />
      </span>
      <span className={styles.critical}>
        <TrashSVG size={24} aria-label='Критический цвет' />
      </span>
    </div>
  );
}

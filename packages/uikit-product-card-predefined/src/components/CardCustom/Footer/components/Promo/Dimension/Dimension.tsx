import { Size, useCardContext } from '@ds/card';
import { Typography, VARIANT } from '@ds/typography';

import { TYPOGRAPHY_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export type DimensionProps = {
  /** Единица измерения */
  dimension?: string;
  /** Текущее значение */
  currentValue: string;
  /** Старое значение */
  oldValue?: string;
  /** Размер */
  size?: Size;
};

export function Dimension({ dimension, currentValue, oldValue, size: sizeProp }: DimensionProps) {
  const { radius } = useCardContext();
  const size = TYPOGRAPHY_SIZE_MAP[sizeProp ?? radius];

  return (
    <div className={styles.wrapper}>
      {dimension && (
        <Typography as='span' variant={VARIANT.title} size={size} className={styles.dimension}>
          {dimension}
        </Typography>
      )}
      <div className={styles.valueContainer}>
        <Typography as='span' variant={VARIANT.title} size={size} className={styles.currentValue}>
          {currentValue}
        </Typography>

        {oldValue && (
          <Typography as='span' variant={VARIANT.body} size='s' className={styles.oldValue}>
            {oldValue}
          </Typography>
        )}
      </div>
    </div>
  );
}

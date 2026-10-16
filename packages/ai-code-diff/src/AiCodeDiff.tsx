import { ValueOf } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type Size = ValueOf<typeof SIZE>;

export type AiCodeDiffProps = {
  /** Количество добавленных строк. Целое неотрицательное число, знак `+` ставит компонент. */
  added: number;
  /** Количество удалённых строк. Целое неотрицательное число, знак `-` ставит компонент. */
  removed: number;
  /**
   * Типографика.
   * @default m
   */
  size?: Size;
  /**
   * Разделитель между added и removed.
   * @default /
   */
  separator?: string;
  className?: string;
  'data-test-id'?: string;
};

export function AiCodeDiff({
  added,
  removed,
  size = SIZE.M,
  separator = '/',
  className,
  'data-test-id': dataTestId,
}: AiCodeDiffProps) {
  return (
    <span className={cn(styles.root, className)} data-size={size} data-test-id={dataTestId}>
      <span className={styles.added} data-test-id={TEST_IDS.added}>
        +{added}
      </span>
      <span className={styles.separator} data-test-id={TEST_IDS.separator}>
        {separator}
      </span>
      <span className={styles.removed} data-test-id={TEST_IDS.removed}>
        -{removed}
      </span>
    </span>
  );
}

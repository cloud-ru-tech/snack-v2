import { CrossSVG } from '@ds/icons';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ButtonCloseProps = WithSupportProps<{
  /** Действие при клике */
  onClick(): void;
  /** CSS-класс */
  className?: string;
}>;

export function ButtonClose({ onClick, className, ...rest }: ButtonCloseProps) {
  return (
    <button
      type='button'
      className={cn(styles.root, className)}
      onClick={onClick}
      aria-label='close modal'
      data-test-id={TEST_IDS.closeButton}
      {...extractSupportProps(rest)}
    >
      <div className={styles.stateLayer} aria-hidden data-state='onColorFilled' />
      <CrossSVG />
    </button>
  );
}

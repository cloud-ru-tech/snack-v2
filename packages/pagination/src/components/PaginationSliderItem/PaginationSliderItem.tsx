import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { Ref } from 'react';

import { PaginationSliderSize } from '../../types';
import styles from './styles.module.scss';

export type PaginationSliderItemProps = WithSupportProps<{
  activated?: boolean;
  onClick(): void;
  size: PaginationSliderSize;
  setButtonRef?: Ref<HTMLButtonElement>;
}>;

export function PaginationSliderItem({ activated, onClick, size, setButtonRef, ...rest }: PaginationSliderItemProps) {
  return (
    <button
      type='button'
      className={styles.root}
      onClick={onClick}
      ref={setButtonRef}
      data-size={size}
      {...extractSupportProps(rest)}
      data-activated={activated || undefined}
      aria-current={activated ? 'true' : undefined}
    >
      <span className={styles.dot} aria-hidden>
        {!activated && <span data-state-layer aria-hidden data-state='regularFilled' />}
      </span>
    </button>
  );
}

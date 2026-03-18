import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { State } from '../../types';
import { SIZE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Size, Variant } from './types';

export type SampleBlockProps = WithSupportProps<{
  /** Содержимое */
  children: ReactNode;
  /** Вариант */
  variant?: Variant;
  /** Размер */
  size?: Size;
  /** Состояние */
  state?: State;
  /** СSS-класс */
  className?: string;
}>;

export function SampleBlock({
  children,
  size = SIZE.L,
  state,
  variant = VARIANT.Simple,
  className,
  ...rest
}: SampleBlockProps) {
  return (
    <div
      className={cn(styles.block, className)}
      data-variant={variant}
      data-size={size}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
      {...extractSupportProps(rest)}
    >
      <div data-acrylic-background />
      {variant === VARIANT.Outline && <div className={styles.borderLayer} />}
      {state && <div className={styles.stateLayer} data-state={state} />}
      <div className={styles.contentLayer} data-state={state}>
        {children}
      </div>
    </div>
  );
}

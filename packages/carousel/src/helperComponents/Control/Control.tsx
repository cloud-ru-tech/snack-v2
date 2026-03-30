import { Button } from '@design-system/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@design-system/icons';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type ControlProps = WithSupportProps<{
  onClick?(): void;
  direction: 'prev' | 'next';
  className?: string;
}>;

export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  ({ onClick, direction, className, ...rest }: ControlProps, ref) => (
    <Button
      innerRef={ref}
      className={cn(styles.control, className)}
      onClick={onClick}
      size='m'
      view='elevated'
      appearance='neutral'
      type='button'
      data-direction={direction}
      icon={
        direction === 'prev' ? (
          <ChevronLeftSVG size={24} className={styles.icon} />
        ) : (
          <ChevronRightSVG size={24} className={styles.icon} />
        )
      }
      {...extractSupportProps(rest)}
    />
  ),
);

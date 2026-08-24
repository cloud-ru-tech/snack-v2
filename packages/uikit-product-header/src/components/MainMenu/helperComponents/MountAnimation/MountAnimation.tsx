import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export type MountAnimationProps = PropsWithChildren<
  WithSupportProps<{
    type?: 'fade-slide-up' | 'fade-slide-up-right' | 'slide-right' | 'fade-in';
    className?: string;
  }>
>;

export function MountAnimation({ children, type = 'slide-right', className, ...props }: MountAnimationProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(props)} data-animation-type={type}>
      {children}
    </div>
  );
}

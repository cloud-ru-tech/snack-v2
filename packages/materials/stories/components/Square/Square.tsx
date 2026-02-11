import cn from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

export type SquareProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Square({ children, className, ...rest }: SquareProps) {
  return (
    <div className={cn(styles.square, className)} {...rest}>
      {children}
    </div>
  );
}

import cn from 'classnames';
import { CSSProperties, MouseEvent, ReactNode } from 'react';

import { useTableContext } from '../../contexts';
import { DataAttributes } from '../types';
import styles from './styles.module.scss';

export type RowProps = {
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  className?: string;
  rowAutoHeight?: boolean;
  style?: CSSProperties;
} & DataAttributes;

export function Row({ onClick, children, className, rowAutoHeight, style, ...attributes }: RowProps) {
  const { fullWidth = true } = useTableContext();

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      onClick={onClick}
      className={cn(styles.tableRow, className)}
      data-auto-height={rowAutoHeight || undefined}
      data-fit-content={!fullWidth || undefined}
      role='row'
      style={style}
      {...attributes}
    >
      {children}
    </div>
  );
}

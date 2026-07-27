import cn from 'classnames';
import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { useTableContext } from '../../contexts';
import { DataAttributes } from '../types';
import styles from './styles.module.scss';

export type RowProps = {
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  /** Строка интерактивна (есть onRowClick) — получает фокус с клавиатуры и активацию Enter/Space. */
  clickable?: boolean;
  className?: string;
  rowAutoHeight?: boolean;
  style?: CSSProperties;
} & DataAttributes;

export function Row({ onClick, clickable, children, className, rowAutoHeight, style, ...attributes }: RowProps) {
  const { fullWidth = true } = useTableContext();

  const handleKeyDown = clickable
    ? (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Активация с клавиатуры: синтезируем нативный click — тот же путь, что мышью.
          e.preventDefault();
          e.currentTarget.click();
        }
      }
    : undefined;

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
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

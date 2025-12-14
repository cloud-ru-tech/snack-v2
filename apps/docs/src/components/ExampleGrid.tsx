import cn from 'classnames';
import React from 'react';
import styles from './ExampleGrid.module.scss';

interface ExampleGridProps {
  children: React.ReactNode;
  minColumnWidth?: string;
  gap?: 'small' | 'medium' | 'large' | string;
  columns?: number;
}

export const ExampleGrid: React.FC<ExampleGridProps> = ({
  children,
  minColumnWidth = '100px',
  gap = 'medium',
  columns,
}) => {
  const gapClass =
    gap === 'small'
      ? styles.gridGapSmall
      : gap === 'medium'
        ? styles.gridGapMedium
        : gap === 'large'
          ? styles.gridGapLarge
          : undefined;

  return (
    <div
      className={cn(styles.grid, !columns && styles.gridAutoFit, gapClass)}
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : minColumnWidth !== '100px'
            ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
            : undefined,
        ...(typeof gap === 'string' && gap !== 'small' && gap !== 'medium' && gap !== 'large'
          ? { gap }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

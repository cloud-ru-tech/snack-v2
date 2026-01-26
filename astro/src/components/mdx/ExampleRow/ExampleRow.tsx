import cn from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

interface ExampleRowProps {
  children: React.ReactNode;
  gap?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end';
}

export const ExampleRow: React.FC<ExampleRowProps> = ({
  children,
  gap = 'medium',
  alignItems = 'center',
  justifyContent,
}) => {
  const gapClass =
    gap === 'small'
      ? styles.rowGapSmall
      : gap === 'medium'
        ? styles.rowGapMedium
        : gap === 'large'
          ? styles.rowGapLarge
          : gap === 'xlarge'
            ? styles.rowGapXLarge
            : undefined;

  const alignItemsClass =
    alignItems === 'start'
      ? styles.rowAlignStart
      : alignItems === 'center'
        ? styles.rowAlignCenter
        : alignItems === 'end'
          ? styles.rowAlignEnd
          : undefined;

  const justifyContentClass =
    justifyContent === 'start'
      ? styles.rowJustifyStart
      : justifyContent === 'center'
        ? styles.rowJustifyCenter
        : justifyContent === 'end'
          ? styles.rowJustifyEnd
          : undefined;

  return (
    <div
      className={cn(styles.row, gapClass, alignItemsClass, justifyContentClass)}
      style={
        typeof gap === 'string' &&
        gap !== 'small' &&
        gap !== 'medium' &&
        gap !== 'large' &&
        gap !== 'xlarge'
          ? { gap }
          : undefined
      }
    >
      {children}
    </div>
  );
};

import cn from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

interface ExampleItemProps {
  children: React.ReactNode;
  label?: string;
  labelSize?: 'small' | 'medium' | 'large' | string;
  gap?: 'small' | 'medium' | 'large' | string;
}

export const ExampleItem: React.FC<ExampleItemProps> = ({
  children,
  label,
  labelSize = 'small',
  gap = 'small',
}) => {
  const gapClass =
    gap === 'small'
      ? styles.itemGapSmall
      : gap === 'medium'
        ? styles.itemGapMedium
        : gap === 'large'
          ? styles.itemGapLarge
          : undefined;

  const labelSizeClass =
    labelSize === 'small'
      ? styles.labelSmall
      : labelSize === 'medium'
        ? styles.labelMedium
        : labelSize === 'large'
          ? styles.labelLarge
          : undefined;

  return (
    <div
      className={cn(styles.item, gapClass)}
      style={
        typeof gap === 'string' && gap !== 'small' && gap !== 'medium' && gap !== 'large'
          ? { gap }
          : undefined
      }
    >
      <div className={styles.itemWrapper}>{children}</div>
      {label && (
        <span
          className={cn(styles.label, labelSizeClass)}
          style={
            typeof labelSize === 'string' &&
            labelSize !== 'small' &&
            labelSize !== 'medium' &&
            labelSize !== 'large'
              ? { fontSize: labelSize }
              : undefined
          }
        >
          {label}
        </span>
      )}
    </div>
  );
};

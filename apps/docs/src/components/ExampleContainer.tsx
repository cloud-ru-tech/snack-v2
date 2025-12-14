import cn from 'classnames';
import React from 'react';
import styles from './ExampleContainer.module.scss';

interface ExampleContainerProps {
  children: React.ReactNode;
  padding?: 'small' | 'large' | string;
  marginBottom?: 'small' | 'large' | string;
}

export const ExampleContainer: React.FC<ExampleContainerProps> = ({
  children,
  padding = 'small',
  marginBottom = 'large',
}) => {
  const paddingClass =
    padding === 'small'
      ? styles.containerPaddingSmall
      : padding === 'large'
        ? styles.containerPaddingLarge
        : undefined;

  const marginBottomClass =
    marginBottom === 'small'
      ? styles.containerMarginSmall
      : marginBottom === 'large'
        ? styles.containerMarginLarge
        : undefined;

  return (
    <div
      className={cn(styles.container, paddingClass, marginBottomClass)}
      style={
        typeof padding === 'string' && padding !== 'small' && padding !== 'large'
          ? { padding }
          : typeof marginBottom === 'string' && marginBottom !== 'small' && marginBottom !== 'large'
            ? { marginBottom }
            : undefined
      }
    >
      {children}
    </div>
  );
};

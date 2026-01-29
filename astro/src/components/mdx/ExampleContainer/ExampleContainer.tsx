import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type ExampleContainerProps = {
  children: React.ReactNode;
  padding?: 'small' | 'large' | string;
  marginBottom?: 'small' | 'large' | string;
};

const PADDING_CLASS_MAP = {
  small: styles.containerPaddingSmall,
  large: styles.containerPaddingLarge,
} as const;

const MARGIN_CLASS_MAP = {
  small: styles.containerMarginSmall,
  large: styles.containerMarginLarge,
} as const;

function isPresetPadding(p: ExampleContainerProps['padding']): p is 'small' | 'large' {
  return p === 'small' || p === 'large';
}

function isPresetMargin(m: ExampleContainerProps['marginBottom']): m is 'small' | 'large' {
  return m === 'small' || m === 'large';
}

export function ExampleContainer({ children, padding = 'small', marginBottom = 'large' }: ExampleContainerProps) {
  const style: React.CSSProperties | undefined =
    !isPresetPadding(padding) || !isPresetMargin(marginBottom)
      ? {
          ...(!isPresetPadding(padding) && padding ? { padding } : {}),
          ...(!isPresetMargin(marginBottom) && marginBottom ? { marginBottom } : {}),
        }
      : undefined;
  const hasStyle = style && Object.keys(style).length > 0;

  return (
    <div
      className={cn(
        styles.container,
        isPresetPadding(padding) && PADDING_CLASS_MAP[padding],
        isPresetMargin(marginBottom) && MARGIN_CLASS_MAP[marginBottom],
      )}
      style={hasStyle ? style : undefined}
    >
      {children}
    </div>
  );
}

import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type GapPreset = 'small' | 'medium' | 'large';

type ExampleGridProps = {
  children: React.ReactNode;
  minColumnWidth?: string;
  gap?: GapPreset | string;
  columns?: number;
};

const GAP_CLASS_MAP: Record<GapPreset, string> = {
  small: styles.gridGapSmall,
  medium: styles.gridGapMedium,
  large: styles.gridGapLarge,
};

function isPresetGap(gap: ExampleGridProps['gap']): gap is GapPreset {
  return typeof gap === 'string' && (gap === 'small' || gap === 'medium' || gap === 'large');
}

export function ExampleGrid({ children, minColumnWidth = '100px', gap = 'medium', columns }: ExampleGridProps) {
  const customGap = typeof gap === 'string' && !isPresetGap(gap) ? (gap as string) : undefined;
  const useAutoFit = columns == null;

  const style: React.CSSProperties = {
    ...(columns != null && { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }),
    ...(useAutoFit &&
      minColumnWidth !== '100px' && {
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
      }),
    ...(customGap && { gap: customGap }),
  };
  const hasStyle = Object.keys(style).length > 0;

  return (
    <div
      className={cn(styles.grid, useAutoFit && styles.gridAutoFit, isPresetGap(gap) && GAP_CLASS_MAP[gap])}
      style={hasStyle ? style : undefined}
    >
      {children}
    </div>
  );
}

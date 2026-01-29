import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type GapPreset = 'small' | 'medium' | 'large' | 'xlarge';
type AlignPreset = 'start' | 'center' | 'end';

type ExampleRowProps = {
  children: React.ReactNode;
  gap?: GapPreset | string;
  alignItems?: AlignPreset;
  justifyContent?: AlignPreset;
};

const GAP_CLASS_MAP: Record<GapPreset, string> = {
  small: styles.rowGapSmall,
  medium: styles.rowGapMedium,
  large: styles.rowGapLarge,
  xlarge: styles.rowGapXLarge,
};

const ALIGN_CLASS_MAP: Record<AlignPreset, string> = {
  start: styles.rowAlignStart,
  center: styles.rowAlignCenter,
  end: styles.rowAlignEnd,
};

const JUSTIFY_CLASS_MAP: Record<AlignPreset, string> = {
  start: styles.rowJustifyStart,
  center: styles.rowJustifyCenter,
  end: styles.rowJustifyEnd,
};

function isPresetGap(gap: ExampleRowProps['gap']): gap is GapPreset {
  return typeof gap === 'string' && (gap === 'small' || gap === 'medium' || gap === 'large' || gap === 'xlarge');
}

export function ExampleRow({ children, gap = 'medium', alignItems = 'center', justifyContent }: ExampleRowProps) {
  const customGap = typeof gap === 'string' && !isPresetGap(gap) ? (gap as string) : undefined;

  return (
    <div
      className={cn(
        styles.row,
        isPresetGap(gap) && GAP_CLASS_MAP[gap],
        ALIGN_CLASS_MAP[alignItems],
        justifyContent != null && JUSTIFY_CLASS_MAP[justifyContent],
      )}
      style={customGap ? { gap: customGap } : undefined}
    >
      {children}
    </div>
  );
}

import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './styles.module.scss';

type GapPreset = 'small' | 'medium' | 'large';
type LabelSizePreset = 'small' | 'medium' | 'large';

type ExampleItemProps = {
  children: ReactNode;
  label?: string;
  labelSize?: LabelSizePreset | string;
  gap?: GapPreset | string;
};

const GAP_CLASS_MAP: Record<GapPreset, string> = {
  small: styles.itemGapSmall,
  medium: styles.itemGapMedium,
  large: styles.itemGapLarge,
};

const LABEL_SIZE_CLASS_MAP: Record<LabelSizePreset, string> = {
  small: styles.labelSmall,
  medium: styles.labelMedium,
  large: styles.labelLarge,
};

function isPresetGap(gap: ExampleItemProps['gap']): gap is GapPreset {
  return typeof gap === 'string' && (gap === 'small' || gap === 'medium' || gap === 'large');
}

function isPresetLabelSize(size: ExampleItemProps['labelSize']): size is LabelSizePreset {
  return typeof size === 'string' && (size === 'small' || size === 'medium' || size === 'large');
}

export function ExampleItem({ children, label, labelSize = 'small', gap = 'small' }: ExampleItemProps) {
  const customGap = typeof gap === 'string' && !isPresetGap(gap) ? (gap as string) : undefined;
  const customLabelSize =
    typeof labelSize === 'string' && !isPresetLabelSize(labelSize) ? (labelSize as string) : undefined;

  return (
    <div
      className={cn(styles.item, isPresetGap(gap) && GAP_CLASS_MAP[gap])}
      style={customGap ? { gap: customGap } : undefined}
    >
      <div className={styles.itemWrapper}>{children}</div>
      {label && (
        <span
          className={cn(styles.label, isPresetLabelSize(labelSize) && LABEL_SIZE_CLASS_MAP[labelSize])}
          style={customLabelSize ? { fontSize: customLabelSize } : undefined}
        >
          {label}
        </span>
      )}
    </div>
  );
}

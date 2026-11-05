import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, useCallback } from 'react';

import { APPEARANCE } from '../../constants';
import { Appearance, Size, TabsSegmentedItem } from '../../types';
import styles from './styles.module.scss';

// Figma: stateLayer вкладки по оформлению и выбору.
const STATE_LAYER: Record<Appearance, { selected: string; default: string }> = {
  [APPEARANCE.Default]: { selected: 'emptyInversionOnColor', default: 'emptyNeutralOnBackground' },
  [APPEARANCE.OnAccent]: { selected: 'emptyDarkOnAccent', default: 'emptyNeutralOnBackground' },
};

export type SegmentProps = TabsSegmentedItem & {
  size: Size;
  appearance: Appearance;
  selected: boolean;
  tabbable: boolean;
  onSelect(value: string): void;
  onFocusSegment(value: string): void;
};

/** Вкладка ряда `TabsSegmented` (Figma `tabSegmentV2`). */
export function Segment({
  value,
  label,
  disabled,
  className,
  size,
  appearance,
  selected,
  tabbable,
  onClick,
  onSelect,
  onFocusSegment,
  ...rest
}: SegmentProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onSelect(value);
    },
    [onClick, onSelect, value],
  );

  const handleFocus = useCallback(() => onFocusSegment(value), [onFocusSegment, value]);

  return (
    <button
      type='button'
      role='tab'
      aria-selected={selected}
      tabIndex={tabbable ? 0 : -1}
      disabled={disabled}
      className={cn(styles.segment, className)}
      data-size={size}
      data-appearance={appearance}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      onClick={handleClick}
      onFocus={handleFocus}
      {...extractSupportProps(rest)}
    >
      <span
        className={styles.stateLayer}
        data-state={selected ? STATE_LAYER[appearance].selected : STATE_LAYER[appearance].default}
        aria-hidden
      />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

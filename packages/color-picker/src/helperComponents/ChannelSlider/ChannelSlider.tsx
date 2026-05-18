import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEvent, PointerEvent, useRef } from 'react';

import { Size } from '../../types';
import styles from './styles.module.scss';

export type ChannelSliderProps = WithSupportProps<{
  value: number;
  min?: number;
  max?: number;
  step?: number;
  gradient: string;
  alpha?: boolean;
  thumbColor?: string;
  size?: Size;
  disabled?: boolean;
  onChange(value: number): void;
}>;

export function ChannelSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  gradient,
  alpha,
  thumbColor,
  size,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-valuetext': ariaValueText,
  ...rest
}: ChannelSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const fraction = max === min ? 0 : (value - min) / (max - min);

  const commitFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const usable = Math.max(rect.width - 1, 1);
    const f = Math.max(0, Math.min(1, (clientX - rect.left) / usable));
    onChange(min + f * (max - min));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    commitFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    commitFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const bigStep = step * 10;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        onChange(Math.max(min, value - step));
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        onChange(Math.min(max, value + step));
        event.preventDefault();
        break;
      case 'PageDown':
        onChange(Math.max(min, value - bigStep));
        event.preventDefault();
        break;
      case 'PageUp':
        onChange(Math.min(max, value + bigStep));
        event.preventDefault();
        break;
      case 'Home':
        onChange(min);
        event.preventDefault();
        break;
      case 'End':
        onChange(max);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={trackRef}
      className={cn(styles.track, alpha && styles.alpha)}
      style={{ '--gradient': gradient }}
      data-size={size}
      data-disabled={disabled || undefined}
      role='slider'
      aria-label={ariaLabel}
      aria-orientation='horizontal'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={ariaValueText}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      {...extractSupportProps(rest)}
    >
      <div className={styles.thumb} style={{ '--fraction': fraction, '--thumb-color': thumbColor }} />
    </div>
  );
}

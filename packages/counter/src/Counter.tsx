import cn from 'classnames';

import { APPEARANCE, SIZE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Appearance, Size, Variant } from './types';
import { formatCounterValue } from './utils';

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Значение счетчика */
  value: number;
  /** Внешний вид (цвет) */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Вариант отображения: accent (solid) или decor (light) */
  variant?: Variant;
  /** Максимальное значение для отображения (по умолчанию 999) */
  maxValue?: number;
  /** CSS-класс */
  className?: string;
}

/**
 * Компонент счетчика для отображения числовых значений.
 * Поддерживает различные размеры, варианты отображения и цветовые схемы.
 * Автоматически форматирует большие числа (99+, 1K, 2K и т.д.)
 */
export function Counter({
  value,
  appearance = APPEARANCE.Neutral,
  size = SIZE.Xs,
  variant = VARIANT.Accent,
  maxValue = 999,
  className,
  ...rest
}: CounterProps) {
  const formattedValue = formatCounterValue(value, maxValue);

  return (
    <span
      className={cn(styles.counter, className)}
      data-size={size}
      data-appearance={appearance}
      data-variant={variant}
      {...rest}
    >
      <span className={styles.text}>{formattedValue}</span>
    </span>
  );
}

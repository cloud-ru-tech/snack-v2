import cn from 'classnames';

import { APPEARANCE, STATUS_INDICATOR_SIZE } from '../constants';
import { Appearance, StatusIndicatorSize } from '../types';
import styles from './styles.module.scss';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Внешний вид (цвет) */
  appearance?: Appearance;
  /** Размер индикатора */
  size?: StatusIndicatorSize;
  /** CSS-класс */
  className?: string;
}

/**
 * Компонент индикатора статуса - простой круглый индикатор для отображения статуса.
 * Поддерживает различные размеры и цветовые схемы.
 */
export function StatusIndicator({
  appearance = APPEARANCE.Primary,
  size = STATUS_INDICATOR_SIZE.Xs,
  className,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(styles.statusIndicator, className)}
      data-size={size}
      data-appearance={appearance}
      {...rest}
    />
  );
}





















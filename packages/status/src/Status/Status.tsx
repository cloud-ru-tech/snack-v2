import cn from 'classnames';

import { APPEARANCE, STATUS_INDICATOR_SIZE, STATUS_SIZE } from '../constants';
import { StatusIndicator } from '../StatusIndicator';
import { Appearance, StatusSize } from '../types';
import styles from './styles.module.scss';

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Текст статуса */
  children: React.ReactNode;
  /** Внешний вид (цвет) */
  appearance?: Appearance;
  /** Размер статуса */
  size?: StatusSize;
  /** CSS-класс */
  className?: string;
}

/**
 * Компонент статуса - бейдж с индикатором и текстом для отображения статуса.
 * Поддерживает различные размеры и цветовые схемы.
 */
export function Status({
  children,
  appearance = APPEARANCE.Primary,
  size = STATUS_SIZE.Xs,
  className,
  ...rest
}: StatusProps) {
  return (
    <div
      className={cn(styles.status, className)}
      data-size={size}
      data-appearance={appearance}
      {...rest}
    >
      <div className={styles.textWrapper}>
        <StatusIndicator
          appearance={appearance}
          size={
            size === STATUS_SIZE.Xs ? STATUS_INDICATOR_SIZE['3Xs'] : STATUS_INDICATOR_SIZE['2Xs']
          }
        />
        <span className={styles.text}>{children}</span>
      </div>
    </div>
  );
}





















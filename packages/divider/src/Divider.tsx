import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { ORIENTATION, VARIANT } from './constants';
import styles from './styles.module.scss';
import { DividerOrientation, DividerVariant } from './types';

export type DividerProps = WithSupportProps<{
  /** Вариант толщины линии (regular: 1px, thin: 0.5px). По умолчанию: regular */
  variant?: DividerVariant;
  /** Ориентация: горизонтальная или вертикальная. По умолчанию: horizontal */
  orientation?: DividerOrientation;
  /** CSS-класс */
  className?: string;
}>;

/**
 * Divider — разделитель контента.
 *
 * Поддерживает:
 * - Две ориентации: горизонтальная (по умолчанию) и вертикальная
 * - Два варианта толщины: regular (1px) и thin (0.5px)
 * - Семантику ARIA: role="separator" + aria-orientation
 */
export function Divider({
  variant = VARIANT.Regular,
  orientation = ORIENTATION.Horizontal,
  className,
  ...rest
}: DividerProps) {
  return (
    <div
      role='separator'
      aria-orientation={orientation}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-orientation={orientation}
      {...extractSupportProps(rest)}
    >
      <div className={styles.line} />
    </div>
  );
}

import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';
import type { DividerOrientation, DividerVariant } from './types';

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
 * Повторяет структуру из Figma: контейнер (relative) + слой линии (absolute).
 * Стили из @sbercloud/figma-variables (anatomy container + line regular/thin).
 */
export function Divider({ variant = 'regular', orientation = 'horizontal', className, ...rest }: DividerProps) {
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

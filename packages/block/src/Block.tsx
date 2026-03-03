import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import { SIZE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Size, Variant } from './types';

export type BlockProps = {
  /** Содержимое */
  children: ReactNode;
  /** Вариант */
  variant?: Variant;
  /** Размер */
  size?: Size;
} & Omit<HTMLProps<HTMLDivElement>, 'size'>;

/**
 * Компонент-слот для отображения любого содержимого на подложке, имитирующей материал (матовое/полупрозрачное стекло).
 *
 * Поддерживает:
 * - Акриловый фон с эффектом backdrop blur
 * - Различные варианты отображения: simple (обычный акрил), outline (с обводкой), shadow (с тенью), transparent (полупрозрачное матовое стекло)
 * - Различные размеры: s (малый), m (средний), l (большой)
 * - Гибкое содержимое - принимает любые React children
 *
 * @example
 * ```tsx
 * // Базовое использование
 * <Block>
 *   <span>Your content here</span>
 * </Block>
 *
 * // С вариантом и размером
 * <Block variant={VARIANT.Shadow} size={SIZE.L}>
 *   <h3>Card Title</h3>
 *   <p>Card content with shadow effect</p>
 * </Block>
 *
 * // Различные варианты
 * <Block variant={VARIANT.Simple} size={SIZE.M}>
 *   Simple acrylic
 * </Block>
 * <Block variant={VARIANT.Outline} size={SIZE.M}>
 *   With outline
 * </Block>
 * <Block variant={VARIANT.Transparent} size={SIZE.M}>
 *   Transparent matte glass
 * </Block>
 * ```
 */
export function Block({ children, variant = VARIANT.Simple, size = SIZE.L, className, ...rest }: BlockProps) {
  return (
    <div
      className={cn(styles.block, className)}
      data-variant={variant}
      data-size={size}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
      {...rest}
    >
      <div data-acrylic-background />
      {variant === VARIANT.Outline && <div className={styles.borderLayer} />}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

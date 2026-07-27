import {
  BACKGROUND_PREDEFINED_FILL,
  type BackgroundPredefinedFill,
  backgroundPredefinedFillToAcrylic,
} from '@ds/materials';
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
  /**
   * Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
   * По умолчанию `material/neutralBackground1Level`.
   */
  backgroundPredefined?: BackgroundPredefinedFill;
  /** Стабильный идентификатор для e2e/tests */
  'data-test-id'?: string;
} & Omit<HTMLProps<HTMLDivElement>, 'size'>;

/**
 * Компонент-слот для отображения любого содержимого на подложке, имитирующей материал (матовое/полупрозрачное стекло).
 *
 * Поддерживает:
 * - Акриловый фон с эффектом backdrop blur
 * - Различные варианты отображения: simple (обычный акрил), outline (с обводкой), elevated (с тенью), transparent (полупрозрачное матовое стекло)
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
 * <Block variant={VARIANT.Elevated} size={SIZE.L}>
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
export function Block({
  children,
  variant = VARIANT.Simple,
  size = SIZE.M,
  backgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  className,
  ...rest
}: BlockProps) {
  const { appearance, level } = backgroundPredefinedFillToAcrylic(backgroundPredefined);

  return (
    <div
      className={cn(styles.block, className)}
      data-variant={variant}
      data-size={size}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      {...rest}
    >
      <div className={styles.acrylic} />
      {variant === VARIANT.Outline && <div className={styles.borderLayer} />}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

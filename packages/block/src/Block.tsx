import {
  BACKGROUND_PREDEFINED_FILL,
  type BackgroundPredefinedFill,
  backgroundPredefinedFillToAcrylic,
} from '@ds/materials';
import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import { SIZE, VIEW } from './constants';
import styles from './styles.module.scss';
import { Size, View } from './types';

export type BlockProps = {
  /** Содержимое */
  children: ReactNode;
  /** Визуальный режим поверхности */
  view?: View;
  /** Размер */
  size?: Size;
  /**
   * Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
   * Задаёт палитру подложки: цвета, `transparent` и `decorTransparent`.
   * По умолчанию `material/neutralBackground1Level`.
   */
  backgroundPredefined?: BackgroundPredefinedFill;
  /** Стабильный идентификатор для e2e/tests */
  'data-test-id'?: string;
  /**
   * Класс на внутренний слот содержимого (`.content`). Block — подложка, а не layout-контейнер
   * (`display: block`); раскладку контента задаёт потребитель. Этот проп даёт управлять слотом
   * содержимого напрямую — напр. растянуть его по высоте блока (`flex`/`height`), когда корень
   * блока сделан flex-контейнером через `className`.
   */
  contentClassName?: string;
} & Omit<HTMLProps<HTMLDivElement>, 'size'>;

/**
 * Компонент-слот для отображения любого содержимого на подложке, имитирующей материал (матовое/полупрозрачное стекло).
 *
 * Поддерживает:
 * - Акриловый фон с эффектом backdrop blur
 * - Визуальные режимы: simple (обычный акрил), outline (с обводкой), elevated (с тенью)
 * - Палитру подложек через `backgroundPredefined`: цвета, `transparent` и `decorTransparent`
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
 * // С визуальным режимом и размером
 * <Block view={VIEW.Elevated} size={SIZE.L}>
 *   <h3>Card Title</h3>
 *   <p>Card content with shadow effect</p>
 * </Block>
 *
 * // Режимы и подложки
 * <Block view={VIEW.Simple} size={SIZE.M}>
 *   Simple acrylic
 * </Block>
 * <Block view={VIEW.Outline} size={SIZE.M}>
 *   With outline
 * </Block>
 * <Block backgroundPredefined={BACKGROUND_PREDEFINED_FILL.DecorTransparent} size={SIZE.M}>
 *   Transparent matte glass
 * </Block>
 * ```
 */
export function Block({
  children,
  view = VIEW.Simple,
  size = SIZE.M,
  backgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  className,
  contentClassName,
  ...rest
}: BlockProps) {
  const { appearance, level } = backgroundPredefinedFillToAcrylic(backgroundPredefined);

  return (
    <div
      className={cn(styles.block, className)}
      data-view={view}
      data-size={size}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      {...rest}
    >
      <div className={styles.acrylic} />
      {view === VIEW.Outline && <div className={styles.borderLayer} />}
      <div className={cn(styles.content, contentClassName)}>{children}</div>
    </div>
  );
}

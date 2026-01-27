import cn from 'classnames';
import { forwardRef } from 'react';

import { DEFAULT_SIZE, DEFAULT_VARIANT, DEFAULT_WEIGHT, VARIANT } from './constants';
import styles from './styles.module.scss';
import type { TypographySize, TypographyVariant, TypographyWeight } from './types';

export type TypographyProps = {
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Вариант типографики */
  variant?: TypographyVariant;
  /** Размер типографики */
  size?: TypographySize;
  /** Начертание шрифта */
  weight?: TypographyWeight;
  /** HTML тег для рендеринга */
  as?: React.ElementType;
  /** CSS-класс */
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Определяет HTML тег по умолчанию на основе варианта
 */
function getDefaultTag(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case VARIANT.display:
    case VARIANT.headline:
      return 'h1';
    case VARIANT.title:
      return 'h2';
    case VARIANT.label:
      return 'label';
    case VARIANT.body:
    default:
      return 'p';
  }
}

/**
 * Typography компонент
 *
 * Компонент типографики, использующий стили из @sbercloud/figma-variables.
 * Поддерживает различные варианты (display, headline, title, label, body),
 * размеры (s, m, l) и начертания (regular, thin, mono).
 *
 * @example
 * ```tsx
 * // Базовое использование
 * <Typography>Текст</Typography>
 *
 * // С вариантом и размером
 * <Typography variant="headline" size="l">
 *   Заголовок
 * </Typography>
 *
 * // С начертанием
 * <Typography variant="body" weight="thin">
 *   Тонкий текст
 * </Typography>
 *
 * // С кастомным тегом
 * <Typography as="h1" variant="display" size="l">
 *   Главный заголовок
 * </Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      weight = DEFAULT_WEIGHT,
      as,
      className,
      ...rest
    },
    ref
  ) => {
    const Component = as || getDefaultTag(variant);

    return (
      <Component
        ref={ref}
        className={cn(styles.typography, className)}
        data-variant={variant}
        data-size={size}
        data-weight={weight}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

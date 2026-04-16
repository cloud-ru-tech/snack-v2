import { extractSupportProps, getThemeClassnames, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { type HTMLAttributes, useEffect, useState } from 'react';

import { APPEARANCE, SHAPE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Shape, Size } from './types';
import { getAbbreviation } from './utils';

export type AvatarProps = WithSupportProps<{
  /** Имя пользователя для генерации аббревиатуры */
  name: string;
  /** URL изображения аватара */
  src?: string;
  /** Внешний вид (цвет) */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Форма: круглая или квадратная */
  shape?: Shape;
  /** Отображение двух заглавных символов имени вместо одного */
  showTwoSymbols?: boolean;
  /** CSS-класс */
  className?: string;
}> &
  HTMLAttributes<HTMLDivElement>;

/**
 * Компонент отображения аватара пользователя.
 *
 * Поддерживает:
 * - Отображение изображения аватара (с fallback на аббревиатуру)
 * - Генерацию аббревиатуры из имени пользователя (1 или 2 символа)
 * - Различные размеры: xs, s, m, l, 3xl, 6xl, 10xl
 * - Различные формы: круглая (round) или квадратная (square)
 * - Различные цветовые схемы: neutral, primary, red, orange, yellow, green, blue, violet, pink
 *
 * @example
 * ```tsx
 * // Базовое использование с именем
 * <Avatar name="John Doe" />
 *
 * // С изображением
 * <Avatar name="John Doe" src="https://example.com/avatar.jpg" />
 *
 * // С кастомными параметрами
 * <Avatar
 *   name="Jane Smith"
 *   appearance={APPEARANCE.Primary}
 *   size={SIZE.Xl}
 *   shape={SHAPE.Square}
 *   showTwoSymbols
 * />
 * ```
 */
export function Avatar({
  name,
  src,
  appearance = APPEARANCE.Neutral,
  size = SIZE.S,
  shape = SHAPE.Round,
  showTwoSymbols = false,
  className,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const numberOfSymbols = showTwoSymbols ? 2 : 1;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <div
      className={cn(styles.avatar, className)}
      data-size={size}
      data-appearance={appearance}
      data-shape={shape}
      {...extractSupportProps(rest)}
    >
      {src && !imageError ? (
        <img className={styles.image} src={src} onError={() => setImageError(true)} alt='' aria-hidden='true' />
      ) : (
        <>
          <div className={cn(styles.abbreviation, getThemeClassnames({ platform: 'desktop' }))}>
            {getAbbreviation(name, numberOfSymbols)}
          </div>
          <div className={styles.border} />
        </>
      )}
    </div>
  );
}

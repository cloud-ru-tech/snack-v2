import { type WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { type HTMLAttributes, useEffect, useState } from 'react';

import { APPEARANCE, SHAPE, SIZE } from './constants';
import styles from './styles.module.scss';
import type { Appearance, Shape, Size } from './types';
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
      {...rest}
    >
      {src && !imageError ? (
        <img
          className={styles.image}
          src={src}
          onError={() => setImageError(true)}
          alt=''
          aria-hidden='true'
          data-test-id='image'
        />
      ) : (
        <>
          <div className={styles.abbreviation} data-test-id='abbreviation'>
            {getAbbreviation(name, numberOfSymbols)}
          </div>
          <div className={styles.border} data-test-id='border' />
        </>
      )}
    </div>
  );
}

import cn from 'classnames';
import { useEffect, useState } from 'react';

import { APPEARANCE, SHAPE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Shape, Size } from './types';
import { getAbbreviation } from './utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

/**
 * Компонент отображения аватара пользователя.
 * Поддерживает изображения, аббревиатуры из имени, различные размеры, формы и цвета.
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
          alt=""
          aria-hidden="true"
        />
      ) : (
        <div className={styles.abbreviation}>{getAbbreviation(name, numberOfSymbols)}</div>
      )}
    </div>
  );
}

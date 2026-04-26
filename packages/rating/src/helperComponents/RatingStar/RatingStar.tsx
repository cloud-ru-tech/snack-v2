import { StarFilledSVG } from '@ds/icons';
import cn from 'classnames';
import { KeyboardEventHandler } from 'react';

import { APPEARANCE, SIZE } from '../../constants';
import { Appearance, Size } from '../../types';
import { VALUE } from './constants';
import styles from './styles.module.scss';
import { Value } from './types';

export type RatingStarProps = {
  /** Значение */
  value?: Value;
  /** Размер */
  size?: Size;
  /** Внешний вид (цветовая схема) */
  appearance?: Appearance;
  /** Является ли поле доступным на изменение */
  readonly?: boolean;
  /** CSS-класс */
  className?: string;
  /** Действие при наведении мыши */
  handleMouseEnter?(value: Value): void;
  /** Действие при уведении мыши */
  handleMouseLeave?(): void;
  /** Действие при нажатии на клавишу клавиатуры */
  handleKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  /** Действие при клике части звезды мышью */
  handleClick?(value: Value): void;
};

/**
 * Компонент RatingStar
 */

export function RatingStar({
  value = VALUE.Zero,
  appearance = APPEARANCE.Yellow,
  size = SIZE.S,
  className,
  readonly = false,
  handleMouseEnter,
  handleMouseLeave,
  handleKeyDown,
  handleClick,
}: RatingStarProps) {
  return (
    <div
      className={cn(styles.ratingStar, className)}
      onKeyDown={handleKeyDown}
      tabIndex={readonly ? undefined : 0}
      data-value={value}
      data-size={size}
      data-appearance={appearance}
      aria-checked={value !== VALUE.Zero}
      role={readonly ? undefined : 'radio'}
    >
      <div className={styles.firstStarContainer}>
        <StarFilledSVG
          className={styles.icon}
          onMouseEnter={handleMouseEnter ? () => handleMouseEnter(VALUE.Half) : undefined}
          onMouseLeave={handleMouseLeave || undefined}
          onClick={handleClick ? () => handleClick(VALUE.Half) : undefined}
        />
      </div>
      <div className={styles.secondStarContainer}>
        <StarFilledSVG
          className={styles.icon}
          onMouseEnter={handleMouseEnter ? () => handleMouseEnter(VALUE.Full) : undefined}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick ? () => handleClick(VALUE.Full) : undefined}
        />
      </div>
    </div>
  );
}

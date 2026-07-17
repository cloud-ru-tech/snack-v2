import { StarFilledSVG } from '@ds/icons/interface/system';
import cn from 'classnames';
import { KeyboardEventHandler } from 'react';

import { APPEARANCE, SIZE, TEST_IDS } from '../../constants';
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
  /** Стабильный идентификатор для e2e */
  'data-test-id'?: string;
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
  'data-test-id': dataTestId,
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
      data-test-id={dataTestId}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- click-handler на обёртке нужен,
          чтобы клик по любому месту половинки (включая SVG-иконку с её pointer-events) вызывал onClick.
          Сама звезда (родитель) имеет role='radio' и tabIndex — это публичный интерактив. */}
      <div
        className={styles.firstStarContainer}
        data-test-id={dataTestId ? TEST_IDS.starHalfLeft : undefined}
        onMouseEnter={handleMouseEnter ? () => handleMouseEnter(VALUE.Half) : undefined}
        onMouseLeave={handleMouseLeave || undefined}
        onClick={handleClick ? () => handleClick(VALUE.Half) : undefined}
      >
        <StarFilledSVG className={styles.icon} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.secondStarContainer}
        data-test-id={dataTestId ? TEST_IDS.starHalfRight : undefined}
        onMouseEnter={handleMouseEnter ? () => handleMouseEnter(VALUE.Full) : undefined}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick ? () => handleClick(VALUE.Full) : undefined}
      >
        <StarFilledSVG className={styles.icon} />
      </div>
    </div>
  );
}

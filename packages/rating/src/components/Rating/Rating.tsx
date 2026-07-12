import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { KeyboardEventHandler, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { APPEARANCE, DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT, SIZE, TEST_IDS } from '../../constants';
import { RatingStar, Value } from '../../helperComponents';
import { Appearance, Size } from '../../types';
import { getRatingStarValue, getStarValue } from '../../utils';

export type RatingProps = WithSupportProps<{
  /** Размер */
  size?: Size;
  /** Внешний вид (цветовая схема) */
  appearance?: Appearance;
  /** Общее количество звезд */
  count: number;
  /** Значение количества звезд в случае необходимости управления */
  value?: number;
  /** Количество звезд, заполненных по умолчанию */
  defaultValue?: number;
  /** Показывать или нет рейтинг в виде половины звезды */
  allowHalf: boolean;
  /** Разрещает сброс рейтинга при повторном нажатии на звезду */
  allowClear: boolean;
  /** Является ли поле доступным на изменение */
  readonly: boolean;
  /** Колбек, вызываемый на смену состояния */
  onChange?(value: number): void;
  /** CSS-класс */
  className?: string;
}>;

/**
 * Компонент Rating
 */

export function Rating({
  count = DEFAULT_STAR_COUNT,
  value,
  defaultValue = DEFAULT_RATING_VALUE,
  allowHalf = false,
  allowClear = false,
  readonly = false,
  appearance = APPEARANCE.Yellow,
  size = SIZE.S,
  className,
  onChange,
  ...rest
}: RatingProps) {
  const [hoverRating, setHoverRating] = useState<null | number>(null);
  const [rating, setRating] = useUncontrolledProp(value, defaultValue, onChange);

  function getRating(updatedValue: number): number {
    return rating === updatedValue && allowClear ? 0 : updatedValue;
  }

  const handleMouseEnter = (starIndex: number) => (value: Value) => {
    if (readonly) {
      return;
    }
    setHoverRating(getStarValue(starIndex, value, allowHalf));
  };

  const handleMouseLeave = () => {
    if (readonly) {
      return;
    }
    setHoverRating(null);
  };

  const handleClick = (starIndex: number) => (value: Value) => {
    if (readonly) {
      return;
    }

    setRating(getRating(getStarValue(starIndex, value, allowHalf)));
  };

  const handleKeyDown: (index: number) => KeyboardEventHandler<HTMLDivElement> = (starIndex: number) => e => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.stopPropagation();
      setRating(getRating(starIndex));
    }
  };

  return (
    <div className={className} {...extractSupportProps(rest)}>
      {[...Array(count)].map((_, index) => {
        const starIndex = index + 1;
        const value = getRatingStarValue(starIndex, hoverRating ?? rating, allowHalf);

        return (
          <RatingStar
            key={index}
            value={value}
            size={size}
            readonly={readonly}
            appearance={appearance}
            handleMouseEnter={handleMouseEnter(starIndex)}
            handleMouseLeave={handleMouseLeave}
            handleKeyDown={handleKeyDown(starIndex)}
            handleClick={handleClick(starIndex)}
            data-test-id={`${TEST_IDS.star}-${starIndex}`}
          />
        );
      })}
    </div>
  );
}

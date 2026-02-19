import { HALF_STAR_VALUE } from './constants';
import { VALUE, Value } from './helperComponents/RatingStar';

export function getRatingStarValue(starIndex: number, rating: number, allowHalf: boolean): Value {
  const diff = rating - starIndex;

  if (diff >= 0) {
    return VALUE.Full;
  }

  if (allowHalf && diff === HALF_STAR_VALUE * -1) {
    return VALUE.Half;
  }

  return VALUE.Zero;
}

export function getStarValue(starIndex: number, value: Value, allowHalf: boolean): number {
  return allowHalf && value === VALUE.Half ? starIndex - HALF_STAR_VALUE : starIndex;
}

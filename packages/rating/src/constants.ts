export const APPEARANCE = {
  Primary: 'primary',
  Neutral: 'neutral',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
} as const;

export const SIZE = {
  Xs: 'xs',
  S: 's',
} as const;

export const TEST_IDS = {
  root: 'rating',
  star: 'rating__star',
  starHalfLeft: 'rating__star-half-left',
  starHalfRight: 'rating__star-half-right',
} as const;

export const DEFAULT_STAR_COUNT = 5;
export const DEFAULT_RATING_VALUE = 0;
export const HALF_STAR_VALUE = 0.5;

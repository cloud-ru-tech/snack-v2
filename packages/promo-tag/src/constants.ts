import { TypographySize } from '@ds/typography';

import { Size } from './types';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
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
  M: 'm',
} as const;

export const ROLE_APPEARANCE = {
  Accent: 'accent',
  Decor: 'decor',
} as const;

export const MAP_SIZE_TO_TYPOGRAPHY_SIZE: Record<Size, TypographySize> = {
  [SIZE.Xs]: 's',
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
} as const;

export const TEST_IDS = {
  root: 'promo-tag',
} as const;

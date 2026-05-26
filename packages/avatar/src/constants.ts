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
  L: 'l',
  '3Xl': '3xl',
  '6Xl': '6xl',
  '10Xl': '10xl',
} as const;

export const SHAPE = {
  Rounded: 'rounded',
  Squared: 'squared',
} as const;

export const TEST_IDS = {
  root: 'avatar',
  image: 'avatar__image',
  abbreviation: 'avatar__abbreviation',
  border: 'avatar__border',
  badge: 'avatar__badge',
  statusIndicator: 'avatar__status-indicator',
} as const;

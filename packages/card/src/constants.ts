export const RADIUS = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

/** Алиас `RADIUS` для обратной совместимости с Snack UI Kit Card API. */
export const SIZE = RADIUS;

export const VIEW = {
  Simple: 'simple',
  Outline: 'outline',
  Elevated: 'elevated',
} as const;

export const TEST_IDS = {
  root: 'card',
  checkBadge: 'card__check-badge',
} as const;

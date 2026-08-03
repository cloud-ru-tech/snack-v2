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
  emblemPicture: 'card__header__emblem-picture',
  emblemIcon: 'card__header__emblem-icon',
  title: 'card__header__title',
  description: 'card__header__description',
  metadata: 'card__header__metadata',
  functionBadge: 'card__function-badge',
  droplist: 'card__function-badge-droplist',
} as const;

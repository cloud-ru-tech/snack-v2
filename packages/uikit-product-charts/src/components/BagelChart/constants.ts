/** Уровень заполненности кольца: определяет цвет сегмента. */
export const BAGEL_LEVEL = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
} as const;

/** Границы уровней в процентах от `total`: до 50 — low, до 75 — medium, выше — high. */
export const BAGEL_LEVEL_THRESHOLDS = {
  Medium: 50,
  High: 75,
} as const;

export const MAX_VALUE = 9_999_999;
export const MAX_TOTAL = 999_999_999;

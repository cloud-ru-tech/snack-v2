/** В терминах Figma / дизайн-системы: compact = плотная раскладка, comfort = комфортная (мобильная вёрстка + density comfort). */
export const LAYOUT_TYPE = {
  Compact: 'compact',
  Comfort: 'comfort',
} as const;

/** Позиция строки в списке (мобильный `MobileInfoRow`): влияет на padding и разделители. */
export const POSITION = {
  Inner: 'inner',
  First: 'first',
  Last: 'last',
} as const;

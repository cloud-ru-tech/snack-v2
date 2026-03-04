export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const ALIGN = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

export const TEST_IDS = {
  icon: 'info-block__icon',
  title: 'info-block__title',
  description: 'info-block__description',
  footer: 'info-block__footer',
};

export const SIZE_TO_ICON_SIZE = {
  s: 'm' as const,
  m: 'l' as const,
  l: '5xl' as const,
};

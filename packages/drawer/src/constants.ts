export const TEST_IDS = {
  closeButton: 'drawer__close-button',
  header: 'drawer__header',
  title: 'drawer__title',
  image: 'drawer__image',
  tooltip: 'drawer__title-tooltip',
  subtitle: 'drawer__subtitle',
  body: 'drawer__body',
  footer: 'drawer__footer',
  nestedDrawer: 'drawer__nested',
};

export const WIDTH = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const WIDTH_AS_VALUES: string[] = Object.values(WIDTH);

export const POSITION = {
  Left: 'left',
  Right: 'right',
  Top: 'top',
  Bottom: 'bottom',
} as const;

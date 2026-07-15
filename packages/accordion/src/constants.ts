export const VIEW = {
  Simple: 'simple',
  Outline: 'outline',
  Elevated: 'elevated',
} as const;

export const CHEVRON_POSITION = {
  Before: 'before',
  After: 'after',
} as const;

export const SELECTION_MODE = {
  Single: 'single',
  Multiple: 'multiple',
} as const;

export const TEST_IDS = {
  collapseBlock: 'accordion__collapse-block',
  chevron: 'accordion__collapse-block__chevron',
  title: 'accordion__collapse-block__title',
  subTitle: 'accordion__collapse-block__sub-title',
  content: 'accordion__collapse-block__content',
  afterTitle: 'accordion__collapse-block__after-title',
};

export const ANIMATION_DURATION = 300;

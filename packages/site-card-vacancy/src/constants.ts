const PREFIX = 'card-vacancy';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
} as const;

export const TEST_IDS = {
  root: PREFIX,
  title: `${PREFIX}__title`,
  description: `${PREFIX}__description`,
} as const;

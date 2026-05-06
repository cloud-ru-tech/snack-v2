import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { RADIUS, VIEW } from '../../src/constants';

export const CARD_TEST_ID = 'card';

export const CARD_STORY_NAME = 'card';

export const CARD_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  visualBackgroundPredefined: 'visual-background-predefined',
} as const;

export type CardStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CardStoryProps,
  story: string = CARD_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: CARD_STORY_NAME,
    story,
    props: {
      'data-test-id': CARD_TEST_ID,
      ...props,
    },
  };
}

export const CARD_INTERACTION_VISUAL_CASES: ReadonlyArray<{
  name: string;
  action: 'hover' | 'focus';
}> = [
  { name: 'interaction-hover.png', action: 'hover' },
  { name: 'interaction-focus.png', action: 'focus' },
];

export const KEY_VIEWS = Object.values(VIEW);
export const KEY_RADII = Object.values(RADIUS);

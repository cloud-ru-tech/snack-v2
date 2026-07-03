import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Card/testIds';

export { TEST_IDS };

export const CARD_TEST_ID = TEST_IDS.root;

export const CARD_STORIES = {
  playground: { name: 'card-card', story: 'playground' },
  visualMatrix: { name: 'card-card', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type CardStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CardStoryProps,
  ref: StoryRef = CARD_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

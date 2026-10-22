import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const AI_FIELD_INPUT_STORIES = {
  playground: { name: 'aifieldinput', story: 'playground' },
  visualMatrix: { name: 'aifieldinput', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_FIELD_INPUT_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

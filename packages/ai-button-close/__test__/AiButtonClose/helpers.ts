import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/AiButtonClose/testIds';

export { TEST_IDS };

export const AI_BUTTON_CLOSE_STORIES = {
  playground: { name: 'aibuttonclose', story: 'playground' },
  visualMatrix: { name: 'aibuttonclose', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_BUTTON_CLOSE_STORIES.playground,
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

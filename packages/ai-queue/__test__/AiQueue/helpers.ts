import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const AI_QUEUE_STORIES = {
  playground: { name: 'aiqueue', story: 'playground' },
  visualMatrix: { name: 'aiqueue', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type AiQueueStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiQueueStoryProps,
  ref: StoryRef = AI_QUEUE_STORIES.playground,
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

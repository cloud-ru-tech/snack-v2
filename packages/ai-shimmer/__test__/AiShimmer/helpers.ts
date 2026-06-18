import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const AI_SHIMMER_STORY_NAME = 'aishimmer';

export const AI_SHIMMER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type AiShimmerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiShimmerStoryProps,
  story: string = AI_SHIMMER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: AI_SHIMMER_STORY_NAME,
    category: 'ai',
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };
export const SKELETON_TEST_ID = TEST_IDS.skeleton.root;

export const SKELETON_STORIES = {
  playground: { name: 'skeleton', group: 'skeleton', story: 'playground' },
  visualMatrix: { name: 'skeleton', group: 'skeleton', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SKELETON_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': SKELETON_TEST_ID,
      ...props,
    },
  };
}

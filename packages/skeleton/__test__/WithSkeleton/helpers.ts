import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const WITH_SKELETON_WRAPPER_TEST_ID = TEST_IDS.withSkeleton.wrapper;

export const WITH_SKELETON_STORIES = {
  playground: { name: 'withskeleton', group: 'skeleton', story: 'playground' },
  visualMatrix: { name: 'withskeleton', group: 'skeleton', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = WITH_SKELETON_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
  };
}

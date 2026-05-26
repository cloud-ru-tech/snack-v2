import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const AVATAR_DETAIL_TEST_ID = TEST_IDS.root;

export const AVATAR_DETAIL_STORIES = {
  playground: { name: 'avatardetail', story: 'playground' },
  visualMatrix: { name: 'avatardetail', story: 'visual-matrix' },
  interactionTest: { name: 'avatardetail-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AVATAR_DETAIL_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'uikit-product',
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': AVATAR_DETAIL_TEST_ID, ...props },
  };
}

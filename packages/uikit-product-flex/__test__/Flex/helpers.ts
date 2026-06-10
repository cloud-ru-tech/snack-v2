import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Flex/testIds';

export const FLEX_TEST_ID = TEST_IDS.root;

export const FLEX_STORIES = {
  playground: { name: 'flex', story: 'playground' },
  visualMatrix: { name: 'flex', story: 'visual-matrix' },
  polymorphic: { name: 'flex-examples-polymorphic', story: 'polymorphic' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FLEX_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'uikit-product',
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': FLEX_TEST_ID, ...props },
  };
}

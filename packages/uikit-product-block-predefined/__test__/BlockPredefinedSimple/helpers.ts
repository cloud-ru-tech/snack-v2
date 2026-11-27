import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/BlockPredefinedSimple/testIds';

export const BLOCK_PREDEFINED_SIMPLE_TEST_ID = TEST_IDS.root;

type StoryRef = { name: string; story: string; group?: string };

export const BLOCK_PREDEFINED_SIMPLE_STORIES = {
  playground: { group: 'blockpredefined', name: 'simple', story: 'playground' },
  visualMatrix: { group: 'blockpredefined', name: 'simple', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = BLOCK_PREDEFINED_SIMPLE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    category: 'uikit-product',
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': BLOCK_PREDEFINED_SIMPLE_TEST_ID, ...props },
  };
}

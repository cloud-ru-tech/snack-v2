import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export const EMPTY_BLOCK_TEST_ID = TEST_IDS.emptyBlock.root;

/** Storybook id: `uikit-product-layout-emptyblock--…` (sidebar `Uikit Product/Layout/Layout/EmptyBlock`) */
export const EMPTY_BLOCK_CATEGORY = 'uikit-product';
export const EMPTY_BLOCK_GROUP = 'layout';
export const EMPTY_BLOCK_STORY_NAME = 'emptyblock';

export const EMPTY_BLOCK_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildEmptyBlockStoryOptions(
  props?: Record<string, unknown>,
  story: string = EMPTY_BLOCK_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: EMPTY_BLOCK_STORY_NAME,
    group: EMPTY_BLOCK_GROUP,
    category: EMPTY_BLOCK_CATEGORY,
    story,
    props: {
      'data-test-id': EMPTY_BLOCK_TEST_ID,
      ...props,
    },
    globals,
  };
}

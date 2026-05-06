import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const INFO_ROW_TEST_ID = TEST_IDS.infoRow;

/** Storybook id: `uikit-product-inforow-inforow--…` (title `Uikit Product/InfoRow/InfoRow`) */
export const INFO_ROW_CATEGORY = 'uikit-product';
export const INFO_ROW_GROUP = 'inforow';
export const INFO_ROW_STORY_NAME = 'inforow';

export const INFO_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildInfoRowStoryOptions(
  props?: Record<string, unknown>,
  story: string = INFO_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: INFO_ROW_STORY_NAME,
    group: INFO_ROW_GROUP,
    category: INFO_ROW_CATEGORY,
    story,
    props: {
      'data-test-id': INFO_ROW_TEST_ID,
      ...props,
    },
  };
}

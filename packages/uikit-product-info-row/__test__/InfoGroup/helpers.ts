import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const INFO_GROUP_TEST_ID = TEST_IDS.infoGroup;

/** Storybook id: `uikit-product-inforow-infogroup--…` (title `Uikit Product/InfoRow/InfoGroup`) */
export const INFO_GROUP_CATEGORY = 'uikit-product';
export const INFO_GROUP_GROUP = 'inforow';
export const INFO_GROUP_STORY_NAME = 'infogroup';

export const INFO_GROUP_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildInfoGroupStoryOptions(
  props?: Record<string, unknown>,
  story: string = INFO_GROUP_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: INFO_GROUP_STORY_NAME,
    group: INFO_GROUP_GROUP,
    category: INFO_GROUP_CATEGORY,
    story,
    props: {
      'data-test-id': INFO_GROUP_TEST_ID,
      ...props,
    },
  };
}

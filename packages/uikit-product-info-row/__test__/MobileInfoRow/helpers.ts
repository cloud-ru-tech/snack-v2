import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const MOBILE_INFO_ROW_TEST_ID = TEST_IDS.mobileInfoRow;

export const MOBILE_INFO_ROW_CATEGORY = 'uikit-product';
export const MOBILE_INFO_ROW_GROUP = 'inforow';
export const MOBILE_INFO_ROW_STORY_NAME = 'mobileinforow';

export const MOBILE_INFO_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildMobileInfoRowStoryOptions(
  props?: Record<string, unknown>,
  story: string = MOBILE_INFO_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: MOBILE_INFO_ROW_STORY_NAME,
    group: MOBILE_INFO_ROW_GROUP,
    category: MOBILE_INFO_ROW_CATEGORY,
    story,
    props: {
      'data-test-id': MOBILE_INFO_ROW_TEST_ID,
      ...props,
    },
  };
}

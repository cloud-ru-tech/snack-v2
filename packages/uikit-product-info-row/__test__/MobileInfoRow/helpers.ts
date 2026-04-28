import { StorybookUrlOptions } from '../../../../playwright/utils';

export const MOBILE_INFO_ROW_TEST_ID = 'mobile-info-row';

export const MOBILE_INFO_ROW_GROUP = 'uikitproductinforow';
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
    story,
    props: {
      'data-test-id': MOBILE_INFO_ROW_TEST_ID,
      ...props,
    },
  };
}

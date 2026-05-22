import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const ADAPTIVE_INFO_ROW_TEST_ID = TEST_IDS.adaptiveInfoRow;

/** Storybook id: `uikit-product-inforow-adaptiveinforow--…` (title `Uikit Product/InfoRow/AdaptiveInfoRow`) */
export const ADAPTIVE_INFO_ROW_CATEGORY = 'uikit-product';
export const ADAPTIVE_INFO_ROW_GROUP = 'inforow';
export const ADAPTIVE_INFO_ROW_STORY_NAME = 'adaptiveinforow';

export const ADAPTIVE_INFO_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildAdaptiveInfoRowStoryOptions(
  props?: Record<string, unknown>,
  story: string = ADAPTIVE_INFO_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ADAPTIVE_INFO_ROW_STORY_NAME,
    group: ADAPTIVE_INFO_ROW_GROUP,
    category: ADAPTIVE_INFO_ROW_CATEGORY,
    story,
    props: {
      'data-test-id': ADAPTIVE_INFO_ROW_TEST_ID,
      ...props,
    },
  };
}

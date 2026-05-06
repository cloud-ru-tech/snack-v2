import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const SWITCH_ROW_TEST_ID = TEST_IDS.root;
export const SWITCH_ROW_SWITCH_TEST_ID = TEST_IDS.switch;
export const SWITCH_ROW_TITLE_TEST_ID = TEST_IDS.title;
export const SWITCH_ROW_TITLE_TOOLTIP_TEST_ID = TEST_IDS.titleTooltip;
export const SWITCH_ROW_DESCRIPTION_TEST_ID = TEST_IDS.description;
export const SWITCH_ROW_TOGGLE_TOOLTIP_TEST_ID = TEST_IDS.toggleTooltip;

export const SWITCH_ROW_CATEGORY = 'uikit-product';
export const SWITCH_ROW_STORY_NAME = 'switchrow';

export const SWITCH_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type SwitchRowStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SwitchRowStoryProps,
  story: string = SWITCH_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: SWITCH_ROW_STORY_NAME,
    category: SWITCH_ROW_CATEGORY,
    story,
    props: {
      'data-test-id': SWITCH_ROW_TEST_ID,
      ...props,
    },
  };
}

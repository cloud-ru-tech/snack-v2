import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const COPY_BUTTON_TEST_ID = TEST_IDS.copyButton;

export const COPY_BUTTON_CATEGORY = 'uikit-product';
export const COPY_BUTTON_GROUP_NAME = 'copy';
export const COPY_BUTTON_STORY_NAME = 'copybutton';

export const COPY_BUTTON_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type CopyButtonStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CopyButtonStoryProps,
  story: string = COPY_BUTTON_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: COPY_BUTTON_CATEGORY,
    group: COPY_BUTTON_GROUP_NAME,
    name: COPY_BUTTON_STORY_NAME,
    story,
    props: {
      'data-test-id': COPY_BUTTON_TEST_ID,
      ...props,
    },
  };
}

export const COPY_BUTTON_SIZES = ['s', 'm', 'l'] as const;

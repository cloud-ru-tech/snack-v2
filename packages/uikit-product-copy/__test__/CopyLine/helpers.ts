import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const COPY_LINE_TEST_ID = TEST_IDS.copyLine;

export const COPY_LINE_CATEGORY = 'uikit-product';
export const COPY_LINE_GROUP_NAME = 'copy';
export const COPY_LINE_STORY_NAME = 'copyline';

export const COPY_LINE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export const COPY_BUTTON_HIDE_STRATEGIES = ['never', 'hover'] as const;

export type CopyLineStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CopyLineStoryProps,
  story: string = COPY_LINE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: COPY_LINE_CATEGORY,
    group: COPY_LINE_GROUP_NAME,
    name: COPY_LINE_STORY_NAME,
    story,
    props: {
      'data-test-id': COPY_LINE_TEST_ID,
      ...props,
    },
  };
}

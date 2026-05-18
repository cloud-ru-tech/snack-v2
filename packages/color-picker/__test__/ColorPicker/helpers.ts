import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { SIZE, TEST_IDS } from '../../src/constants';

export const COLOR_PICKER_TEST_ID = TEST_IDS.root;

export const COLOR_PICKER_STORY_NAME = 'colorpicker';

export const COLOR_PICKER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type ColorPickerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ColorPickerStoryProps,
  story: string = COLOR_PICKER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: COLOR_PICKER_STORY_NAME,
    story,
    props: {
      'data-test-id': COLOR_PICKER_TEST_ID,
      ...props,
    },
  };
}

export const KEY_SIZES = [SIZE.S, SIZE.M, SIZE.L] as const;
export { TEST_IDS };

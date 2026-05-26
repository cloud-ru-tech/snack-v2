import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const LOAD_STATUS_CATEGORY = 'uikit-product';
export const LOAD_STATUS_STORY_NAME = 'loadstatus';

export const LOAD_STATUS_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type LoadStatusStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: LoadStatusStoryProps,
  story: string = LOAD_STATUS_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: LOAD_STATUS_CATEGORY,
    name: LOAD_STATUS_STORY_NAME,
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

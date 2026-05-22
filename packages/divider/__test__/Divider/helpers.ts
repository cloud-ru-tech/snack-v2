import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const DIVIDER_STORY_NAME = 'divider';

export const DIVIDER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type DividerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: DividerStoryProps,
  story: string = DIVIDER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: DIVIDER_STORY_NAME,
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

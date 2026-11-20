import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as STORY_TEST_IDS } from '../../stories/testIds';

export const TEST_IDS = STORY_TEST_IDS.kbd;

export const KBD_CATEGORY = 'uikit-product';
export const KBD_GROUP = 'kbd';
export const KBD_STORY_NAME = 'kbd';

export const KBD_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type KbdStoryProps = Record<string, unknown>;

export function buildStoryOptions(props?: KbdStoryProps, story: string = KBD_STORIES.playground): StorybookUrlOptions {
  return {
    name: KBD_STORY_NAME,
    group: KBD_GROUP,
    category: KBD_CATEGORY,
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

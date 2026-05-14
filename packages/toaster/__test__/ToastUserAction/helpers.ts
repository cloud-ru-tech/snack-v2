import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const USER_ACTION_TEST_ID = TEST_IDS.userActionRoot;
export const USER_ACTION_ICON_TEST_ID = TEST_IDS.userActionIcon;
export const USER_ACTION_LINK_TEST_ID = TEST_IDS.userActionLink;
export const USER_ACTION_TIMER_TEST_ID = TEST_IDS.userActionTimer;

const GROUP = 'toaster';
const STORY_NAME = 'toastuseraction';

export const USER_ACTION_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type UserActionStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: UserActionStoryProps,
  story: string = USER_ACTION_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props: {
      'data-test-id': USER_ACTION_TEST_ID,
      ...props,
    },
  };
}

import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const SYSTEM_EVENT_TEST_ID = TEST_IDS.systemEventRoot;
export const SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID = TEST_IDS.systemEventButtonClose;
export const SYSTEM_EVENT_BUTTON_ACTION_TEST_ID = TEST_IDS.systemEventButtonAction;
export const SYSTEM_EVENT_LINK_TEST_ID = TEST_IDS.systemEventLink;
export const SYSTEM_EVENT_PROGRESS_BAR_TEST_ID = TEST_IDS.systemEventProgressBar;

const GROUP = 'toaster';
const STORY_NAME = 'toastsystemevent';

export const SYSTEM_EVENT_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type SystemEventStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SystemEventStoryProps,
  story: string = SYSTEM_EVENT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props: {
      'data-test-id': SYSTEM_EVENT_TEST_ID,
      ...props,
    },
  };
}

import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const TITLE_CLICKABLE_TEST_ID = TEST_IDS.root;
export const TITLE_CLICKABLE_CHEVRON_TEST_ID = TEST_IDS.chevron;
export const TITLE_CLICKABLE_TITLE_TEST_ID = TEST_IDS.title;
export const TITLE_CLICKABLE_ICON_TEST_ID = TEST_IDS.icon;
export const TITLE_CLICKABLE_AVATAR_TEST_ID = TEST_IDS.avatar;
export const TITLE_CLICKABLE_AVATAR_LABEL_TEST_ID = TEST_IDS.avatarLabel;
export const TITLE_CLICKABLE_AVATAR_SUBTITLE_TEST_ID = TEST_IDS.avatarSubtitle;

export const TITLE_CLICKABLE_CATEGORY = 'uikit-product';
export const TITLE_CLICKABLE_STORY_NAME = 'titleclickable';

export const TITLE_CLICKABLE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type TitleClickableStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TitleClickableStoryProps,
  story: string = TITLE_CLICKABLE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: TITLE_CLICKABLE_CATEGORY,
    name: TITLE_CLICKABLE_STORY_NAME,
    story,
    props: {
      title: 'Title',
      'data-test-id': TITLE_CLICKABLE_TEST_ID,
      ...props,
    },
  };
}

export const TITLE_CLICKABLE_INTERACTION_VISUAL_CASES: ReadonlyArray<{
  name: string;
  action: 'none' | 'hover' | 'focus';
}> = [
  { name: 'default.png', action: 'none' },
  { name: 'hover.png', action: 'hover' },
  { name: 'focus.png', action: 'focus' },
];

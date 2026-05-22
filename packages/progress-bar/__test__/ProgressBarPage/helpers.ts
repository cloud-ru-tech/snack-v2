import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, TEST_IDS } from '../../src/constants';

export const PROGRESS_BAR_PAGE_TEST_ID = TEST_IDS.progressBarPage.root;

export const PROGRESS_BAR_PAGE_STORIES = {
  playground: { name: 'progressbarpage', group: 'progressbar', story: 'playground' },
  visualMatrix: { name: 'progressbarpage', group: 'progressbar', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = PROGRESS_BAR_PAGE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': PROGRESS_BAR_PAGE_TEST_ID,
      inProgress: true,
      ...props,
    },
  };
}

export const PROGRESS_BAR_PAGE_KEY_APPEARANCES = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Red] as const;

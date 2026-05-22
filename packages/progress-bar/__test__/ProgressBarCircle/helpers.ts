import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, PROGRESS_BAR_CIRCLE_SIZE, TEST_IDS } from '../../src/constants';

export const PROGRESS_BAR_CIRCLE_TEST_ID = TEST_IDS.progressBarCircle.root;

export const PROGRESS_BAR_CIRCLE_STORIES = {
  playground: { name: 'progressbarcircle', group: 'progressbar', story: 'playground' },
  visualMatrix: { name: 'progressbarcircle', group: 'progressbar', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = PROGRESS_BAR_CIRCLE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': PROGRESS_BAR_CIRCLE_TEST_ID,
      ...props,
    },
  };
}

export const PROGRESS_BAR_CIRCLE_KEY_COMBOS = [
  { size: PROGRESS_BAR_CIRCLE_SIZE.S, appearance: APPEARANCE.Primary },
  { size: PROGRESS_BAR_CIRCLE_SIZE.XS, appearance: APPEARANCE.Neutral },
  { size: PROGRESS_BAR_CIRCLE_SIZE.S, appearance: APPEARANCE.Red },
] as const;

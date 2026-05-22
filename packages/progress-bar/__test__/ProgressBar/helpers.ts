import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, PROGRESS_BAR_SIZE, TEST_IDS } from '../../src/constants';

export const PROGRESS_BAR_TEST_ID = TEST_IDS.progressBar.root;
export const PROGRESS_BAR_FILLER_TEST_ID = TEST_IDS.progressBar.filler;

export const PROGRESS_BAR_STORIES = {
  playground: { name: 'progressbar', group: 'progressbar', story: 'playground' },
  visualMatrix: { name: 'progressbar', group: 'progressbar', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = PROGRESS_BAR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': PROGRESS_BAR_TEST_ID,
      ...props,
    },
  };
}

export const PROGRESS_BAR_KEY_COMBOS = [
  { size: PROGRESS_BAR_SIZE.S, appearance: APPEARANCE.Primary },
  { size: PROGRESS_BAR_SIZE.XS, appearance: APPEARANCE.Neutral },
  { size: PROGRESS_BAR_SIZE.S, appearance: APPEARANCE.Red },
] as const;

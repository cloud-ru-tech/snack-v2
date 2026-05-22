import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const SKELETON_TEXT_TEST_ID = TEST_IDS.skeletonText.root;

export const SKELETON_TEXT_STORIES = {
  playground: { name: 'skeletontext', group: 'skeleton', story: 'playground' },
  visualMatrix: { name: 'skeletontext', group: 'skeleton', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SKELETON_TEXT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': SKELETON_TEXT_TEST_ID,
      loading: true,
      ...props,
    },
  };
}

// Key combos: один представитель на каждое значение каждой оси (size × variant × align).
// Покрывает все enum-значения через 5 тестов (max(|sizes|, |variants|, |aligns|)) вместо декартова 30.
export const KEY_COMBOS = [
  { size: 's', variant: 'body', align: 'left' },
  { size: 'm', variant: 'label', align: 'right' },
  { size: 'l', variant: 'title', align: 'left' },
  { size: 'm', variant: 'headline', align: 'left' },
  { size: 'm', variant: 'display', align: 'left' },
] as const;

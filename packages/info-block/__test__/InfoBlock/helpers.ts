import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { ALIGN, SIZE, TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const INFO_BLOCK_STORIES = {
  playground: { name: 'infoblock', story: 'playground' },
  visualMatrix: { name: 'infoblock', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = INFO_BLOCK_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const INFO_BLOCK_KEY_COMBOS = [
  { size: SIZE.S, align: ALIGN.Vertical },
  { size: SIZE.M, align: ALIGN.Horizontal },
  { size: SIZE.L, align: ALIGN.Vertical },
] as const;

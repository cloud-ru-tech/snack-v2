import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SIZE, VIEW } from '../../src/constants';
import { TEST_IDS } from '../../stories/Block/testIds';

export { TEST_IDS };

export const BLOCK_STORIES = {
  playground: { name: 'block', story: 'playground' },
  visualMatrix: { name: 'block', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = BLOCK_STORIES.playground,
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

export const KEY_COMBOS = [
  { size: SIZE.S, view: VIEW.Simple },
  { size: SIZE.M, view: VIEW.Outline },
  { size: SIZE.L, view: VIEW.Elevated },
] as const;

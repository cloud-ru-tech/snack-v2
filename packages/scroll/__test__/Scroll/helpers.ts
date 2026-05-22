import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { AUTOSCROLL_TO, SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/Scroll/testIds';

export { TEST_IDS };

export const SCROLL_STORIES = {
  playground: { name: 'scroll', story: 'playground' },
  visualMatrix: { name: 'scroll', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type ScrollStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ScrollStoryProps,
  ref: StoryRef = SCROLL_STORIES.playground,
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

export const SCROLL_KEY_COMBOS = [
  { size: SIZE.S, autoscrollTo: AUTOSCROLL_TO.Bottom },
  { size: SIZE.M, autoscrollTo: AUTOSCROLL_TO.Right },
] as const;

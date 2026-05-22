import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, PLACEMENT } from '../../src/components/constants';
import { TEST_IDS } from '../../src/components/testIds';

export { TEST_IDS };

export const HOT_SPOT_STORIES = {
  playground: { name: 'hotspot', story: 'playground' },
  visualMatrix: { name: 'hotspot', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = HOT_SPOT_STORIES.playground,
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

export const HOT_SPOT_KEY_COMBOS = [
  { appearance: APPEARANCE.Primary, placement: PLACEMENT.Right },
  { appearance: APPEARANCE.Red, placement: PLACEMENT.LeftTop },
  { appearance: APPEARANCE.Green, placement: PLACEMENT.Center },
  { appearance: APPEARANCE.Blue, placement: PLACEMENT.RightBottom },
] as const;

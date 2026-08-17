import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/PromoTag/testIds';

export { TEST_IDS };

export const PROMO_TAG_STORIES = {
  playground: { name: 'promotag', story: 'playground' },
  visualMatrix: { name: 'promotag', story: 'visual-matrix' },
  polymorphic: { name: 'promotag-examples-polymorphic', story: 'polymorphic' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = PROMO_TAG_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const PROMO_TAG_KEY_COMBOS = [
  { appearance: APPEARANCE.Primary, size: SIZE.Xs, roleAppearance: ROLE_APPEARANCE.Accent },
  { appearance: APPEARANCE.Neutral, size: SIZE.S, roleAppearance: ROLE_APPEARANCE.Decor },
  { appearance: APPEARANCE.Red, size: SIZE.M, roleAppearance: ROLE_APPEARANCE.Accent },
] as const;

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const PROMO_TAG_PREDEFINED_CATEGORY = 'uikit-product';

/** Title `Uikit Product/PromoTagPredefined[/Examples/<Scenario>]` → kebab-cased storybook id. */
export const PROMO_TAG_PREDEFINED_STORIES = {
  playground: { name: 'promotagpredefined', story: 'playground' },
  visualMatrix: { name: 'promotagpredefined', story: 'visual-matrix' },
  polymorphic: { name: 'promotagpredefined-examples-polymorphic', story: 'polymorphic' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = PROMO_TAG_PREDEFINED_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: PROMO_TAG_PREDEFINED_CATEGORY,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.promoTag,
      ...props,
    },
  };
}

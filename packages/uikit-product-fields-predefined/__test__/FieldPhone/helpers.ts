import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_PHONE_STORIES = {
  playground: { name: 'fieldphone', story: 'playground' },
  visualMatrix: { name: 'fieldphone', story: 'visual-matrix' },
  interactionTest: { name: 'fieldphone-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_PHONE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fieldPhone,
      ...props,
    },
  };
}

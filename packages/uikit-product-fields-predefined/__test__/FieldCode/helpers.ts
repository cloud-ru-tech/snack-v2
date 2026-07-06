import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_CODE_STORIES = {
  playground: { name: 'fieldcode', story: 'playground' },
  visualMatrix: { name: 'fieldcode', story: 'visual-matrix' },
  interactionTest: { name: 'fieldcode-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_CODE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fieldCode,
      ...props,
    },
  };
}

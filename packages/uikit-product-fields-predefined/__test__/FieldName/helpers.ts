import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_NAME_STORIES = {
  playground: { name: 'fieldname', story: 'playground' },
  visualMatrix: { name: 'fieldname', story: 'visual-matrix' },
  interactionTest: { name: 'fieldname-tests-interaction', story: 'interaction-test' },
  rhf: { name: 'fieldname-examples-rhf', story: 'rhf' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_NAME_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fieldName,
      ...props,
    },
  };
}

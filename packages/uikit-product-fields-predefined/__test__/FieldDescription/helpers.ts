import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_DESCRIPTION_STORIES = {
  playground: { name: 'fielddescription', story: 'playground' },
  visualMatrix: { name: 'fielddescription', story: 'visual-matrix' },
  interactionTest: { name: 'fielddescription-tests-interaction', story: 'interaction-test' },
  rhf: { name: 'fielddescription-examples-rhf', story: 'rhf' },
  withAddButton: { name: 'fielddescription-examples-withaddbutton', story: 'with-add-button' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_DESCRIPTION_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fieldDescription,
      ...props,
    },
  };
}

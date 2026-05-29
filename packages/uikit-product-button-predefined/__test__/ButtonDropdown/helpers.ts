import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const BUTTON_DROPDOWN_CATEGORY = 'uikit-product';
const BUTTON_DROPDOWN_GROUP = 'buttonpredefined';

type UikitStoryRef = StoryRef & { category: string };

export const BUTTON_DROPDOWN_STORIES = {
  playground: {
    category: BUTTON_DROPDOWN_CATEGORY,
    group: BUTTON_DROPDOWN_GROUP,
    name: 'buttondropdown',
    story: 'playground',
  },
  visualMatrix: {
    category: BUTTON_DROPDOWN_CATEGORY,
    group: BUTTON_DROPDOWN_GROUP,
    name: 'buttondropdown',
    story: 'visual-matrix',
  },
  interactionTest: {
    category: BUTTON_DROPDOWN_CATEGORY,
    group: BUTTON_DROPDOWN_GROUP,
    name: 'buttondropdown-tests-interaction',
    story: 'interaction-test',
  },
} as const satisfies Record<string, UikitStoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = BUTTON_DROPDOWN_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.buttonDropdown,
      ...props,
    },
  };
}

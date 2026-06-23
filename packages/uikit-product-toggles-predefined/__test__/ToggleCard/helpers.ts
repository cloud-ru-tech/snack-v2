import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'togglespredefined';

type UikitStoryRef = StoryRef & { category: string };

export const TOGGLE_CARD_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'togglecard', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'togglecard', story: 'visual-matrix' },
  interactionTest: {
    category: CATEGORY,
    group: GROUP,
    name: 'togglecard-tests-interaction',
    story: 'interaction-test',
  },
} as const satisfies Record<string, UikitStoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = TOGGLE_CARD_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.card,
      ...props,
    },
  };
}

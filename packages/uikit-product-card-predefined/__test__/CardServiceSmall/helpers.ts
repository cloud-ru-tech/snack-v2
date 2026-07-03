import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'cardpredefined';

type UikitStoryRef = StoryRef & { category: string };

export const CARD_SERVICE_SMALL_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'cardservicesmall', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'cardservicesmall', story: 'visual-matrix' },
} as const satisfies Record<string, UikitStoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = CARD_SERVICE_SMALL_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.cardServiceSmall,
      ...props,
    },
  };
}

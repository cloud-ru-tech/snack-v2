import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';
import { TEST_IDS as STORY_TEST_IDS } from '../../stories/CardCustom/testIds';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'cardpredefined';

type UikitStoryRef = StoryRef & { category: string };

export const CARD_CUSTOM_TEST_ID = STORY_TEST_IDS.root;

export const CARD_CUSTOM_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'cardcustom', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'cardcustom', story: 'visual-matrix' },
} as const satisfies Record<string, UikitStoryRef>;

export type CardCustomStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CardCustomStoryProps,
  ref: UikitStoryRef = CARD_CUSTOM_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': CARD_CUSTOM_TEST_ID,
      ...props,
    },
  };
}

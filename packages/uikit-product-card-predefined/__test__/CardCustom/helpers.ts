import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../../card/src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'cardpredefined';

type UikitStoryRef = StoryRef & { category: string };

export const CARD_CUSTOM_TEST_ID = TEST_IDS.root;

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
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

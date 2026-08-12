import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/HeaderLayout/testIds';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'layout-header-legacy';

type HeaderLayoutStoryRef = StoryRef & { category: string };

export const HEADER_LAYOUT_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'headerlayout', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'headerlayout', story: 'visual-matrix' },
} as const satisfies Record<string, HeaderLayoutStoryRef>;

/** Ключевые раскладки (не декартово). */
export const HEADER_LAYOUT_KEY_COMBOS = [{ isMobile: false }, { isMobile: true }] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: HeaderLayoutStoryRef = HEADER_LAYOUT_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}

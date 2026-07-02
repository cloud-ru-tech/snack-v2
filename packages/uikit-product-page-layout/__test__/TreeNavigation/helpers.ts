import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TREE_NAVIGATION_MODE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS, TREE_NAVIGATION_MODE };

export const TREE_NAVIGATION_TEST_ID = TEST_IDS.treeNavigation.root;

const PAGE_LAYOUT_CATEGORY = 'uikit-product';
const PAGE_LAYOUT_GROUP = 'pagelayout';

type UikitStoryRef = StoryRef & { category: string };

export const TREE_NAVIGATION_STORIES = {
  playground: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'treenavigation',
    story: 'playground',
  },
  visualMatrix: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'treenavigation',
    story: 'visual-matrix',
  },
  interactionTest: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'treenavigation-tests-interaction',
    story: 'interaction-test',
  },
} as const satisfies Record<string, UikitStoryRef>;

// mode — ось отображения меню (popover / aside / fixed).
export const TREE_NAVIGATION_MODES = Object.values(TREE_NAVIGATION_MODE);

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = TREE_NAVIGATION_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TREE_NAVIGATION_TEST_ID, ...props },
  };
}

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const HEADLINE_TEST_ID = TEST_IDS.headline.root;

const PAGE_LAYOUT_CATEGORY = 'uikit-product';
const PAGE_LAYOUT_GROUP = 'pagelayout';

type UikitStoryRef = StoryRef & { category: string };

export const HEADLINE_STORIES = {
  playground: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'headline',
    story: 'playground',
  },
  visualMatrix: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'headline',
    story: 'visual-matrix',
  },
} as const satisfies Record<string, UikitStoryRef>;

// Чистый ASCII: URL-args Storybook не резолвят кириллицу и не-ASCII символы (em-dash,
// многоточие и т.п.) — падают на дефолтный заголовок. Поэтому для truncate-снимка
// задаём заведомо длинный латинский заголовок без спецсимволов.
export const LONG_TITLE =
  'Virtual machines management for the project environment a very long page title that must be truncated with an ellipsis at the end';

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = HEADLINE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': HEADLINE_TEST_ID, ...props },
  };
}

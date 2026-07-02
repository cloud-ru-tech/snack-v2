import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as INTERNAL_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { LIST_MOBILE_DROPLIST_ROOT } from '../shared';

export { INTERNAL_TEST_IDS, LIST_MOBILE_DROPLIST_ROOT, TEST_IDS };

export const PAGE_CATALOG_TEST_ID = TEST_IDS.pageCatalog.root;

const PAGE_LAYOUT_CATEGORY = 'uikit-product';
const PAGE_LAYOUT_GROUP = 'pagelayout';

type UikitStoryRef = StoryRef & { category: string };

export const PAGE_CATALOG_STORIES = {
  playground: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'pagecatalog',
    story: 'playground',
  },
  visualMatrix: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'pagecatalog',
    story: 'visual-matrix',
  },
} as const satisfies Record<string, UikitStoryRef>;

export const PAGE_CATALOG_LAYOUTS = ['desktop', 'mobile'] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = PAGE_CATALOG_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': PAGE_CATALOG_TEST_ID, ...props },
    globals,
  };
}

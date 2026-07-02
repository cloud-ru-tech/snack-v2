import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as INTERNAL_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { INTERNAL_TEST_IDS, TEST_IDS };

export const PAGE_FORM_TEST_ID = TEST_IDS.pageForm.root;

const PAGE_LAYOUT_CATEGORY = 'uikit-product';
const PAGE_LAYOUT_GROUP = 'pagelayout';

type UikitStoryRef = StoryRef & { category: string };

export const PAGE_FORM_STORIES = {
  playground: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'pageform',
    story: 'playground',
  },
  visualMatrix: {
    category: PAGE_LAYOUT_CATEGORY,
    group: PAGE_LAYOUT_GROUP,
    name: 'pageform',
    story: 'visual-matrix',
  },
} as const satisfies Record<string, UikitStoryRef>;

export const PAGE_FORM_LAYOUTS = ['desktop', 'mobile'] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = PAGE_FORM_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': PAGE_FORM_TEST_ID, ...props },
    globals,
  };
}

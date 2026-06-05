import { LAYOUT_TYPE } from '@ds/utils';

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Toolbar/testIds';

export { TEST_IDS };

export { TEST_IDS as TOOLBAR_COMPONENT_TEST_IDS } from '../../src/testIds';

export const TOOLBAR_TEST_ID = TEST_IDS.root;

/** Storybook global `density` — mobile-сценарии рендерятся в comfort-плотности. */
export const COMFORT_DENSITY_GLOBALS = { density: 'comfort' } as const;

export const TOOLBAR_STORIES = {
  playground: { name: 'toolbar', story: 'playground' },
  visualMatrix: { name: 'toolbar', story: 'visual-matrix' },
  bulkActions: { name: 'toolbar-examples-bulkactions', story: 'bulk-actions' },
  withFilters: { name: 'toolbar-examples-withfilters', story: 'with-filters' },
  mobile: { name: 'toolbar-examples-mobile', story: 'mobile' },
  adaptive: { name: 'toolbar-examples-adaptive', story: 'adaptive' },
  interaction: { name: 'toolbar-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

/** Ключевая выборка по осям Playground — не декартово произведение. */
export const TOOLBAR_KEY_COMBOS = [
  {
    layoutType: LAYOUT_TYPE.Desktop,
    outline: true,
    showSearch: true,
    showRefresh: true,
    showMoreActions: true,
  },
  {
    layoutType: LAYOUT_TYPE.Mobile,
    outline: true,
    showSearch: true,
    showRefresh: true,
    showMoreActions: true,
    showExtraSlot: true,
  },
  {
    layoutType: LAYOUT_TYPE.Desktop,
    showFilterRow: true,
    filterOpen: true,
    showSearch: true,
    showRefresh: true,
    showMoreActions: false,
  },
] as const satisfies ReadonlyArray<Record<string, unknown>>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = TOOLBAR_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TOOLBAR_TEST_ID, ...props },
    globals,
  };
}

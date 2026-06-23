import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as PACKAGE_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export const NO_ACCESS_TEST_ID = TEST_IDS.noAccess.root;
export const NO_ACCESS_SERVICE_NAME_TEST_ID = PACKAGE_TEST_IDS.noAccess.serviceName;

/** Storybook id: `uikit-product-layout-noaccess--…` (sidebar `Uikit Product/Layout/Layout/NoAccess`) */
export const NO_ACCESS_CATEGORY = 'uikit-product';
export const NO_ACCESS_GROUP = 'layout';
export const NO_ACCESS_STORY_NAME = 'noaccess';

export const NO_ACCESS_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildNoAccessStoryOptions(
  props?: Record<string, unknown>,
  story: string = NO_ACCESS_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: NO_ACCESS_STORY_NAME,
    group: NO_ACCESS_GROUP,
    category: NO_ACCESS_CATEGORY,
    story,
    props: {
      'data-test-id': NO_ACCESS_TEST_ID,
      ...props,
    },
    globals,
  };
}

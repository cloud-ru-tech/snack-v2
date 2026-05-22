import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };
export const PAGINATION_TEST_ID = TEST_IDS.pagination.root;

export const PAGINATION_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = PAGINATION_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'pagination',
    group: 'pagination',
    story,
    props: {
      'data-test-id': PAGINATION_TEST_ID,
      ...props,
    },
  };
}

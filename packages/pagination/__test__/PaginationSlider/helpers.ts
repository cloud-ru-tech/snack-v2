import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };
export const PAGINATION_SLIDER_TEST_ID = TEST_IDS.paginationSlider.root;

export const PAGINATION_SLIDER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = PAGINATION_SLIDER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'paginationslider',
    group: 'pagination',
    story,
    props: {
      'data-test-id': PAGINATION_SLIDER_TEST_ID,
      ...props,
    },
  };
}

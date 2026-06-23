import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/ErrorPage/testIds';

export { TEST_IDS };
export const ERROR_PAGE_TEST_ID = TEST_IDS.root;

export const ERROR_PAGE_STORIES = {
  playground: { name: 'errorpage', story: 'playground' },
  visualMatrix: { name: 'errorpage', story: 'visual-matrix' },
  custom: { name: 'errorpage-examples-custom', story: 'custom' },
  interactionTest: { name: 'errorpage-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ERROR_PAGE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'uikit-product',
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': ERROR_PAGE_TEST_ID, ...props },
  };
}

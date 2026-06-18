import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SKELETON_TEXT_LINE_TEST_ID, TEST_IDS } from '../Table/helpers';

export { SKELETON_TEXT_LINE_TEST_ID, TEST_IDS };

export const INFINITE_TABLE_STORIES = {
  playground: { name: 'table-infinitetable', story: 'playground' },
  visualMatrix: { name: 'table-infinitetable', story: 'visual-matrix' },
  loadMoreButton: { name: 'table-infinitetable-examples-loadmorebutton', story: 'load-more-button' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = INFINITE_TABLE_STORIES.visualMatrix,
): StorybookUrlOptions {
  return {
    ...ref,
    props: { 'data-test-id': TEST_IDS.table.root, ...props },
  };
}

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../Table/helpers';

export { TEST_IDS };

export const TREE_TABLE_STORIES = {
  playground: { name: 'table-treetable', story: 'playground' },
  visualMatrix: { name: 'table-treetable', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = TREE_TABLE_STORIES.visualMatrix,
): StorybookUrlOptions {
  return {
    ...ref,
    props: { 'data-test-id': TEST_IDS.table.root, ...props },
  };
}

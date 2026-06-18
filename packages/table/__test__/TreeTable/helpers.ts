import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../Table/helpers';

export { TEST_IDS };

export const TREE_TABLE_STORIES = {
  visualMatrix: { name: 'table-treetable', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(props?: Record<string, unknown>): StorybookUrlOptions {
  return {
    ...TREE_TABLE_STORIES.visualMatrix,
    props: { 'data-test-id': TEST_IDS.table.root, ...props },
  };
}

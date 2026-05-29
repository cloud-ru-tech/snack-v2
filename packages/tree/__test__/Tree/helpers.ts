import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Tree/testIds';

export { TEST_IDS };

export const TREE_STORIES = {
  playground: { name: 'tree', story: 'playground' },
  visualMatrix: { name: 'tree', story: 'visual-matrix' },
  figmaCompare: { group: 'tree-examples', name: 'figmacompare', story: 'figma-compare' },
  interaction: { group: 'tree-tests', name: 'interaction', story: 'interaction' },
  anchor: { group: 'tree-tests', name: 'anchor', story: 'anchor' },
  rowActions: { group: 'tree-examples', name: 'rowactions', story: 'row-actions' },
  multiSelect: { group: 'tree-tests', name: 'multiselect', story: 'multi-select' },
} as const;

export type TreeStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  ref: { name: string; story: string; group?: string } = TREE_STORIES.playground,
  props?: TreeStoryProps,
): StorybookUrlOptions {
  return {
    ...ref,
    props: {
      'data-test-id': TEST_IDS.tree.root,
      ...props,
    },
  };
}

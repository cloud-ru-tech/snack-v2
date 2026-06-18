import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SKELETON_TEXT_LINE_TEST_ID, TEST_IDS } from '../Table/helpers';

export { SKELETON_TEXT_LINE_TEST_ID, TEST_IDS };

export const SIMPLE_TABLE_STORIES = {
  visualMatrix: { name: 'table-simpletable', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(props?: Record<string, unknown>): StorybookUrlOptions {
  return {
    ...SIMPLE_TABLE_STORIES.visualMatrix,
    props: { 'data-test-id': TEST_IDS.table.root, ...props },
  };
}

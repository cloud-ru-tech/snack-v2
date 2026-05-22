import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const TAG_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type TagRowStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TagRowStoryProps,
  story: string = TAG_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'tagrow',
    group: 'tag',
    story,
    props: {
      'data-test-id': TEST_IDS.tagRow.root,
      ...props,
    },
  };
}

export const TAG_ROW_KEY_COMBOS = [{ size: SIZE.Xs }, { size: SIZE.S }, { size: SIZE.M }] as const;

import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { APPEARANCE, SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const TAG_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type TagStoryProps = Record<string, unknown>;

export function buildStoryOptions(props?: TagStoryProps, story: string = TAG_STORIES.playground): StorybookUrlOptions {
  return {
    name: 'tag',
    group: 'tag',
    story,
    props: {
      'data-test-id': TEST_IDS.tag.root,
      ...props,
    },
  };
}

export const TAG_KEY_COMBOS = [
  { size: SIZE.Xs, appearance: APPEARANCE.Neutral },
  { size: SIZE.S, appearance: APPEARANCE.Primary },
  { size: SIZE.M, appearance: APPEARANCE.Red },
] as const;

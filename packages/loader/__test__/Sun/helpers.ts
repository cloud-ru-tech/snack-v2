import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SUN_SIZE } from '../../src/components/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const SUN_STORIES = {
  playground: { name: 'sun', group: 'loader', story: 'playground' },
  visualMatrix: { name: 'sun', group: 'loader', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SUN_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.sun.root,
      ...props,
    },
  };
}

// Ключевая выборка — крайние и средний размер. Полный sweep — задача VisualMatrix snapshot.
export const SUN_KEY_SIZES = [SUN_SIZE.XS, SUN_SIZE.M, SUN_SIZE.L] as const;

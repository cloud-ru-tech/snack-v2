import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { LOADER_SIZE } from '../../src/components/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const SPINNER_STORIES = {
  playground: { name: 'spinner', group: 'loader', story: 'playground' },
  visualMatrix: { name: 'spinner', group: 'loader', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SPINNER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.spinner.root,
      ...props,
    },
  };
}

// Ключевая выборка — крайние и средний размер. Полный sweep — задача VisualMatrix snapshot.
export const SPINNER_KEY_SIZES = [LOADER_SIZE['2XS'], LOADER_SIZE.M, LOADER_SIZE.L] as const;

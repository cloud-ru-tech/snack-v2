import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
} as const;

export const AI_ICON_GIGA_STORIES = {
  playground: { name: 'icongiga', story: 'playground' },
  visualMatrix: { name: 'icongiga', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type AiIconGigaStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiIconGigaStoryProps,
  ref: StoryRef = AI_ICON_GIGA_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

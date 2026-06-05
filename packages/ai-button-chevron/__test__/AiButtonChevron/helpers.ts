import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  disabled: `${COMPONENT_TEST_IDS.root}-disabled`,
} as const;

export const AI_BUTTON_CHEVRON_STORIES = {
  playground: { name: 'buttonchevron', story: 'playground' },
  visualMatrix: { name: 'buttonchevron', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type AiButtonChevronStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiButtonChevronStoryProps,
  ref: StoryRef = AI_BUTTON_CHEVRON_STORIES.playground,
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

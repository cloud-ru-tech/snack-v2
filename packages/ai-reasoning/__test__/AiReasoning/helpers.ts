import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  stepper: COMPONENT_TEST_IDS.stepper,
  icon: COMPONENT_TEST_IDS.icon,
  divider: COMPONENT_TEST_IDS.divider,
  connector: COMPONENT_TEST_IDS.connector,
  description: COMPONENT_TEST_IDS.description,
} as const;

export const AI_REASONING_STORIES = {
  playground: { name: 'aireasoning', story: 'playground' },
  visualMatrix: { name: 'aireasoning', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_REASONING_STORIES.playground,
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

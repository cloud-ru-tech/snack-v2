import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.headline,
  icon: COMPONENT_TEST_IDS.headlineIcon,
  label: COMPONENT_TEST_IDS.headlineLabel,
  duration: COMPONENT_TEST_IDS.headlineDuration,
  chevron: COMPONENT_TEST_IDS.headlineChevron,
  message: COMPONENT_TEST_IDS.headlineMessage,
} as const;

export const AI_CHAIN_OF_THOUGHTS_HEADLINE_STORIES = {
  playground: { name: 'aichainofthoughts-aichainofthoughtsheadline', story: 'playground' },
  visualMatrix: { name: 'aichainofthoughts-aichainofthoughtsheadline', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_CHAIN_OF_THOUGHTS_HEADLINE_STORIES.playground,
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

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  content: COMPONENT_TEST_IDS.content,
  headline: COMPONENT_TEST_IDS.headline,
  headlineIcon: COMPONENT_TEST_IDS.headlineIcon,
  headlineLabel: COMPONENT_TEST_IDS.headlineLabel,
  headlineDuration: COMPONENT_TEST_IDS.headlineDuration,
  headlineChevron: COMPONENT_TEST_IDS.headlineChevron,
  headlineMessage: COMPONENT_TEST_IDS.headlineMessage,
} as const;

export const AI_CHAIN_OF_THOUGHTS_STORIES = {
  playground: { name: 'aichainofthoughts-aichainofthoughts', story: 'playground' },
  visualMatrix: { name: 'aichainofthoughts-aichainofthoughts', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_CHAIN_OF_THOUGHTS_STORIES.playground,
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

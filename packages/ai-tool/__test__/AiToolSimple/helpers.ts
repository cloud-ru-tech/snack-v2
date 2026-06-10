import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.simple,
  icon: COMPONENT_TEST_IDS.simpleIcon,
  status: COMPONENT_TEST_IDS.simpleStatus,
  connector: COMPONENT_TEST_IDS.simpleConnector,
  header: COMPONENT_TEST_IDS.simpleHeader,
  chevron: COMPONENT_TEST_IDS.simpleChevron,
  description: COMPONENT_TEST_IDS.simpleDescription,
  content: COMPONENT_TEST_IDS.simpleContent,
} as const;

export const AI_TOOL_SIMPLE_STORIES = {
  playground: { name: 'aitool-aitoolsimple', story: 'playground' },
  visualMatrix: { name: 'aitool-aitoolsimple', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_TOOL_SIMPLE_STORIES.playground,
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

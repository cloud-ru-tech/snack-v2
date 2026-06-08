import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.text,
} as const;

export const AI_TOOL_TEXT_STORIES = {
  playground: { name: 'aitoolelements-content-aitooltext', story: 'playground' },
  visualMatrix: { name: 'aitoolelements-content-aitooltext', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_TOOL_TEXT_STORIES.playground,
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

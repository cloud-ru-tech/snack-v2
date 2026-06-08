import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.badge,
} as const;

export const AI_TOOL_BADGE_STORIES = {
  playground: { name: 'aitoolelements-atoms-aitoolbadge', story: 'playground' },
  visualMatrix: { name: 'aitoolelements-atoms-aitoolbadge', story: 'visual-matrix' },
  polymorphic: { name: 'aitoolelements-atoms-aitoolbadge-examples-polymorphic', story: 'polymorphic' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_TOOL_BADGE_STORIES.playground,
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

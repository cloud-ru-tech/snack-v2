import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Actions/testIds';

export const ACTIONS_TEST_ID = TEST_IDS.root;

type StoryRef = { name: string; story: string; group?: string };

export const ACTIONS_STORIES = {
  playground: { name: 'actions', story: 'playground' },
  visualMatrix: { name: 'actions', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ACTIONS_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'uikit-product',
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': ACTIONS_TEST_ID, ...props },
  };
}

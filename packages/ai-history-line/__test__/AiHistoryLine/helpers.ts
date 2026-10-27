import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const AI_HISTORY_LINE_TEST_ID = TEST_IDS.root;

type StoryRef = { name: string; story: string; group?: string };

export const AI_HISTORY_LINE_STORIES = {
  playground: { name: 'aihistoryline', story: 'playground', group: 'aihistoryline' },
  visualMatrix: { name: 'aihistoryline', story: 'visual-matrix', group: 'aihistoryline' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_HISTORY_LINE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': AI_HISTORY_LINE_TEST_ID, ...props },
  };
}

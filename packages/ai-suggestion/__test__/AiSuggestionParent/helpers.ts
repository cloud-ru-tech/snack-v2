import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/AiSuggestionParent/constants';
import { SIZE } from '../../src/AiSuggestionSimple/constants';

export { TEST_IDS };

export const AI_SUGGESTION_PARENT_STORIES = {
  playground: { name: 'aisuggestionparent', group: 'aisuggestion', story: 'playground' },
  visualMatrix: { name: 'aisuggestionparent', group: 'aisuggestion', story: 'visual-matrix' },
  visualSummary: {
    name: 'aisuggestionparent-tests-visualsummary',
    group: 'aisuggestion',
    story: 'visual-summary',
  },
} as const satisfies Record<string, StoryRef>;

export type AiSuggestionParentStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiSuggestionParentStoryProps,
  ref: StoryRef = AI_SUGGESTION_PARENT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const KEY_SIZES = [SIZE.S, SIZE.M] as const;

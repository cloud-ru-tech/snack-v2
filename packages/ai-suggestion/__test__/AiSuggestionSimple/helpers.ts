import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, SIZE, TEST_IDS } from '../../src/AiSuggestionSimple/constants';

export { TEST_IDS };

export const AI_SUGGESTION_SIMPLE_STORIES = {
  playground: { name: 'aisuggestionsimple', group: 'aisuggestion', story: 'playground' },
  visualMatrix: { name: 'aisuggestionsimple', group: 'aisuggestion', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type AiSuggestionSimpleStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiSuggestionSimpleStoryProps,
  ref: StoryRef = AI_SUGGESTION_SIMPLE_STORIES.playground,
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

export const KEY_APPEARANCES = Object.values(APPEARANCE);
export const KEY_SIZES = Object.values(SIZE);

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const REVEAL_SECTIONS_STORIES = {
  playground: { name: 'revealsections', story: 'playground' },
  visualMatrix: { name: 'revealsections', story: 'visual-matrix' },
  interaction: { name: 'revealsections-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export const REVEAL_SECTIONS_KEY_COMBOS = [
  { duration: 300, delay: 60, offset: 12, easing: 'linear' },
  { duration: 0, delay: 0, offset: 0, easing: 'ease-out' },
] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = REVEAL_SECTIONS_STORIES.playground,
): StorybookUrlOptions {
  return { category: 'site', group: 'revealsection', ...ref, props };
}

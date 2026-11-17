import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { HIDDEN_ROOT_MARGIN } from '../../stories/constants';
import { TEST_IDS } from '../../stories/testIds';

export { HIDDEN_ROOT_MARGIN, TEST_IDS };

export const REVEAL_SECTION_STORIES = {
  playground: { name: 'revealsection', story: 'playground' },
  visualMatrix: { name: 'revealsection', story: 'visual-matrix' },
  interaction: { name: 'revealsection-tests-interaction', story: 'interaction-test' },
  unavailableObserver: { name: 'revealsection-tests-unavailableobserver', story: 'unavailable-observer' },
} as const satisfies Record<string, StoryRef>;

export const REVEAL_SECTION_KEY_COMBOS = [
  { duration: 400, delay: 80, offset: 16, easing: 'linear' },
  { duration: 0, delay: 0, offset: 0, easing: 'ease-in' },
] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = REVEAL_SECTION_STORIES.playground,
): StorybookUrlOptions {
  return { category: 'site', group: 'revealsection', ...ref, props };
}

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, SIZE } from '../../src/constants';

export { TEST_IDS } from '../../stories/Rating/testIds';

import { TEST_IDS } from '../../stories/Rating/testIds';

export const RATING_STORIES = {
  playground: { name: 'rating', story: 'playground' },
  visualMatrix: { name: 'rating', story: 'visual-matrix' },
  interactionTest: { name: 'rating-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type RatingStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: RatingStoryProps,
  ref: StoryRef = RATING_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

/**
 * Ключевая выборка комбинаций осей для props propagation rendering-теста.
 * По одному представителю на каждое значение каждой оси (size × appearance),
 * без декартова произведения.
 */
export const RATING_KEY_COMBOS = [
  { size: SIZE.Xs, appearance: APPEARANCE.Yellow },
  { size: SIZE.S, appearance: APPEARANCE.Primary },
  { size: SIZE.S, appearance: APPEARANCE.Red },
] as const;

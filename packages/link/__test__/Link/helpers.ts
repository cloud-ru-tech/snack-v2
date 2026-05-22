import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, ROLE } from '../../src/constants';
import { TEST_IDS } from '../../stories/Link/testIds';

export { TEST_IDS };

export const LINK_STORIES = {
  playground: { name: 'link', story: 'playground' },
  visualMatrix: { name: 'link', story: 'visual-matrix' },
  interactionTest: { name: 'link-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type LinkStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: LinkStoryProps,
  ref: StoryRef = LINK_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      text: 'Link',
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

// Ключевая выборка комбинаций осей — по одному представителю на значение каждой
// оси, без декартова произведения. Полный sweep — задача VisualMatrix snapshot.
export const LINK_KEY_COMBOS = [
  { appearance: APPEARANCE.Primary, role: ROLE.Regular },
  { appearance: APPEARANCE.Red, role: ROLE.Regular },
  { appearance: APPEARANCE.Neutral, role: ROLE.OnAccent },
] as const;

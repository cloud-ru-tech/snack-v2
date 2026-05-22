import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/components/constants';

export { TEST_IDS };

export const SLIDER_STORIES = {
  playground: { name: 'slider', story: 'playground' },
  visualMatrix: { name: 'slider', story: 'visual-matrix' },
  interactionTest: { name: 'slider-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SLIDER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

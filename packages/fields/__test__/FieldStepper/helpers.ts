import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const FIELD_STEPPER_STORIES = {
  playground: { name: 'fields-fieldstepper', story: 'playground' },
  visualMatrix: { name: 'fields-fieldstepper', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldstepper-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_STEPPER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldStepper, ...props },
  };
}

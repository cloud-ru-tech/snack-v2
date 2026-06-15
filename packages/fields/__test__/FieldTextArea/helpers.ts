import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const FIELD_TEXTAREA_STORIES = {
  playground: { name: 'fields-fieldtextarea', story: 'playground' },
  visualMatrix: { name: 'fields-fieldtextarea', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldtextarea-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_TEXTAREA_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldTextArea, ...props },
  };
}

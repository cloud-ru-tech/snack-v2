import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const FIELD_DECORATOR_STORIES = {
  playground: { name: 'fields-fielddecorator', story: 'playground' },
  visualMatrix: { name: 'fields-fielddecorator', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_DECORATOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldDecorator, ...props },
  };
}

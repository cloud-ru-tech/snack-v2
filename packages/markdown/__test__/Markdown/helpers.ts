import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const MARKDOWN_STORIES = {
  playground: { name: 'markdown', group: 'markdown', story: 'playground' },
  visualMatrix: { name: 'markdown', group: 'markdown', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = MARKDOWN_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.viewer,
      ...props,
    },
  };
}

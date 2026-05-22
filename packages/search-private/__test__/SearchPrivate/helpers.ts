import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/SearchPrivate/testIds';

export { TEST_IDS };

export const SEARCH_PRIVATE_STORIES = {
  playground: { name: 'searchprivate', story: 'playground' },
  visualMatrix: { name: 'searchprivate', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SEARCH_PRIVATE_STORIES.playground,
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

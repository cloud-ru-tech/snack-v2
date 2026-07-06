import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

/** Title `Components/List/ReorderableList` → kebab-cased storybook id (сверено с `/index.json`). */
export const REORDERABLE_LIST_STORIES = {
  playground: { name: 'list-reorderablelist', story: 'playground' },
  visualMatrix: { name: 'list-reorderablelist', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = REORDERABLE_LIST_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.reorderableList.root, ...props },
  };
}

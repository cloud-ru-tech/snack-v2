import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

/** Title `Components/DragAndDrop/DragPreview` → kebab-cased storybook id (сверено с `/index.json`). */
export const DRAG_PREVIEW_STORIES = {
  playground: { group: 'draganddrop', name: 'dragpreview', story: 'playground' },
  visualMatrix: { group: 'draganddrop', name: 'dragpreview', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = DRAG_PREVIEW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.dragPreview, ...props },
  };
}

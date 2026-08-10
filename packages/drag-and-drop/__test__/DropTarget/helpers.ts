import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

/** Title `Components/DragAndDrop/DropTarget` → kebab-cased storybook id (сверено с `/index.json`). */
export const DROP_TARGET_STORIES = {
  playground: { group: 'draganddrop', name: 'droptarget', story: 'playground' },
  visualMatrix: { group: 'draganddrop', name: 'droptarget', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = DROP_TARGET_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.dropTarget, ...props },
  };
}

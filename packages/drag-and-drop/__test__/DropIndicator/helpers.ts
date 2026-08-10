import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

/** Title `Components/DragAndDrop/DropIndicator` → kebab-cased storybook id (сверено с `/index.json`). */
export const DROP_INDICATOR_STORIES = {
  playground: { group: 'draganddrop', name: 'dropindicator', story: 'playground' },
  visualMatrix: { group: 'draganddrop', name: 'dropindicator', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = DROP_INDICATOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.dropIndicator, ...props },
  };
}

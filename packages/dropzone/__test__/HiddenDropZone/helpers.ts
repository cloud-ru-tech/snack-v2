import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const HIDDEN_DROPZONE_STORIES = {
  playground: { name: 'hiddendropzone', group: 'dropzone', story: 'playground' },
  visualMatrix: { name: 'hiddendropzone', group: 'dropzone', story: 'visual-matrix' },
  interactionTest: {
    name: 'hiddendropzone-tests-interaction',
    group: 'dropzone',
    story: 'interaction-test',
  },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = HIDDEN_DROPZONE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.hiddenDropZone.root, ...props },
  };
}

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const DROPZONE_STORIES = {
  playground: { name: 'dropzone', group: 'dropzone', story: 'playground' },
  visualMatrix: { name: 'dropzone', group: 'dropzone', story: 'visual-matrix' },
  interactionTest: {
    name: 'dropzone-tests-interaction',
    group: 'dropzone',
    story: 'interaction-test',
  },
  acceptImage: {
    name: 'dropzone-tests-acceptvariants',
    group: 'dropzone',
    story: 'accept-image',
  },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = DROPZONE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.dropzone.root,
      ...props,
    },
  };
}

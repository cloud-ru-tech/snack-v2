import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const FILE_UPLOAD_STORIES = {
  playground: { name: 'fileupload', group: 'dropzone', story: 'playground' },
  visualMatrix: { name: 'fileupload', group: 'dropzone', story: 'visual-matrix' },
  interactionTest: {
    name: 'fileupload-tests-interaction',
    group: 'dropzone',
    story: 'interaction-test',
  },
  singleImage: {
    name: 'fileupload-examples-singleimage',
    group: 'dropzone',
    story: 'single-image',
  },
  acceptImage: {
    name: 'fileupload-tests-acceptvariants',
    group: 'dropzone',
    story: 'accept-image',
  },
  acceptPdfDoc: {
    name: 'fileupload-tests-acceptvariants',
    group: 'dropzone',
    story: 'accept-pdf-doc',
  },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FILE_UPLOAD_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fileUpload.root,
      ...props,
    },
  };
}

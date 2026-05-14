import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const UPLOAD_TEST_ID = TEST_IDS.uploadRoot;
export const UPLOAD_CLOSE_TEST_ID = TEST_IDS.uploadClose;
export const UPLOAD_COLLAPSE_BUTTON_TEST_ID = TEST_IDS.uploadCollapseButton;
export const UPLOAD_LIST_TEST_ID = TEST_IDS.uploadList;
export const UPLOAD_FILE_ITEM_TEST_ID = TEST_IDS.uploadFileItem;

const GROUP = 'toaster';
const STORY_NAME = 'toastupload';

export const UPLOAD_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type UploadStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: UploadStoryProps,
  story: string = UPLOAD_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props: {
      'data-test-id': UPLOAD_TEST_ID,
      ...props,
    },
  };
}

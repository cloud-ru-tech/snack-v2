import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TOAST_UPLOAD_STATUS } from '../../src/components/ToastUpload/constants';
import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

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
      'data-test-id': TEST_IDS.uploadRoot,
      ...props,
    },
  };
}

// Ключевая выборка status — по 1 представителю каждого значения TOAST_UPLOAD_STATUS.
// Не axis-per-test loop: остальные значения покрываются VisualMatrix.
export const UPLOAD_STATUS_KEY_VALUES = [TOAST_UPLOAD_STATUS.Loading, TOAST_UPLOAD_STATUS.Error] as const;

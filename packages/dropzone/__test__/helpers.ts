import type { StorybookUrlOptions } from '../../../playwright/utils/getStorybookUrl';

const DROPZONE_GROUP = 'dropzone';

export const TEST_IDS = {
  dropzone: 'dropzone',
  fileUpload: 'file-upload',
  hiddenDropZone: 'hidden-dropzone',
  filesList: 'files-list',
} as const;

export function dropzoneStoryProps(overrides?: Partial<StorybookUrlOptions['props']>): StorybookUrlOptions {
  return {
    name: 'dropzone',
    group: DROPZONE_GROUP,
    story: 'playground',
    category: 'components',
    props: {
      'data-test-id': TEST_IDS.dropzone,
      ...overrides,
    },
  };
}

export function fileUploadStoryProps(overrides?: Partial<StorybookUrlOptions['props']>): StorybookUrlOptions {
  return {
    name: 'fileupload',
    group: DROPZONE_GROUP,
    story: 'playground',
    category: 'components',
    props: {
      'data-test-id': TEST_IDS.fileUpload,
      ...overrides,
    },
  };
}

export function hiddenDropZoneStoryProps(overrides?: Partial<StorybookUrlOptions['props']>): StorybookUrlOptions {
  return {
    name: 'hiddendropzone',
    group: DROPZONE_GROUP,
    story: 'playground',
    category: 'components',
    props: {
      'data-test-id': TEST_IDS.hiddenDropZone,
      ...overrides,
    },
  };
}

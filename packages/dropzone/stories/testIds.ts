import { TEST_IDS as PUBLIC_TEST_IDS } from '../src/constants';

export const TEST_IDS = {
  dropzone: {
    root: 'dropzone',
    slotContent: 'dropzone-slot-content',
    filesList: 'dropzone-files-list',
    nativeInput: PUBLIC_TEST_IDS.dropzone.nativeInput,
  },
  fileUpload: {
    root: 'file-upload',
    trigger: 'file-upload-trigger',
    filesList: 'file-upload-files-list',
    nativeInput: PUBLIC_TEST_IDS.fileUpload.nativeInput,
  },
  hiddenDropZone: {
    root: 'hidden-dropzone',
    form: 'hidden-dropzone-form',
    description: 'hidden-dropzone-description',
    overlayContent: 'hidden-dropzone-overlay-content',
    filesList: 'hidden-dropzone-files-list',
  },
} as const;

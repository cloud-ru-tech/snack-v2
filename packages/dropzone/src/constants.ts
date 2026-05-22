export const UPLOAD_MODE = {
  Single: 'single',
  Multiple: 'multiple',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const TEST_IDS = {
  dropzone: {
    nativeInput: 'file-input',
  },
  fileUpload: {
    nativeInput: 'file-upload__native-input',
  },
} as const;

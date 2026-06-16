import type { UploadFilesAcceptItem } from './types';

export const UPLOAD_STATUS = {
  Uploading: 'uploading',
  Success: 'success',
  Error: 'error',
} as const;

export const SUMMARY_ERROR_TYPE = {
  FileLimit: 'fileLimit',
  SomeFilesNotUploaded: 'someFilesNotUploaded',
} as const;

export const DEFAULT_MAX_FILES = 3;
export const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

// `*` — любой файл по умолчанию: без иконок и отображаемых имён форматов.
export const DEFAULT_ACCEPT: UploadFilesAcceptItem[] = [{ extention: '*' }];


const PREFIX = 'upload-files';

export const TEST_IDS = {
  root: PREFIX,
  dropzone: `${PREFIX}__dropzone`,
  attachment: `${PREFIX}__attachment`,
} as const;

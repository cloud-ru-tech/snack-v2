export { buildAcceptAttribute } from '@ds/dropzone';

export { UploadFiles } from './UploadFiles';
export * from './constants';
export * from './types';
export { formatFileSize, formatFileDescription, joinWithConjunction, makeId } from './utils';
export { useUploadFilesController } from './hooks';
export type {
  SummaryErrorType,
  UploadFilesMessages,
  UseUploadFilesControllerOptions,
  UseUploadFilesControllerResult,
} from './hooks';

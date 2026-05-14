import { ToastUploadProgressAppearance } from '../../helperComponents/ToastUploadProgress';
import { ToastUploadItemStatus, ToastUploadStatus } from './types';

export const MAX_PROGRESS_PERCENT = 100;

export const TOAST_UPLOAD_STATUS = {
  Loading: 'loading',
  Pause: 'pause',
  Error: 'error',
  Uploaded: 'uploaded',
  ErrorUploaded: 'errorUploaded',
} as const;

export const TOAST_UPLOAD_ITEM_STATUS = {
  Loading: 'loading',
  Pause: 'pause',
  Error: 'error',
  Uploaded: 'uploaded',
} as const;

// TitleLine (общий прогресс) — green в loading/uploaded, neutral в pause, red в ошибках.
// Track (подложка) у всех appearance одинаковый — `invertNeutral/decor` (см.
// ToastUploadProgress/styles.module.scss::.track). По Figma `toastUpload/Progress/*`
// меняется только цвет filler'а.
export const progressBarAppearanceByStatus: Record<ToastUploadStatus, ToastUploadProgressAppearance> = {
  pause: 'neutral',
  loading: 'green',
  uploaded: 'green',
  errorUploaded: 'red',
  error: 'red',
};

// FileItem (per-file) — green во время активной загрузки конкретного файла.
export const fileItemProgressBarAppearanceByStatus: Record<ToastUploadItemStatus, ToastUploadProgressAppearance> = {
  pause: 'neutral',
  loading: 'green',
  uploaded: 'green',
  error: 'red',
};

import { TOAST_UPLOAD_ITEM_STATUS, UploadItem } from '@ds/toaster';

export const fileLoading: UploadItem = {
  id: 'f-loading',
  title: 'document.pdf',
  status: TOAST_UPLOAD_ITEM_STATUS.Loading,
  statusLabel: 'Загрузка...',
  progress: 45,
  formattedSize: '12.4 МБ',
  actions: { onCancel: () => {}, onPause: () => {} },
};

export const filePause: UploadItem = {
  id: 'f-pause',
  title: 'image.png',
  status: TOAST_UPLOAD_ITEM_STATUS.Pause,
  statusLabel: 'Пауза',
  progress: 60,
  formattedSize: '2.1 МБ',
  actions: { onContinue: () => {}, onCancel: () => {} },
};

export const fileError: UploadItem = {
  id: 'f-error',
  title: 'archive.zip',
  status: TOAST_UPLOAD_ITEM_STATUS.Error,
  statusLabel: 'Ошибка',
  progress: 0,
  formattedSize: '120 МБ',
  actions: { onRetry: () => {}, onCancel: () => {} },
};

export const fileUploaded: UploadItem = {
  id: 'f-uploaded',
  title: 'report.xlsx',
  status: TOAST_UPLOAD_ITEM_STATUS.Uploaded,
  statusLabel: 'Загружено',
  progress: 100,
  formattedSize: '320 КБ',
  actions: {},
  link: { label: 'Открыть', href: '#' },
};

export const sampleFiles: UploadItem[] = [fileLoading, filePause, fileError, fileUploaded];

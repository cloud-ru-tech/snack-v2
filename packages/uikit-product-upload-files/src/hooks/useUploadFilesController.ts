import { FILE_REJECTION_REASON, partitionFiles } from '@ds/dropzone';
import { useCallback, useEffect, useRef } from 'react';

import { SUMMARY_ERROR_TYPE, UPLOAD_STATUS } from '../constants';
import { UploadFileItem, UploadFn } from '../types';
import { makeId } from '../utils';

export type SummaryErrorType = (typeof SUMMARY_ERROR_TYPE)[keyof typeof SUMMARY_ERROR_TYPE] | null;

/** Готовые локализованные тексты ошибок для контроллера */
export type UploadFilesMessages = {
  fileFormatError: string;
  fileSizeError: string;
  fileLimitError: string;
  uploadError: string;
};

export type UseUploadFilesControllerOptions<TResult> = {
  value: UploadFileItem<TResult>[];
  onChange: (items: UploadFileItem<TResult>[]) => void;
  upload: UploadFn<TResult>;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  messages: UploadFilesMessages;
};

export type UseUploadFilesControllerResult<TResult> = {
  items: UploadFileItem<TResult>[];
  summaryError: string | undefined;
  summaryErrorType: SummaryErrorType;
  handleFilesUpload: (files: File[]) => void;
  handleDelete: (id: string) => void;
};

export function useUploadFilesController<TResult>({
  value,
  onChange,
  upload,
  accept,
  maxFiles,
  maxSize,
  disabled,
  messages,
}: UseUploadFilesControllerOptions<TResult>): UseUploadFilesControllerResult<TResult> {
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  const valueRef = useRef(value);
  valueRef.current = value;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const uploadRef = useRef(upload);
  uploadRef.current = upload;

  useEffect(() => {
    const controllers = abortControllersRef.current;

    return () => {
      controllers.forEach(controller => controller.abort());
      controllers.clear();
    };
  }, []);

  const updateItems = useCallback((updater: (prev: UploadFileItem<TResult>[]) => UploadFileItem<TResult>[]) => {
    // Синхронно обновляем ref, чтобы параллельные загрузки, завершившиеся до
    // следующего ре-рендера, строили обновление на актуальном состоянии, а не
    // на устаревшем value — иначе последний onChange затирает остальные.
    const next = updater(valueRef.current);
    valueRef.current = next;
    onChangeRef.current(next);
  }, []);

  const startUpload = useCallback(
    (item: UploadFileItem<TResult>) => {
      const controller = new AbortController();
      abortControllersRef.current.set(item.id, controller);

      uploadRef
        .current(item.file, { signal: controller.signal })
        .then(result => {
          abortControllersRef.current.delete(item.id);
          updateItems(prev =>
            prev.map(current =>
              current.id === item.id
                ? { ...current, status: UPLOAD_STATUS.Success, result, progress: 100, error: undefined }
                : current,
            ),
          );
        })
        .catch(() => {
          abortControllersRef.current.delete(item.id);

          if (controller.signal.aborted) {
            return;
          }

          updateItems(prev =>
            prev.map(current =>
              current.id === item.id
                ? { ...current, status: UPLOAD_STATUS.Error, error: messages.uploadError }
                : current,
            ),
          );
        });
    },
    [messages, updateItems],
  );

  const handleFilesUpload = useCallback(
    (files: File[]) => {
      if (disabled || !files.length) {
        return;
      }

      const { accepted, rejected } = partitionFiles(files, { accept, maxSize });

      const rejectedItems: UploadFileItem<TResult>[] = rejected.map(({ file, reason }) => ({
        id: makeId(),
        file,
        status: UPLOAD_STATUS.Error,
        error: reason === FILE_REJECTION_REASON.MaxSize ? messages.fileSizeError : messages.fileFormatError,
      }));

      const acceptedItems: UploadFileItem<TResult>[] = accepted.map(file => ({
        id: makeId(),
        file,
        status: UPLOAD_STATUS.Uploading,
      }));

      const next = [...valueRef.current, ...rejectedItems, ...acceptedItems];
      valueRef.current = next;
      onChangeRef.current(next);

      acceptedItems.forEach(startUpload);
    },
    [accept, disabled, maxSize, messages, startUpload],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const controller = abortControllersRef.current.get(id);

      if (controller) {
        controller.abort();
        abortControllersRef.current.delete(id);
      }

      updateItems(prev => prev.filter(item => item.id !== id));
    },
    [updateItems],
  );

  const hasItemErrors = value.some(item => item.status === UPLOAD_STATUS.Error || Boolean(item.error));
  const isOverLimit = typeof maxFiles === 'number' && value.length > maxFiles;

  let summaryError: string | undefined;
  let summaryErrorType: SummaryErrorType = null;
  if (isOverLimit) {
    summaryError = messages.fileLimitError;
    summaryErrorType = SUMMARY_ERROR_TYPE.FileLimit;
  } else if (hasItemErrors) {
    summaryErrorType = SUMMARY_ERROR_TYPE.SomeFilesNotUploaded;
  }

  return {
    items: value,
    summaryError,
    summaryErrorType,
    handleFilesUpload,
    handleDelete,
  };
}

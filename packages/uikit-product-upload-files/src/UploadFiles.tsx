import { buildAcceptAttribute, Dropzone } from '@ds/dropzone';
import { FieldDecorator, SIZE } from '@ds/field-decorator';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, useMemo, useRef } from 'react';

import { Attachments, UploadFilesDropZone } from './components';
import {
  DEFAULT_ACCEPT,
  DEFAULT_MAX_FILES,
  DEFAULT_MAX_SIZE,
  SUMMARY_ERROR_TYPE,
  TEST_IDS,
  UPLOAD_STATUS,
} from './constants';
import { UploadFilesMessages, useUploadFilesController } from './hooks';
import { uploadFilesLocale } from './locale';
import styles from './styles.module.scss';
import { UploadFilesProps } from './types';
import { formatFileSize, joinWithConjunction } from './utils';

export const UploadFiles = forwardRef<HTMLDivElement, UploadFilesProps>(function UploadFiles(
  {
    label,
    hint,
    optional = true,
    disabled = false,
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
    name,
    onBlur,
    error: formError,
    upload,
    accept: acceptProp = DEFAULT_ACCEPT,
    maxFiles = DEFAULT_MAX_FILES,
    maxSize = DEFAULT_MAX_SIZE,
    className,
    attachmentClassname,
    ...rest
  },
  ref,
) {
  const { t } = uploadFilesLocale.useTranslations();
  const localRef = useRef<HTMLDivElement>(null);
  const rootRef = mergeRefs(ref, localRef);

  // `*` означает «любой файл» — не передаём его в accept, чтобы не ограничивать
  // ни native picker, ни валидацию форматов в partitionFiles.
  const accept = useMemo(
    () =>
      acceptProp
        .map(item => item.extention)
        .filter(extension => extension && extension !== '*')
        .join(','),
    [acceptProp],
  );

  const displayExtensions = useMemo(
    () => acceptProp.map(item => item.displayExtension).filter((extension): extension is string => Boolean(extension)),
    [acceptProp],
  );

  // Перечисление через запятую — для описания в дропзоне
  const formatsList = useMemo(() => displayExtensions.join(', '), [displayExtensions]);

  // Перечисление с союзом «и» — только для текста ошибки формата
  const formatsConjunctionList = useMemo(
    () => joinWithConjunction(displayExtensions, t('formatsConjunction')),
    [displayExtensions, t],
  );

  const units = useMemo(
    () => ({
      b: t('units.b'),
      kb: t('units.kb'),
      mb: t('units.mb'),
      gb: t('units.gb'),
    }),
    [t],
  );

  const [value = [], onChange] = useValueControl<UploadFilesProps['value']>({
    value: valueProp,
    defaultValue: defaultValue ?? [],
    onChange: onChangeProp,
  });

  const maxSizeLabel = useMemo(
    () => (typeof maxSize === 'number' ? formatFileSize(maxSize, units) : ''),
    [maxSize, units],
  );

  const messages = useMemo<UploadFilesMessages>(
    () => ({
      fileFormatError: t('errorFileFormat', { formats: formatsConjunctionList }),
      fileSizeError: t('errorFileSize', { size: maxSizeLabel }),
      fileLimitError: typeof maxFiles === 'number' ? t('errorFileLimit', { count: maxFiles }) : '',
      uploadError: t('uploadError'),
    }),
    [t, formatsConjunctionList, maxSizeLabel, maxFiles],
  );

  const { items, summaryError, summaryErrorType, handleFilesUpload, handleFilesReject, handleDelete } =
    useUploadFilesController({
      value,
      onChange,
      upload,
      accept,
      maxFiles,
      maxSize,
      disabled,
      messages,
    });

  const dropzoneDescription = useMemo(() => {
    const count = maxFiles ?? '';

    if (!formatsList && !count && !maxSizeLabel) {
      return undefined;
    }

    return t(formatsList ? 'dropzoneDescription' : 'dropzoneDescriptionNoFormats', {
      formats: formatsList,
      count: String(count),
      size: maxSizeLabel,
    });
  }, [formatsList, maxFiles, maxSizeLabel, t]);

  const displayedError = useMemo(() => {
    if (formError) {
      return formError;
    }

    if (summaryErrorType === SUMMARY_ERROR_TYPE.FileLimit) {
      return summaryError;
    }

    if (summaryErrorType === SUMMARY_ERROR_TYPE.SomeFilesNotUploaded) {
      return t('errorSomeFilesNotUploaded');
    }

    return undefined;
  }, [formError, summaryError, summaryErrorType, t]);

  const formValue = useMemo(
    () => JSON.stringify(items.filter(item => item.status === UPLOAD_STATUS.Success).map(item => item.result)),
    [items],
  );

  const acceptAttribute = buildAcceptAttribute(accept);

  const hasError = Boolean(displayedError);

  const isOverLimit = typeof maxFiles === 'number' && value.length > maxFiles;

  const labelTooltip = useMemo(() => (hint ? { tip: hint } : undefined), [hint]);

  const length = useMemo(
    () => (isOverLimit ? { current: value.length, max: maxFiles } : undefined),
    [isOverLimit, value.length, maxFiles],
  );

  return (
    <div
      {...extractSupportProps(rest)}
      ref={rootRef}
      role='group'
      className={cn(styles.root, className)}
      data-test-id={TEST_IDS.root}
      onBlur={onBlur}
    >
      {name && <input type='hidden' name={name} value={formValue} readOnly />}

      <FieldDecorator
        className={styles.dropzoneSection}
        label={label}
        labelTooltip={labelTooltip}
        caption={optional ? t('optional') : undefined}
        error={displayedError}
        showHintIcon={hasError}
        length={length}
        size={SIZE.S}
        disabled={disabled}
      >
        <Dropzone
          onFilesUpload={handleFilesUpload}
          onFilesReject={handleFilesReject}
          disabled={disabled}
          accept={acceptAttribute}
          aria-invalid={hasError || undefined}
        >
          <UploadFilesDropZone
            title={t('dropzoneTitle')}
            description={dropzoneDescription}
            buttonLabel={t('dropzoneButton')}
          />
        </Dropzone>
      </FieldDecorator>

      <Attachments
        className={attachmentClassname}
        items={items}
        accept={acceptProp}
        disabled={disabled}
        units={units}
        onDelete={handleDelete}
      />
    </div>
  );
});

import { defineLocale, defineMessages } from '@ds/locale';

const UPLOAD_FILES_MESSAGES = defineMessages({
  'en-GB': {
    optional: 'Optional',
    dropzoneTitle: 'Drag a file here or click',
    dropzoneButton: 'Select file',
    dropzoneDescription: '{{formats}} no more than {{count}} files up to {{size}}',
    dropzoneDescriptionNoFormats: 'No more than {{count}} files up to {{size}}',
    errorRequired: 'Required field',
    errorSomeFilesNotUploaded: 'Some files were not uploaded',
    errorFileLimit: 'You can upload no more than {{count}} files',
    errorFileFormat: 'Only {{formats}} are supported',
    errorFileSize: 'File size must not exceed {{size}}',
    formatsConjunction: 'and',
    uploadError: 'Upload failed',
    units: {
      b: 'B',
      kb: 'KB',
      mb: 'MB',
      gb: 'GB',
    },
  },
  'ru-RU': {
    optional: 'Опционально',
    dropzoneTitle: 'Перетащите файл или нажмите',
    dropzoneButton: 'Выбрать файл',
    dropzoneDescription: '{{formats}} не более {{count}} файлов до {{size}}',
    dropzoneDescriptionNoFormats: 'Не более {{count}} файлов до {{size}}',
    errorRequired: 'Обязательное поле',
    errorSomeFilesNotUploaded: 'Некоторые файлы не загружены',
    errorFileLimit: 'Можно загрузить не более {{count}} файлов',
    errorFileFormat: 'Поддерживаются только {{formats}}',
    errorFileSize: 'Размер файла превышает {{size}}',
    formatsConjunction: 'и',
    uploadError: 'Ошибка загрузки',
    units: {
      b: 'Б',
      kb: 'Кб',
      mb: 'Мб',
      gb: 'Гб',
    },
  },
});

export type UploadFilesMessages = (typeof UPLOAD_FILES_MESSAGES)['en-GB'];

/** locale компонента UploadFiles: `uploadFilesLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const uploadFilesLocale = defineLocale('@ds/uikit-product-upload-files', UPLOAD_FILES_MESSAGES);

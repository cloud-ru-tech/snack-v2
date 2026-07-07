import { ValueOf } from '@ds/utils';
import { ChangeEventHandler, Ref } from 'react';

import { SIZE, UPLOAD_MODE } from './constants';
import { AcceptInput, FileRejection } from './utils';

export type UploadMode = ValueOf<typeof UPLOAD_MODE>;
export type Size = ValueOf<typeof SIZE>;

/**
 * Пропы, превращающие компонент загрузки в полноценное поле формы: нативные
 * атрибуты скрытого `<input type="file">`, ссылка на него, валидация файлов.
 * Общий контракт для FileUpload, Dropzone и HiddenDropZone.
 */
export type FileFieldProps = {
  /** Разрешённые типы: MIME-тип (`image/png`), шаблон (`image/*`) или расширение (`.pdf`). Строка или массив. */
  accept?: AcceptInput;
  /** Максимальный размер одного файла в байтах. Превысившие уходят в `onFilesReject`. */
  maxSize?: number;
  /** Колбек с отклонёнными файлами и причиной (`maxSize` / `mime`). */
  onFilesReject?(rejections: FileRejection[]): void;
  /** Нативный `name` скрытого input — для отправки формы и интеграции с form-библиотеками. */
  name?: string;
  /** Нативный `id` скрытого input — для связи с `<label htmlFor>`. */
  id?: string;
  /** Нативный `required` скрытого input. */
  required?: boolean;
  /** Нативный `form` скрытого input — привязка к форме по `id`. */
  form?: string;
  /** Нативный `capture` скрытого input — источник захвата на мобильных (камера/микрофон). */
  capture?: boolean | 'user' | 'environment';
  /** Нативный `onChange` скрытого input. Вызывается до валидации с исходным событием. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Ссылка на нативный `<input type="file">` — для интеграции с формами (react-hook-form `ref`). */
  innerRef?: Ref<HTMLInputElement>;
};

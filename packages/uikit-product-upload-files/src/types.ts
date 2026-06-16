import { IconPredefinedProps } from '@ds/icon-predefined';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { FocusEventHandler, ReactNode } from 'react';

import { UPLOAD_STATUS } from './constants';

export type UploadStatus = ValueOf<typeof UPLOAD_STATUS>;

/** Локализованные единицы измерения размера файла */
export type FileSizeUnits = {
  b: string;
  kb: string;
  mb: string;
  gb: string;
};

export type UploadFileItem<TResult = unknown> = {
  id: string;
  file: File;
  status: UploadStatus;
  progress?: number;
  error?: string;
  result?: TResult;
};

export type UploadFn<TResult = unknown> = (file: File, ctx: { signal: AbortSignal }) => Promise<TResult>;

export type UploadFilesAcceptItem = {
  /** Расширение файла (например `.pdf` или `*` для всех типов файлов) */
  extention: string;
  /** Иконка, отображаемая для файлов этого типа во вложениях */
  icon?: IconPredefinedProps['icon'];
  /** Отображаемое расширение файла для пользователя (например `PDF`) */
  displayExtension?: string;
};

export type UploadFilesProps<TResult = unknown> = WithSupportProps<{
  /** Текст метки поля */
  label?: string;
  /** Подсказка question tooltip у метки */
  hint?: ReactNode;
  /**
   * Показывает «Опционально» справа от метки
   * @default true
   */
  optional?: boolean;
  /** Заблокировано */
  disabled?: boolean;
  /** Контролируемое значение */
  value?: UploadFileItem<TResult>[];
  /** Начальное значение */
  defaultValue?: UploadFileItem<TResult>[];
  /** Колбэк изменения значения */
  onChange?(items: UploadFileItem<TResult>[]): void;
  /** Имя поля формы */
  name?: string;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /** Ошибка формы (например required из RHF) */
  error?: string;
  /** Обязательная кастомная функция загрузки */
  upload: UploadFn<TResult>;
  /** CSS-класс корня */
  className?: string;
  /** Допустимые типы файлов с иконкой для каждого расширения */
  accept?: UploadFilesAcceptItem[];
  /** Максимальное количество файлов */
  maxFiles?: number;
  /** Максимальный размер файла в байтах */
  maxSize?: number;
  /** CSS-класс прикрепленного файла */
  attachmentClassname?: string;
}>;

export type UploadFilesDropZoneProps = {
  title?: string;
  description?: ReactNode;
  buttonLabel?: string;
};

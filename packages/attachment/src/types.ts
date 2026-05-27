import { IconPredefinedProps } from '@ds/icon-predefined';
import { TruncateStringProps } from '@ds/truncate-string';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { MouseEvent } from 'react';

import { SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type AttachmentSquareProps = WithSupportProps<{
  /** Файл */
  file?: File;
  /** Колбек на клик по кнопке скачивания */
  onDownload?(file?: File | undefined): void;
  /** Колбек на клик по кнопке удаления */
  onDelete?(file?: File | undefined): void;
  /** Колбек на клик по кнопке повторения */
  onRetry?(): void;
  /**
   * Заголовок
   * @default fileName
   */
  title?: string;
  /**
   * Описание
   * @default fileExtension
   */
  description?: string;
  /** Сообщение об ошибке */
  error?: string;
  /**
   * Вариант обрезания строки:
   * <br> - `end` — с конца;
   * <br> - `middle` — по середине
   */
  truncateVariant?: TruncateStringProps['variant'];
  /** Управление состоянием загрузки */
  loading?: boolean;
  /**
   * Иконка для файла
   * @defaultIcon FileSVG
   */
  icon?: IconPredefinedProps['icon'];
  /** Размер */
  size?: Size;
  /** Состояние «выбран» (множественный выбор) */
  checked?: boolean;
  /** Заблокировано */
  disabled?: boolean;
  /** Клик по карточке */
  onClick?(event: MouseEvent<HTMLDivElement>): void;
  /** CSS-класс корня */
  className?: string;
}>;

export type AttachmentProps = AttachmentSquareProps & {
  truncate?: {
    /**
     * Максимальное кол-во строк заголовка
     * @default 1
     */
    title?: number;
    /**
     * Максимальное кол-во строк описания
     * @default 1
     */
    description?: number;
    /**
     * Максимальное кол-во строк ошибки
     * @default 1
     */
    error?: number;
  };
};

import { WithSupportProps } from '@ds/utils';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { Size } from '../../types';
import { UPLOAD_MODE } from './constants';

export type DragAndDropEventNames = 'onDragLeave' | 'onDragOver' | 'onDrop';

export type PrivateDropZoneProps = WithSupportProps<{
  isOver: boolean;
  /** Колбек загрузки файла */
  onFilesUpload(files: File[]): void;
  /** Контент dropzone */
  children?: ReactNode;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /**
   * Режим
   * @default multiple
   */
  mode?: (typeof UPLOAD_MODE)[keyof typeof UPLOAD_MODE];
  /** Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута */
  accept?: string;
  /** Размер компонента */
  size?: Size;
  /** CSS-класс */
  className?: string;
}> &
  Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, DragAndDropEventNames>;

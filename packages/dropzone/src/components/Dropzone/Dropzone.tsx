import { WithSupportProps } from '@design-system/utils';
import { ReactNode } from 'react';

import { useDrag } from '../../hooks/useDrag';
import { Size, UploadMode } from '../../types';
import { PrivateDropZone } from '../PrivateDropZone';

export type DropzoneProps = WithSupportProps<{
  /** Колбек загрузки файла */
  onFilesUpload(files: File[]): void;
  /** Контент dropzone */
  children?: ReactNode;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /**
   * Режим загрузки
   * @default multiple
   */
  mode?: UploadMode;
  /** Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута */
  accept?: string;
  /**
   * Размер компонента
   * @default m
   */
  size?: Size;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент — видимая зона для drag-n-drop загрузки файлов */
export function Dropzone({ disabled = false, children, ...rest }: DropzoneProps) {
  const { events, isOver } = useDrag(disabled);

  return (
    <PrivateDropZone {...events} {...rest} isOver={isOver} disabled={disabled}>
      {children}
    </PrivateDropZone>
  );
}

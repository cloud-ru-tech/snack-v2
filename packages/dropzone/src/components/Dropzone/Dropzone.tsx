import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { useDrag } from '../../hooks/useDrag';
import { FileFieldProps, Size, UploadMode } from '../../types';
import { PrivateDropZone } from '../PrivateDropZone';

export type DropzoneProps = WithSupportProps<
  {
    /** Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). */
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
    /**
     * Размер компонента
     * @default m
     */
    size?: Size;
    /** CSS-класс */
    className?: string;
  } & FileFieldProps
>;

/** Компонент — видимая зона для drag-n-drop загрузки файлов */
export function Dropzone({ disabled = false, children, ...rest }: DropzoneProps) {
  const { events, isOver } = useDrag(disabled);

  return (
    <PrivateDropZone {...events} {...rest} isOver={isOver} disabled={disabled}>
      {children}
    </PrivateDropZone>
  );
}

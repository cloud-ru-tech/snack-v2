import { WithSupportProps } from '@ds/utils';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { FileFieldProps, Size } from '../../types';
import { UPLOAD_MODE } from './constants';

export type DragAndDropEventNames = 'onDragLeave' | 'onDragOver' | 'onDrop';

export type PrivateDropZoneProps = WithSupportProps<
  {
    isOver: boolean;
    /** Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). */
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
    /** Размер компонента */
    size?: Size;
    /** CSS-класс */
    className?: string;
  } & FileFieldProps
> &
  Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, DragAndDropEventNames>;

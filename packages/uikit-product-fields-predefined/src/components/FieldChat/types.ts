import { AttachmentSquareProps } from '@ds/attachment';
import { FileUploadProps } from '@ds/dropzone';
import { FieldTextAreaProps } from '@ds/fields';

export type FieldChatProps = Omit<
  FieldTextAreaProps,
  // minRows/maxRows/кнопка копирования/onKeyDown зафиксированы внутри FieldChat и в API не выносятся.
  | 'placeholder'
  | 'hint'
  | 'label'
  | 'required'
  | 'size'
  | 'spellCheck'
  | 'footer'
  | 'minRows'
  | 'maxRows'
  | 'showCopyButton'
  | 'showCopyButtonInEditMode'
  | 'onKeyDown'
> & {
  /** Колбек действия при отправке */
  handleSubmit(value: string): void;
  /** Прикрепление файлов */
  attachment?: Pick<FileUploadProps, 'onFilesUpload' | 'accept'> & {
    /** Список загруженных файлов */
    files?: File[];
    /** Колбек действия при удалении прикреплённого файла */
    onFileDelete: AttachmentSquareProps['onDelete'];
  };
};

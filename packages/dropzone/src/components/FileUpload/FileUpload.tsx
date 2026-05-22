import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { ChangeEvent, cloneElement, MouseEvent, MouseEventHandler, ReactElement, useRef } from 'react';

import { TEST_IDS, UPLOAD_MODE } from '../../constants';
import { UploadMode } from '../../types';
import styles from './styles.module.scss';

export type FileUploadProps = WithSupportProps<{
  children: ReactElement;
  /** Колбек загрузки файла */
  onFilesUpload(files: File[]): void;
  /**
   * Режим
   * @default multiple
   */
  mode?: UploadMode;
  /** Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута */
  accept?: string;
}>;

export function FileUpload({ mode = UPLOAD_MODE.Multiple, onFilesUpload, accept, children, ...rest }: FileUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = (cb?: MouseEventHandler<HTMLElement>) => (e: MouseEvent<HTMLElement>) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }

    cb?.(e);
  };

  const handleFileSelect = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    const filesArray = Array.from(files);
    onFilesUpload(filesArray);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const childProps = children.props as { onClick?: MouseEventHandler<HTMLElement> };
  const mergedProps = { onClick: handleButtonClick(childProps?.onClick) };

  return (
    <>
      {cloneElement(children, mergedProps)}
      <input
        onChange={handleFileSelect}
        multiple={mode === UPLOAD_MODE.Multiple}
        ref={hiddenFileInput}
        className={styles.hiddenInput}
        type='file'
        accept={accept}
        onClick={handleClick}
        data-test-id={TEST_IDS.fileUpload.nativeInput}
        {...extractSupportProps(rest)}
      />
    </>
  );
}

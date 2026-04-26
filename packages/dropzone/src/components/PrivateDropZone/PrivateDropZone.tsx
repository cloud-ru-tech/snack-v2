import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ChangeEvent, DragEvent, useRef } from 'react';

import { UPLOAD_MODE } from './constants';
import styles from './styles.module.scss';
import type { PrivateDropZoneProps } from './types';

export function PrivateDropZone({
  disabled = false,
  className,
  isOver,
  onDragLeave,
  onDragOver,
  onDrop,
  mode = UPLOAD_MODE.Multiple,
  children,
  onFilesUpload,
  accept,
  size = 'm',
  ...rest
}: PrivateDropZoneProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleAttachFile = () => {
    if (disabled) return;
    hiddenFileInput.current?.click();
  };

  const handleFileSelect = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    const filesArray = Array.from(files);
    onFilesUpload(filesArray);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();

    const filesArray = Array.from(e.dataTransfer.files);
    onDrop?.(e);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onFilesUpload(mode === UPLOAD_MODE.Single ? [filesArray[0]!] : filesArray);
  };

  return (
    <button
      className={cn(className, styles.container)}
      type='button'
      disabled={disabled}
      {...extractSupportProps(rest)}
      data-over={isOver || undefined}
      data-disabled={disabled || undefined}
      data-size={size}
      onClick={handleAttachFile}
      tabIndex={disabled ? -1 : 0}
      onDrop={handleDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <span className={styles.acrylic} aria-hidden />
      <span className={styles.borderLayer} data-state-layer aria-hidden data-state='regularBorder' />
      <span className={styles.overLayer} data-state-layer aria-hidden data-state='activatedBackground' />

      {children && <div className={styles.content}>{children}</div>}

      <input
        data-test-id='file-input'
        className={styles.hidden}
        onChange={handleFileSelect}
        multiple={mode === UPLOAD_MODE.Multiple}
        ref={hiddenFileInput}
        type='file'
        accept={accept}
        onClick={e => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </button>
  );
}

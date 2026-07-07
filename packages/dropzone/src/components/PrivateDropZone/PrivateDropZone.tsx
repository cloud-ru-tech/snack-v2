import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ChangeEvent, DragEvent, MutableRefObject, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { buildAcceptAttribute, partitionFiles } from '../../utils';
import { UPLOAD_MODE } from './constants';
import styles from './styles.module.scss';
import { PrivateDropZoneProps } from './types';

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
  onFilesReject,
  accept,
  maxSize,
  onChange,
  innerRef,
  name,
  id,
  required,
  form,
  capture,
  size = 'm',
  ...rest
}: PrivateDropZoneProps) {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const setInputRef = (node: HTMLInputElement | null) => {
    hiddenFileInput.current = node;
    if (typeof innerRef === 'function') {
      innerRef(node);
    } else if (innerRef) {
      (innerRef as MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  const emitFiles = (files: File[]) => {
    if (typeof maxSize === 'number' || accept) {
      const { accepted, rejected } = partitionFiles(files, { maxSize, accept });
      if (rejected.length) {
        onFilesReject?.(rejected);
      }
      onFilesUpload(accepted);
      return;
    }
    onFilesUpload(files);
  };

  const handleAttachFile = () => {
    if (disabled) return;
    hiddenFileInput.current?.click();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    const { files } = e.target;
    if (!files) return;

    emitFiles(Array.from(files));
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();

    const filesArray = Array.from(e.dataTransfer.files);
    onDrop?.(e);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    emitFiles(mode === UPLOAD_MODE.Single ? [filesArray[0]!] : filesArray);
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
      <span className={styles.overLayer} data-state-layer aria-hidden data-state='activatedFilled' />

      {children && <div className={styles.content}>{children}</div>}

      <input
        data-test-id={TEST_IDS.dropzone.nativeInput}
        className={styles.hidden}
        onChange={handleFileSelect}
        multiple={mode === UPLOAD_MODE.Multiple}
        ref={setInputRef}
        type='file'
        accept={buildAcceptAttribute(accept)}
        disabled={disabled}
        name={name}
        id={id}
        required={required}
        form={form}
        capture={capture}
        onClick={e => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </button>
  );
}

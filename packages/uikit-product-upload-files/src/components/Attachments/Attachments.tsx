import { Attachment, SIZE } from '@ds/attachment';
import cn from 'classnames';

import { TEST_IDS, UPLOAD_STATUS } from '../../constants';
import styles from '../../styles.module.scss';
import { FileSizeUnits, UploadFileItem, UploadFilesAcceptItem } from '../../types';
import { formatFileDescription, resolveFileIcon } from '../../utils';

export type AttachmentsProps<TResult> = {
  items: UploadFileItem<TResult>[];
  accept: UploadFilesAcceptItem[];
  disabled?: boolean;
  units: FileSizeUnits;
  onDelete: (id: string) => void;
  className?: string;
};

export function Attachments<TResult>({ items, accept, disabled, units, onDelete, className }: AttachmentsProps<TResult>) {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.attachments} role='list' aria-live='polite' aria-relevant='additions text'>
      {items.map(item => (
        <div key={item.id} role='listitem' className={styles.attachmentItem}>
          <Attachment
            file={item.file}
            title={undefined}
            description={formatFileDescription(item.file, units)}
            icon={resolveFileIcon(item.file, accept)}
            loading={item.status === UPLOAD_STATUS.Uploading}
            error={item.error}
            disabled={disabled}
            size={SIZE.S}
            onDelete={() => onDelete(item.id)}
            data-test-id={TEST_IDS.attachment}
            className={cn(styles.attachment, className)}
          />
        </div>
      ))}
    </div>
  );
}

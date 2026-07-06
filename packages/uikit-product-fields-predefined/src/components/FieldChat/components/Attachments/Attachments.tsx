import { Attachment, AttachmentSquare, AttachmentSquareProps } from '@ds/attachment';
import { Scroll } from '@ds/scroll';

import styles from './styles.module.scss';

export type AttachmentsProps = {
  /** Прикреплённые файлы */
  files: AttachmentSquareProps[];
  /** Мобильная раскладка: карточки `Attachment` вместо квадратных `AttachmentSquare`, той же строкой под скролл. */
  isMobile?: boolean;
};

export function Attachments({ files, isMobile }: AttachmentsProps) {
  if (!files.length) {
    return null;
  }

  return (
    <Scroll className={styles.attachmentsScroll}>
      <div className={styles.attachments}>
        {files.map((file, index) =>
          isMobile ? (
            <Attachment key={file.file?.name || index} size='s' {...file} />
          ) : (
            <AttachmentSquare key={file.file?.name || index} size='s' {...file} />
          ),
        )}
      </div>
    </Scroll>
  );
}

import { AttachmentSquare } from '@ds/attachment';

import { PDF_FILE } from './sample';

export function AttachmentSquareBasic() {
  return (
    <AttachmentSquare
      file={PDF_FILE}
      onDownload={file => console.info('download', file?.name)}
      onDelete={file => console.info('delete', file?.name)}
    />
  );
}

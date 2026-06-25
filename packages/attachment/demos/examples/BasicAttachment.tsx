import { Attachment } from '@ds/attachment';

import { PDF_FILE } from './sample';

export function BasicAttachment() {
  return <Attachment file={PDF_FILE} onDownload={file => console.info('download', file?.name)} />;
}

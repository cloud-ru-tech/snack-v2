import { Attachment } from '@ds/attachment';

import { PDF_FILE } from './sample';

export function AttachmentLoading() {
  return <Attachment file={PDF_FILE} loading />;
}

import { Attachment } from '@ds/attachment';
import { useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentError() {
  const [retries, setRetries] = useState(0);

  return (
    <Attachment
      file={PDF_FILE}
      error={`Не удалось загрузить (попыток: ${retries})`}
      onRetry={() => setRetries(n => n + 1)}
      onDelete={file => console.info('delete', file?.name)}
    />
  );
}

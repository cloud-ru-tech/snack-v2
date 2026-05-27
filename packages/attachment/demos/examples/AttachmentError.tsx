import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentError() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [retries, setRetries] = useState(0);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment
          file={PDF_FILE}
          error={`Не удалось загрузить (попыток: ${retries})`}
          onRetry={() => setRetries(n => n + 1)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}

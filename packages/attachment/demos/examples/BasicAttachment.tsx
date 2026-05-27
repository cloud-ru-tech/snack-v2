import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function BasicAttachment() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment file={PDF_FILE} onDownload={file => console.info('download', file?.name)} />
      </div>
    </PortalContextProvider>
  );
}

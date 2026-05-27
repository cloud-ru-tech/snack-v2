import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentLoading() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment file={PDF_FILE} loading />
      </div>
    </PortalContextProvider>
  );
}

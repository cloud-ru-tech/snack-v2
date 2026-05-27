import { AttachmentSquare } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentSquareBasic() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AttachmentSquare
          file={PDF_FILE}
          onDownload={file => console.info('download', file?.name)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}

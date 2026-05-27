import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentSelectable() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment
          file={PDF_FILE}
          checked={checked}
          onClick={() => setChecked(v => !v)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}

import { AttachmentSquare } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useEffect, useRef, useState } from 'react';

import pictureUrl from './picture.jpg';

export function AttachmentSquareImage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetch(pictureUrl.src)
      .then(r => r.blob())
      .then(blob => setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' })));
  }, []);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AttachmentSquare
          size='m'
          file={file}
          onDownload={f => console.info('download', f?.name)}
          onDelete={f => console.info('delete', f?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}

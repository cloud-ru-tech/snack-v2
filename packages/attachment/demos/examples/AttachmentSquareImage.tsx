import { AttachmentSquare } from '@ds/attachment';
import { useEffect, useState } from 'react';

import pictureUrl from './picture.jpg';

export function AttachmentSquareImage() {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetch(pictureUrl.src)
      .then(r => r.blob())
      .then(blob => setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' })));
  }, []);

  return (
    <AttachmentSquare
      size='m'
      file={file}
      onDownload={f => console.info('download', f?.name)}
      onDelete={f => console.info('delete', f?.name)}
    />
  );
}

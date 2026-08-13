import { Attachment } from '@ds/attachment';
import { useEffect, useState } from 'react';

import pictureUrl from './picture.jpg?url';

export function AttachmentWithImage() {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetch(pictureUrl)
      .then(r => r.blob())
      .then(blob => setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' })));
  }, []);

  return (
    <Attachment
      file={file}
      title='Скриншот'
      description='JPG'
      onDownload={f => console.info('download', f?.name)}
      onDelete={f => console.info('delete', f?.name)}
    />
  );
}

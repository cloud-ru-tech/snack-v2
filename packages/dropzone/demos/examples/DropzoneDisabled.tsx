import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneDisabled() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone disabled onFilesUpload={setFiles}>
      <span>Загрузка недоступна{files.length ? ` (выбрано: ${files.length})` : ''}</span>
    </Dropzone>
  );
}

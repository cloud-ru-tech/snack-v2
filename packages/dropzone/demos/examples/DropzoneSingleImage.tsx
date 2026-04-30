import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneSingleImage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Dropzone mode='single' accept='image/*' onFilesUpload={files => setFile(files[0] ?? null)}>
      <span>{file ? file.name : 'Только одно изображение'}</span>
    </Dropzone>
  );
}

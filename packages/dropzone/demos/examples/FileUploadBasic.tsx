import { Button } from '@ds/button';
import { FileUpload } from '@ds/dropzone';
import { useState } from 'react';

export function FileUploadBasic() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <FileUpload onFilesUpload={setFiles}>
        <Button type='button' label='Загрузить файлы' />
      </FileUpload>
      {files.length > 0 && <span>Выбрано: {files.map(f => f.name).join(', ')}</span>}
    </div>
  );
}

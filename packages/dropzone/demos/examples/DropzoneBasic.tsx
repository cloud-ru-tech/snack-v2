import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneBasic() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Dropzone onFilesUpload={uploaded => setFiles(prev => [...prev, ...uploaded])}>
        <span>Перетащите файлы или нажмите, чтобы выбрать</span>
      </Dropzone>
      {files.length > 0 && (
        <ul>
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              {f.name} — {Math.ceil(f.size / 1024)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

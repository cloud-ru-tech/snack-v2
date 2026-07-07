import { Button } from '@ds/button';
import { FileRejection, FileUpload } from '@ds/dropzone';
import { useState } from 'react';

const MAX_SIZE = 5 * 1024 * 1024;

export function FileUploadFormField() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReject = (rejections: FileRejection[]) => {
    const [first] = rejections;
    setError(first?.reason === 'maxSize' ? 'Файл больше 5 МБ' : 'Недопустимый тип файла');
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <FileUpload
        name='resume'
        id='resume'
        required
        mode='single'
        accept={['.pdf', '.doc', '.docx']}
        maxSize={MAX_SIZE}
        onFilesReject={handleReject}
        onFilesUpload={files => {
          if (!files.length) return;
          setError(null);
          setFile(files[0]);
        }}
      >
        <Button type='button' label='Прикрепить резюме' />
      </FileUpload>
      {file && <span>{file.name}</span>}
      {error && <span>{error}</span>}
    </div>
  );
}

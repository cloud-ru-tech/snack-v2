import { HiddenDropZone } from '@ds/dropzone';
import { useState } from 'react';

export function HiddenDropZoneBasic() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <HiddenDropZone onFilesUpload={setFiles} content={<span>Отпустите, чтобы прикрепить файлы</span>}>
      <form>
        <label>
          Имя <input type='text' />
        </label>
        {files.length > 0 && <p>Прикреплено: {files.map(f => f.name).join(', ')}</p>}
      </form>
    </HiddenDropZone>
  );
}

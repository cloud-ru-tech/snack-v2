import { AiButtonClose, SIZE } from '@ds/ai-button-close';
import { Fragment, useState } from 'react';

export function CustomLabel() {
  const [files, setFiles] = useState(['report.pdf', 'photo.png']);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {files.map(file => (
        <Fragment key={file}>
          <span>{file}</span>
          <AiButtonClose
            size={SIZE.Xs}
            outline
            aria-label={`Удалить ${file}`}
            onClick={() => setFiles(prev => prev.filter(name => name !== file))}
          />
        </Fragment>
      ))}
    </div>
  );
}

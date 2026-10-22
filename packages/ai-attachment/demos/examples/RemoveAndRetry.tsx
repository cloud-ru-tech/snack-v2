import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { useState } from 'react';

export function RemoveAndRetry() {
  const [files, setFiles] = useState(['report.pdf', 'budget.xlsx', 'notes.txt']);
  const [failed, setFailed] = useState('budget.xlsx');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {files.map(file => (
        <AiAttachment
          key={file}
          type={ATTACHMENT_TYPE.File}
          state={file === failed ? ATTACHMENT_STATE.Error : ATTACHMENT_STATE.Default}
          fileName={file}
          tooltip={file === failed ? 'Не удалось загрузить' : file}
          onRemove={() => setFiles(prev => prev.filter(name => name !== file))}
          onRetry={() => setFailed('')}
        />
      ))}
    </div>
  );
}

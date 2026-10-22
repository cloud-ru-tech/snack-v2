import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { AiFieldInput } from '@ds/ai-field-input';
import { useState } from 'react';

const INITIAL_FILES = ['report.pdf', 'budget.xlsx', 'notes.txt', 'design.fig', 'contract.docx', 'roadmap.pdf'];

export function Attachments() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [failed, setFailed] = useState('budget.xlsx');

  return (
    <AiFieldInput
      placeholder='Опишите, что сделать с файлами'
      attachments={
        files.length > 0
          ? files.map(file => (
              <AiAttachment
                key={file}
                type={ATTACHMENT_TYPE.File}
                state={file === failed ? ATTACHMENT_STATE.Error : ATTACHMENT_STATE.Default}
                fileName={file}
                tooltip={file === failed ? 'Не удалось загрузить' : file}
                onRemove={() => setFiles(prev => prev.filter(name => name !== file))}
                onRetry={() => setFailed('')}
              />
            ))
          : undefined
      }
    />
  );
}

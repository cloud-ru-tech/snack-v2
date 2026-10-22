import { AiAttachment, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { useState } from 'react';

export function Clickable() {
  const [opened, setOpened] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiAttachment type={ATTACHMENT_TYPE.File} fileName='contract.docx' onClick={() => setOpened(prev => prev + 1)} />
      <span>Открыто: {opened}</span>
    </div>
  );
}

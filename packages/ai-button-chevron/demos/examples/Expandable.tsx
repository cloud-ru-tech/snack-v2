import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Expandable() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonChevron open={open} onClick={() => setOpen(prev => !prev)} />
      {open && <span>Раскрытый контент</span>}
    </div>
  );
}

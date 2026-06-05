import { AiButtonChevron } from '@ds/ai-button-chevron';
import { useState } from 'react';

export function Expandable() {
  const [opened, setOpened] = useState(true);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonChevron opened={opened} onClick={() => setOpened(prev => !prev)} />
      {opened && <span>Раскрытый контент</span>}
    </div>
  );
}

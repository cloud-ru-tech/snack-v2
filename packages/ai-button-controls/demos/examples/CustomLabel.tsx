import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { useState } from 'react';

export function CustomLabel() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonControls
        direction={DIRECTION.Down}
        aria-label='К последнему сообщению'
        onClick={() => setClicks(prev => prev + 1)}
      />
      <span>Нажатий: {clicks}</span>
    </div>
  );
}

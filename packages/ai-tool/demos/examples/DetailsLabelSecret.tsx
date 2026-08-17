import { AiToolDetailsLabel } from '@ds/ai-tool';
import { useState } from 'react';

export function DetailsLabelSecret() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <AiToolDetailsLabel
        label='Ответ'
        showEyeButton
        secretRevealed={revealed}
        onToggleSecret={() => setRevealed(prev => !prev)}
      />
    </div>
  );
}

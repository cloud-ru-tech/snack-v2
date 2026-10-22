import { AiButtonClose } from '@ds/ai-button-close';
import { Button } from '@ds/button';
import { useState } from 'react';

export function Dismiss() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать снова' onClick={() => setVisible(true)} />;
  }

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span>Блок можно закрыть крестиком</span>
      <AiButtonClose onClick={() => setVisible(false)} />
    </div>
  );
}

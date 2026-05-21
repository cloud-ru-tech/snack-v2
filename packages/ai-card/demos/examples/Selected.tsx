import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Selected() {
  const [checked, setChecked] = useState(true);
  return (
    <AiCard title='Selected card' checked={checked} onChange={setChecked}>
      Card content in selected state
    </AiCard>
  );
}

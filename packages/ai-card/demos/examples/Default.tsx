import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Default() {
  const [checked, setChecked] = useState(false);
  return (
    <AiCard title='Card title' checked={checked} onChange={setChecked}>
      Default content
    </AiCard>
  );
}

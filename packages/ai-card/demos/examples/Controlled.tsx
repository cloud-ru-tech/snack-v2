import { AiCard } from '@ds/ai-card';
import { useState } from 'react';

export function Controlled() {
  const [checked, setChecked] = useState(false);
  return (
    <AiCard title={`Controlled (${checked ? 'on' : 'off'})`} checked={checked} onChange={setChecked}>
      Состояние хранится в родителе.
    </AiCard>
  );
}

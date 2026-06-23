import { ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { useState } from 'react';

export function Controlled() {
  const [plan, setPlan] = useState<string | undefined>('pro');

  return (
    <ToggleGroup value={plan} onChange={(next: string | undefined) => setPlan(next)}>
      <ToggleCard value='start' title='Тариф Start' description={plan === 'start' ? 'Выбран' : '10 ГБ хранилища'} />
      <ToggleCard value='pro' title='Тариф Pro' description={plan === 'pro' ? 'Выбран' : '100 ГБ хранилища'} />
    </ToggleGroup>
  );
}

import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

export function ToggleStates() {
  const [state, setState] = useState<Record<string, boolean>>({
    interactive: true,
    disabled: true,
    loading: false,
  });

  const flip = (key: string) => (checked: boolean) => setState(prev => ({ ...prev, [key]: checked }));

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipToggle label='Активный' size='m' checked={state.interactive} onChange={flip('interactive')} />
      <ChipToggle label='Отключён' size='m' disabled checked={state.disabled} onChange={flip('disabled')} />
      <ChipToggle label='Загрузка' size='m' loading checked={state.loading} onChange={flip('loading')} />
    </div>
  );
}

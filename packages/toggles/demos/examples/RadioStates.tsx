import { Radio } from '@ds/toggles';

export function RadioStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Radio />
      <Radio defaultChecked />
      <Radio disabled />
      <Radio disabled defaultChecked />
      <Radio loading />
    </div>
  );
}

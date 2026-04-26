import { Checkbox } from '@ds/toggles';

export function CheckboxStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
      <Checkbox loading />
    </div>
  );
}

import { Switch } from '@ds/toggles';

export function SwitchStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
      <Switch loading />
    </div>
  );
}

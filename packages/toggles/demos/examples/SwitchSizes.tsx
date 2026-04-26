import { Switch } from '@ds/toggles';

export function SwitchSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Switch size='xs' defaultChecked />
      <Switch size='s' defaultChecked />
    </div>
  );
}

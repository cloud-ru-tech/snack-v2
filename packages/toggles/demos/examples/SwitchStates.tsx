import { Switch } from '@ds/toggles';

export function SwitchStates() {
  return (
    <>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
      <Switch loading />
    </>
  );
}

import { Checkbox } from '@ds/toggles';

export function CheckboxStates() {
  return (
    <>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
      <Checkbox loading />
    </>
  );
}

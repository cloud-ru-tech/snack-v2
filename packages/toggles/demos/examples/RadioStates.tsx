import { Radio } from '@ds/toggles';

export function RadioStates() {
  return (
    <>
      <Radio />
      <Radio defaultChecked />
      <Radio disabled />
      <Radio disabled defaultChecked />
      <Radio loading />
    </>
  );
}

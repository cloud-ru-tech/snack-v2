import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

export function ToggleBasic() {
  const [checked, setChecked] = useState(false);

  return <ChipToggle label='React' size='m' checked={checked} onChange={setChecked} />;
}

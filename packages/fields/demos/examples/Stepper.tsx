import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function Stepper() {
  const [value, setValue] = useState(1);
  return <FieldStepper label='Количество' value={value} onChange={setValue} />;
}

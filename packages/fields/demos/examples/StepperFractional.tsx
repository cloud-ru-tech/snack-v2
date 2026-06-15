import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function StepperFractional() {
  const [value, setValue] = useState(1.5);
  return <FieldStepper label='Вес' postfix='кг' step={0.5} min={0} max={20} value={value} onChange={setValue} />;
}

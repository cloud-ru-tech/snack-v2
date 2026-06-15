import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function StepperLimits() {
  const [value, setValue] = useState(0);
  return (
    <FieldStepper
      label='Возраст'
      hint='От 0 до 120'
      min={0}
      max={120}
      allowMoreThanLimits={false}
      value={value}
      onChange={setValue}
    />
  );
}

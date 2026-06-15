import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function StepperWithPostfix() {
  const [value, setValue] = useState(12);
  return <FieldStepper label='Количество' postfix='шт' value={value} onChange={setValue} />;
}

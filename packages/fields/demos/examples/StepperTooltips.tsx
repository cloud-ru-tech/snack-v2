import { FieldStepper } from '@ds/fields';
import { useState } from 'react';

export function StepperTooltips() {
  const [value, setValue] = useState(3);
  return (
    <FieldStepper
      label='Количество'
      hint='Наведите на кнопки −/+; превышение границ показывает тултип на blur'
      min={0}
      max={10}
      allowMoreThanLimits={false}
      value={value}
      onChange={setValue}
      minusButtonTooltip={{ tip: 'Уменьшить' }}
      plusButtonTooltip={{ tip: 'Увеличить' }}
      clampTooltipText={{
        min: limit => `Не меньше ${limit}`,
        max: limit => `Не больше ${limit}`,
      }}
    />
  );
}

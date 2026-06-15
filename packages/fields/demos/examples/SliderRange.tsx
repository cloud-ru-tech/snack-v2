import { FieldSlider } from '@ds/fields';
import { useState } from 'react';

export function SliderRange() {
  const [value, setValue] = useState<number[]>([20, 80]);
  return (
    <FieldSlider
      label='Диапазон цены'
      hint='₽/мес. Текстовое поле в range-режиме только для чтения'
      range
      min={0}
      max={100}
      step={1}
      postfix='₽'
      value={value}
      onChange={v => setValue(v as number[])}
    />
  );
}

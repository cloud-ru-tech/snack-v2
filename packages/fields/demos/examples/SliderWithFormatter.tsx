import { FieldSlider } from '@ds/fields';
import { useState } from 'react';

export function SliderWithFormatter() {
  const [value, setValue] = useState(75);
  return (
    <FieldSlider
      label='Громкость'
      min={0}
      max={100}
      step={5}
      postfix='%'
      textInputFormatter={v => `${v} %`}
      value={value}
      onChange={v => setValue(v as number)}
    />
  );
}

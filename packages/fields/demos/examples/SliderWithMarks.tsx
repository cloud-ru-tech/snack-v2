import { FieldSlider } from '@ds/fields';
import { useState } from 'react';

export function SliderWithMarks() {
  const [value, setValue] = useState(25);
  return (
    <FieldSlider
      label='Качество сжатия'
      hint='Снэпит к ближайшей метке'
      min={0}
      max={100}
      step={null}
      marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
      value={value}
      onChange={v => setValue(v as number)}
    />
  );
}

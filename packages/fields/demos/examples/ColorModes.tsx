import { FieldColor } from '@ds/fields';
import { useState } from 'react';

export function ColorModes() {
  const [value, setValue] = useState('#4caf50');
  return (
    <FieldColor
      label='Только HEX и RGB'
      hint='availableModes ограничивает переключатель моделей в палитре'
      availableModes={['hex', 'rgb']}
      autoApply
      value={value}
      onChange={setValue}
    />
  );
}

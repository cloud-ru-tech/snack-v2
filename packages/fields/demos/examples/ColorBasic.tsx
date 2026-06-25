import { FieldColor } from '@ds/fields';
import { useState } from 'react';

export function ColorBasic() {
  const [value, setValue] = useState('#1976d2');
  return (
    <FieldColor
      label='Цвет акцента'
      hint='Откройте палитру шевроном или кликом по полю'
      value={value}
      onChange={setValue}
    />
  );
}

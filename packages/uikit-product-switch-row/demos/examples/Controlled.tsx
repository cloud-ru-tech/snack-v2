import { SwitchRow } from '@ds/uikit-product-switch-row';
import { useState } from 'react';

export function Controlled() {
  const [checked, setChecked] = useState(false);

  return (
    <SwitchRow
      title='Контролируемый переключатель'
      description={checked ? 'Включено' : 'Выключено'}
      checked={checked}
      onChange={setChecked}
    />
  );
}

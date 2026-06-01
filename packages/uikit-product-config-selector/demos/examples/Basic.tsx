import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Basic() {
  const [checked, setChecked] = useState(false);

  return <ConfigSelector label='Авторазвёртывание' checked={checked} onChange={setChecked} />;
}

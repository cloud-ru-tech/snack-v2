import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldMaskControlled() {
  const [value, setValue] = useState('');

  return (
    <FieldMask
      label='Код'
      mask={MASK.Code}
      value={value}
      onChange={next => setValue(next)}
      caption={`value: ${value || '—'}`}
    />
  );
}

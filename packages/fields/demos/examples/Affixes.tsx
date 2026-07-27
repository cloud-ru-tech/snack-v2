import { FieldCombo } from '@ds/fields';
import { useState } from 'react';

export function Affixes() {
  const [value, setValue] = useState('100');
  return <FieldCombo label='Сумма' prefix='$' postfix='USD' value={value} onChange={setValue} />;
}

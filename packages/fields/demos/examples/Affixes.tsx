import { FieldText } from '@ds/fields';
import { useState } from 'react';

export function Affixes() {
  const [value, setValue] = useState('100');
  return <FieldText label='Сумма' prefix='$' postfix='USD' value={value} onChange={setValue} />;
}

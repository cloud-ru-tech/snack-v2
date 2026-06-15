import { FieldText } from '@ds/fields';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  return <FieldText label='Имя' hint='Как к вам обращаться' placeholder='Иван' value={value} onChange={setValue} />;
}

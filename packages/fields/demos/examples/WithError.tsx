import { FieldText } from '@ds/fields';
import { useState } from 'react';

export function WithError() {
  const [value, setValue] = useState('abc');
  return (
    <FieldText
      label='Email'
      required
      placeholder='user@example.com'
      error={value.includes('@') ? '' : 'Введите корректный email'}
      showHintIcon
      value={value}
      onChange={setValue}
    />
  );
}

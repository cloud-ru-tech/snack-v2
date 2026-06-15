import { FieldSecure } from '@ds/fields';
import { useState } from 'react';

export function Secure() {
  const [value, setValue] = useState('');
  return (
    <FieldSecure
      label='Пароль'
      required
      placeholder='Минимум 8 символов'
      hint='Не передавайте пароль третьим лицам'
      showHintIcon
      value={value}
      onChange={setValue}
    />
  );
}

import { FieldSecure } from '@ds/fields';
import { useState } from 'react';

export function SecureControlledVisibility() {
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(true);
  return (
    <FieldSecure
      label='Пароль'
      hint={hidden ? 'Значение скрыто' : 'Значение видно'}
      value={value}
      onChange={setValue}
      hidden={hidden}
      onHiddenChange={setHidden}
    />
  );
}

import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldCodeBasic() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <FieldCode codeLength={6} label='Код подтверждения' value={value} onChange={setValue} onComplete={setCompleted} />
      <span>{completed ? `Код введён: ${completed}` : 'Введите 6 цифр'}</span>
    </div>
  );
}

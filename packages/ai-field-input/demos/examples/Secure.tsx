import { AiFieldInput, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

export function Secure() {
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [saved, setSaved] = useState(false);

  return (
    <AiFieldInput
      secure
      value={value}
      onChange={setValue}
      onSubmit={() => {
        setSaved(true);
        setValue([]);
      }}
      placeholder='Вставьте API-ключ'
      disclaimer={saved ? 'Ключ отправлен' : undefined}
    />
  );
}

import { AiFieldInput, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [lastSent, setLastSent] = useState('');

  return (
    <AiFieldInput
      value={value}
      onChange={setValue}
      onSubmit={current => {
        setLastSent(current.map(segment => (segment.type === 'text' ? segment.text : '')).join(''));
        setValue([]);
      }}
      placeholder='Спросите что-нибудь'
      disclaimer={lastSent ? `Отправлено: ${lastSent}` : undefined}
    />
  );
}

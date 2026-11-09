import { AiFieldInput, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

const MAX_LENGTH = 40;

function getLength(value: AiFieldInputValue) {
  return value.reduce((sum, segment) => sum + ('text' in segment ? segment.text.length : 0), 0);
}

export function ErrorState() {
  const [value, setValue] = useState<AiFieldInputValue>([
    { type: 'text', text: 'Сообщение длиннее допустимого лимита символов' },
  ]);
  const length = getLength(value);
  const tooLong = length > MAX_LENGTH;

  return (
    <AiFieldInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue([])}
      error={tooLong ? 'Сообщение слишком длинное' : undefined}
      length={{ current: length, max: MAX_LENGTH }}
      send={tooLong ? { state: 'disabled' } : undefined}
    />
  );
}

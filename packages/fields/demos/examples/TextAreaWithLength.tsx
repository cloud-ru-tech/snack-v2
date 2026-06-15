import { FieldTextArea } from '@ds/fields';
import { useState } from 'react';

export function TextAreaWithLength() {
  const [value, setValue] = useState('');
  return (
    <FieldTextArea label='Bio' hint='Кратко о себе' maxLength={120} minRows={3} value={value} onChange={setValue} />
  );
}

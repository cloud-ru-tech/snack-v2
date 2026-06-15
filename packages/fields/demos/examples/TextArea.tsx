import { FieldTextArea } from '@ds/fields';
import { useState } from 'react';

export function TextArea() {
  const [value, setValue] = useState('');
  return (
    <FieldTextArea
      label='Комментарий'
      placeholder='Расскажите подробнее'
      hint='До 500 символов'
      minRows={3}
      maxRows={8}
      value={value}
      onChange={setValue}
    />
  );
}

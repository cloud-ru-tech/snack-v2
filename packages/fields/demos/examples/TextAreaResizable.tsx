import { FieldTextArea } from '@ds/fields';
import { useState } from 'react';

export function TextAreaResizable() {
  const [value, setValue] = useState('Потяните за нижний правый угол.');
  return (
    <FieldTextArea
      label='Описание'
      hint='Можно изменить высоту мышью'
      minRows={3}
      maxRows={20}
      resizable
      value={value}
      onChange={setValue}
    />
  );
}

import { FieldCombo } from '@ds/fields';
import { QuestionSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

export function IconAfter() {
  const [value, setValue] = useState('user@example.com');
  return (
    <FieldCombo
      label='Email'
      placeholder='user@example.com'
      iconAfter={<QuestionSVG />}
      value={value}
      onChange={setValue}
    />
  );
}

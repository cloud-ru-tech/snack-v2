import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLength() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator
      label='Bio'
      caption='Опционально'
      hint='Кратко расскажите о себе'
      length={{ current: value.length, max: 120 }}
    >
      <InputPrivate value={value} onChange={setValue} maxLength={120} placeholder='Hi there' />
    </FieldDecorator>
  );
}

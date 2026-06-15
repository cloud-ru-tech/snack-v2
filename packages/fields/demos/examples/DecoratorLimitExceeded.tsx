import { FieldDecorator } from '@ds/fields';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLimitExceeded() {
  const [value, setValue] = useState('Слишком длинное значение, которое превышает лимит');
  return (
    <FieldDecorator
      label='Заголовок'
      hint='Счётчик подсвечивается, когда current превышает max'
      length={{ current: value.length, max: 20 }}
    >
      <InputPrivate value={value} onChange={setValue} placeholder='Введите текст' />
    </FieldDecorator>
  );
}

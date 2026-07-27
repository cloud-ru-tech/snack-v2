import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorLabelTooltip() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator
      label='Идентификатор'
      required
      labelTooltip={{ tip: 'Уникальный идентификатор ресурса. Наведите на иконку рядом с заголовком.' }}
      hint='Подсказка к заголовку выводится через иконку вопроса'
    >
      <InputPrivate value={value} onChange={setValue} placeholder='res-id' />
    </FieldDecorator>
  );
}

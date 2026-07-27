import { FieldDecorator } from '@ds/field-decorator';
import { InputPrivate } from '@ds/input-private';
import { useState } from 'react';

export function DecoratorBasic() {
  const [value, setValue] = useState('');
  return (
    <FieldDecorator label='Custom field' hint='FieldDecorator оборачивает любой input' showHintIcon>
      <InputPrivate value={value} onChange={setValue} placeholder='Type here' />
    </FieldDecorator>
  );
}

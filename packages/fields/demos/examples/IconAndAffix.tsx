import { FieldText } from '@ds/fields';
import { WebIcons } from '@ds/icons';
import { useState } from 'react';

export function IconAndAffix() {
  const [value, setValue] = useState('1234');
  return (
    <FieldText
      label='Сумма пополнения'
      iconBefore={<WebIcons.BankCardSVG />}
      prefix='₽'
      postfix='/мес'
      value={value}
      onChange={setValue}
    />
  );
}

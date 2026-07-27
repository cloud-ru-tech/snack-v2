import { FieldCombo } from '@ds/fields';
import { BankCardSVG } from '@ds/icons/interface/web';
import { useState } from 'react';

export function IconAndAffix() {
  const [value, setValue] = useState('1234');
  return (
    <FieldCombo
      label='Сумма пополнения'
      iconBefore={<BankCardSVG />}
      prefix='₽'
      postfix='/мес'
      value={value}
      onChange={setValue}
    />
  );
}

import { FieldText } from '@ds/fields';
import { useState } from 'react';

const CURRENCIES = [
  { id: 'USD', content: { option: 'USD — доллар' } },
  { id: 'EUR', content: { option: 'EUR — евро' } },
  { id: 'RUB', content: { option: 'RUB — рубль' } },
];

export function ElementAfter() {
  const [value, setValue] = useState('100');
  const [currency, setCurrency] = useState<string | number | undefined>('USD');
  return (
    <FieldText
      label='Валюта'
      placeholder='Сумма'
      postfix={currency}
      elementAfter={{
        action: currency,
        droplist: {
          items: CURRENCIES,
          closeDroplistOnItemClick: true,
          selection: {
            mode: 'single',
            value: currency,
            onChange: setCurrency,
          },
        },
      }}
      value={value}
      onChange={setValue}
    />
  );
}

import { FieldSecure } from '@ds/fields';
import { useState } from 'react';

const fakeFetch = (): Promise<string> =>
  new Promise(resolve => setTimeout(() => resolve('sk-FETCHED-TOKEN-FROM-SERVER'), 800));

export function SecureAsync() {
  const [value, setValue] = useState('');
  return (
    <FieldSecure
      label='API Token'
      readonly
      hint='Значение подгружается при клике «глаз» или «копировать»'
      asyncValueGetter={fakeFetch}
      value={value}
      onChange={setValue}
    />
  );
}

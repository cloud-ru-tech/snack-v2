import { FieldText } from '@ds/fields';
import { SearchSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

export function IconBefore() {
  const [value, setValue] = useState('');
  return (
    <FieldText label='Поиск' placeholder='Найти статью' iconBefore={<SearchSVG />} value={value} onChange={setValue} />
  );
}

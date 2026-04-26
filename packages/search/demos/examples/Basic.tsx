import { Search } from '@ds/search';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  return <Search placeholder='Поиск' value={value} onChange={setValue} />;
}

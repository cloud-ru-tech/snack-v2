import { Search, SearchProps } from '@ds/search';
import { useState } from 'react';

import searchDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

/**
 * Search — controlled-компонент. Без локального state value никогда не меняется
 * и набор в превью не работает. Оборачиваем в state-адаптер.
 */
function SearchAdapter(props: SearchProps) {
  const [value, setValue] = useState('');
  return <Search {...props} value={value} onChange={setValue} />;
}

export function SearchDemo() {
  return (
    <Canvas
      component={SearchAdapter}
      componentName='Search'
      componentDoc={searchDoc.Search}
      defaultProps={{
        size: 's',
        placeholder: 'Поиск',
        background: true,
        outline: true,
        disabled: false,
        loading: false,
      }}
      controls={{
        size: { type: 'select', options: ['s', 'm', 'l'] },
        placeholder: { type: 'text' },
        background: { type: 'boolean' },
        outline: { type: 'boolean' },
        disabled: { type: 'boolean' },
        loading: { type: 'boolean' },
      }}
      excludeProps={['buttonField', 'className', 'value', 'onChange', 'onSubmit', 'onFocus', 'onBlur']}
    />
  );
}

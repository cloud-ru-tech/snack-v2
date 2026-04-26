import { Search } from '@ds/search';

import searchDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function SearchDemo() {
  return (
    <Canvas
      component={Search}
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

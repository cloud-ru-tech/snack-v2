import { Canvas } from '#docs/components/Canvas';

import componentDoc from '../docs/props.json';
import { Basic } from './examples/Basic';

const items = [
  { id: 'month', content: { option: 'Month' }, onClick: () => undefined },
  { id: 'year', content: { option: 'Year' }, onClick: () => undefined },
];

export function ButtonDropdownDemo() {
  return (
    <Canvas
      component={Basic}
      componentName='ButtonDropdown'
      componentDoc={componentDoc.ButtonDropdown}
      defaultProps={{
        label: 'Period',
        size: 's',
        appearance: 'neutral',
        closeDroplistOnItemClick: true,
        items,
      }}
      controls={{
        label: { type: 'text' },
        size: { type: 'select', options: ['xs', 's', 'm', 'l'] },
        closeDroplistOnItemClick: { type: 'boolean' },
      }}
      excludeProps={['items', 'className', 'open', 'onOpenChange']}
    />
  );
}

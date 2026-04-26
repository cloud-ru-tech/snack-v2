import { Checkbox } from '@ds/toggles';

import toggleDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function CheckboxDemo() {
  return (
    <Canvas
      component={Checkbox}
      componentName='Checkbox'
      componentDoc={toggleDoc.Checkbox}
      defaultProps={{
        size: 'xs',
        disabled: false,
        loading: false,
        indeterminate: false,
      }}
      controls={{
        size: { type: 'select', options: ['xs', 's'] },
        disabled: { type: 'boolean' },
        loading: { type: 'boolean' },
        indeterminate: { type: 'boolean' },
      }}
      excludeProps={['inputRef', 'render', 'mode', 'className', 'onChange', 'onClick', 'onBlur', 'onFocus', 'onKeyUp']}
    />
  );
}

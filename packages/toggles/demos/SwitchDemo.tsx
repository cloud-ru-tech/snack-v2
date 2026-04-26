import { Switch } from '@ds/toggles';

import toggleDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function SwitchDemo() {
  return (
    <Canvas
      component={Switch}
      componentName='Switch'
      componentDoc={toggleDoc.Switch}
      defaultProps={{
        size: 'xs',
        disabled: false,
        loading: false,
      }}
      controls={{
        size: { type: 'select', options: ['xs', 's'] },
        disabled: { type: 'boolean' },
        loading: { type: 'boolean' },
      }}
      excludeProps={['inputRef', 'render', 'mode', 'className', 'onChange', 'onClick', 'onBlur', 'onFocus', 'onKeyUp']}
    />
  );
}

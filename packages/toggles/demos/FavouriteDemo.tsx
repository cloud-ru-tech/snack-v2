import { Favourite } from '@ds/toggles';

import toggleDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function FavouriteDemo() {
  return (
    <Canvas
      component={Favourite}
      componentName='Favourite'
      componentDoc={toggleDoc.Favourite}
      defaultProps={{
        size: 'xs',
        icon: 'star',
        disabled: false,
        loading: false,
      }}
      controls={{
        size: { type: 'select', options: ['xs', 's'] },
        icon: { type: 'select', options: ['star', 'heart'] },
        disabled: { type: 'boolean' },
        loading: { type: 'boolean' },
      }}
      excludeProps={['inputRef', 'render', 'mode', 'className', 'onChange', 'onClick', 'onBlur', 'onFocus', 'onKeyUp']}
    />
  );
}

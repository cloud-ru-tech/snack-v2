import { Kbd, KBD_KEY_NAME, KBD_PLATFORM } from '@ds/uikit-product-kbd';

import { Canvas } from '#docs/components/Canvas';

import componentDoc from '../docs/props.json';

export function KbdDemo() {
  return (
    <Canvas
      component={Kbd}
      componentName='Kbd'
      componentDoc={componentDoc.Kbd}
      defaultProps={{
        children: 'K',
      }}
      controls={{
        children: { type: 'text' },
        keyName: { type: 'select', options: Object.values(KBD_KEY_NAME) },
        platform: { type: 'select', options: Object.values(KBD_PLATFORM) },
        'aria-label': { type: 'text' },
      }}
      excludeProps={['className', 'innerRef', 'data-test-id']}
    />
  );
}

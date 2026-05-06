import { CopyButton } from '@ds/uikit-product-copy';

import { Canvas } from '#docs/components/Canvas';

import componentDoc from '../docs/props.json';

export function CopyButtonDemo() {
  return (
    <Canvas
      component={CopyButton}
      componentName='CopyButton'
      componentDoc={componentDoc.CopyButton}
      defaultProps={{
        valueToCopy: 'example-value',
        size: 's',
      }}
      controls={{
        valueToCopy: { type: 'text' },
        size: { type: 'select', options: ['s', 'm', 'l'] },
      }}
      excludeProps={['onClick', 'className', 'data-test-id']}
    />
  );
}

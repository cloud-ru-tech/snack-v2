import { CopyLine } from '@ds/uikit-product-copy';

import { Canvas } from '#docs/components/Canvas';

import componentDoc from '../docs/props.json';

export function CopyLineDemo() {
  return (
    <Canvas
      component={CopyLine}
      componentName='CopyLine'
      componentDoc={componentDoc.CopyLine}
      defaultProps={{
        content: 'example-copy-value-12345',
        valueToCopy: 'example-value',
        copyButtonHideStrategy: 'hover',
      }}
      controls={{
        content: { type: 'text' },
        valueToCopy: { type: 'text' },
        copyButtonHideStrategy: { type: 'select', options: ['hover', 'never'] },
      }}
      excludeProps={['onClick', 'className', 'data-test-id']}
    />
  );
}

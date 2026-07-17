import { PlaceholderSVG } from '@ds/icons/interface/system';
import { EmptyBlock } from '@ds/uikit-product-layout';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function EmptyBlockDemo() {
  return (
    <Canvas
      component={EmptyBlock}
      componentDoc={doc.EmptyBlock}
      defaultProps={{
        title: 'Title text',
        description: 'Body text',
        icon: { icon: PlaceholderSVG },
        'data-test-id': 'empty-block-demo',
      }}
      controls={{
        title: { type: 'text' },
        description: { type: 'text' },
      }}
    />
  );
}

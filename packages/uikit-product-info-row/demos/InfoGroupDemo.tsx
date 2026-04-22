import { InfoGroup } from '@ds/uikit-product-info-row';

import doc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type Row = { title: string; value: number };

const data: Row = { title: 'Example', value: 42 };

export function InfoGroupDemo() {
  return (
    <Canvas
      component={InfoGroup}
      componentDoc={doc.InfoGroup}
      defaultProps={{
        data,
        columns: 'single',
        width: 'fixed',
        'data-test-id': 'info-group-demo',
        items: [
          { label: 'Title', accessorKey: 'title' },
          { label: 'Value', accessorKey: 'value' },
        ],
      }}
      controls={{
        loading: { type: 'boolean' },
        columns: { type: 'select', options: ['single', 'double'] },
        width: { type: 'select', options: ['fixed', 'full'] },
      }}
    />
  );
}

import { PlaceholderSVG } from '@ds/icons';
import { InfoRow } from '@ds/uikit-product-info-row';

import doc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function InfoRowDemo() {
  return (
    <Canvas
      component={InfoRow}
      componentDoc={doc.InfoRow}
      defaultProps={{
        label: 'Label',
        secondaryLabel: 'Label 2',
        content: 'Content',
        secondaryContent: 'Column 2',
        column: '1',
        maxWidth: false,
        'data-test-id': 'info-row-demo',
        rowActions: {
          first: {
            icon: <PlaceholderSVG />,
            'aria-label': 'Действие',
            'data-test-id': 'info-row-demo-action-1',
          },
        },
        secondaryRowActions: {
          first: {
            icon: <PlaceholderSVG />,
            'aria-label': 'Действие',
            'data-test-id': 'info-row-demo-secondary-action-1',
          },
        },
      }}
      controls={{
        label: { type: 'text' },
        secondaryLabel: { type: 'text' },
        content: { type: 'text' },
        secondaryContent: { type: 'text' },
        column: { type: 'select', options: ['1', '2'] },
        maxWidth: { type: 'boolean' },
        loading: { type: 'boolean' },
        topDivider: { type: 'boolean' },
        bottomDivider: { type: 'boolean' },
        width: { type: 'select', options: ['fixed', 'full'] },
      }}
    />
  );
}

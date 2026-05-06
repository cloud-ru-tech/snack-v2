import { InfoRow } from '@ds/uikit-product-info-row';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function InfoRowDemo() {
  return (
    <Canvas
      component={InfoRow}
      componentDoc={doc.InfoRow}
      defaultProps={{
        label: 'Очень длинный заголовок первого поля, который должен обрезаться по настройке truncate',
        secondaryLabel: 'Очень длинный заголовок второго поля, который тоже должен обрезаться',
        content: 'Content',
        secondaryContent: 'Column 2',
        labelTruncate: 1,
        secondaryLabelTruncate: 1,
        column: '1',
        maxWidth: false,
        'data-test-id': 'info-row-demo',
      }}
      controls={{
        label: { type: 'text' },
        secondaryLabel: { type: 'text' },
        content: { type: 'text' },
        secondaryContent: { type: 'text' },
        labelTruncate: { type: 'number' },
        secondaryLabelTruncate: { type: 'number' },
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

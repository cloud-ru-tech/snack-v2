import { PROGRESS_BAR_SIZE } from '@ds/progress-bar';
import { LoadStatus } from '@ds/uikit-product-load-status';

import { Canvas } from '#docs/components/Canvas';

import loadStatusDoc from '../docs/props.json';

export function LoadStatusDemo() {
  return (
    <Canvas
      component={LoadStatus}
      componentDoc={loadStatusDoc.LoadStatus}
      defaultProps={{
        label: 'Label',
        value: 'Value',
        hint: 'Hint',
        progress: 60,
        size: PROGRESS_BAR_SIZE.S,
        valueType: 'none',
        showError: false,
        showErrorIcon: false,
      }}
      controls={{
        label: { type: 'text' },
        value: { type: 'text' },
        hint: { type: 'text' },
        progress: { type: 'number' },
        size: { type: 'select', options: [PROGRESS_BAR_SIZE.S, PROGRESS_BAR_SIZE.XS] },
        valueType: { type: 'select', options: ['none', 'percent'] },
        showError: { type: 'boolean' },
        showErrorIcon: { type: 'boolean' },
      }}
      excludeProps={['className', 'appearanceByProgress']}
    />
  );
}

import { Alert } from '@ds/alert';

import { Canvas } from '#docs/components/Canvas';

import alertDoc from '../docs/props.json';

export function AlertDemo() {
  return (
    <Canvas
      component={Alert}
      componentName='Alert'
      componentDoc={alertDoc.Alert}
      defaultProps={{
        title: 'Alert title',
        content: 'Alert description text',
        appearance: 'neutral',
        size: 'm',
        align: 'horizontal',
        icon: true,
        outline: false,
        collapsible: false,
      }}
      controls={{
        title: { type: 'text' },
        content: { type: 'text' },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'info', 'success', 'warning', 'error'],
        },
        size: { type: 'select', options: ['s', 'm'] },
        align: { type: 'select', options: ['horizontal', 'vertical'] },
        icon: { type: 'boolean' },
        outline: { type: 'boolean' },
        collapsible: { type: 'boolean' },
      }}
      excludeProps={['actions', 'onClose', 'truncate', 'className']}
    />
  );
}

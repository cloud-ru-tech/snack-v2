import { Widget } from '@ds/uikit-product-widget';
import { useState } from 'react';

export function ErrorState() {
  const [state, setState] = useState<'default' | 'error'>('error');

  return (
    <Widget
      header={{ title: 'Monitoring', href: '#' }}
      state={state}
      errorState={{
        errorTitle: 'Metrics are unavailable',
        errorDescription: 'Try reloading the widget.',
        updateButtonLabel: 'Reload',
        onClickUpdate: () => setState('default'),
      }}
    >
      {state === 'error' ? 'Metrics' : 'Metrics loaded successfully.'}
    </Widget>
  );
}

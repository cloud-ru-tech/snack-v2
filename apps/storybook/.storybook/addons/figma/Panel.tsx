import './panel.css';

import { useState } from 'react';
import { useChannel } from 'storybook/manager-api';

import { EVENT_SET, type FigmaPayload } from './constants';

export function FigmaPanel() {
  const [payload, setPayload] = useState<FigmaPayload>(null);

  useChannel({
    [EVENT_SET]: (next: FigmaPayload) => setPayload(next),
  });

  if (!payload) {
    return (
      <div className='ds-figma-empty'>
        Figma-узел для этого пакета не задан. Добавь ключ в <code>FIGMA_NODES</code> в{' '}
        <code>apps/docs/src/lib/figma.ts</code> (используется через <code>figmaNode(pkg, sub?)</code>) либо проставь{' '}
        <code>parameters.design</code> в story.
      </div>
    );
  }

  return (
    <div className='ds-figma-root'>
      <iframe className='ds-figma-iframe' src={payload.url} allowFullScreen title='Figma' />
    </div>
  );
}

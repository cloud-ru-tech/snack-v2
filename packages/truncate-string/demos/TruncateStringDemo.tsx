import { TruncateString } from '@ds/truncate-string';

import truncateStringDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function TruncateStringDemo() {
  return (
    <Canvas
      component={TruncateString}
      componentName='TruncateString'
      componentDoc={truncateStringDoc.TruncateString}
      defaultProps={{
        text: 'Очень длинный текст, который не помещается в контейнер',
        variant: 'end',
        maxLines: 1,
        hideTooltip: false,
      }}
      controls={{
        text: { type: 'text' },
        variant: { type: 'select', options: ['end', 'middle'] },
        maxLines: { type: 'number' },
        hideTooltip: { type: 'boolean' },
      }}
      excludeProps={['placement', 'trigger', 'className']}
    />
  );
}

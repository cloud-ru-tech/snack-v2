import { AiCodeDiff, SIZE } from '@ds/ai-code-diff';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function AiCodeDiffDemo() {
  return (
    <Canvas
      component={AiCodeDiff}
      componentDoc={doc.AiCodeDiff}
      defaultProps={{ added: 83, removed: 26, separator: '/', size: SIZE.M }}
      controls={{
        added: { type: 'number' },
        removed: { type: 'number' },
        separator: { type: 'text' },
        size: { type: 'select', options: Object.values(SIZE) },
      }}
    />
  );
}

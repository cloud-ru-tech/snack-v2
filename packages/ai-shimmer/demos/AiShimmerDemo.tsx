import { AiShimmer, AiShimmerProps, DEFAULT_SIZE, DEFAULT_VARIANT, DEFAULT_WEIGHT } from '@ds/ai-shimmer';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

function AiShimmerCanvas(props: AiShimmerProps) {
  return <AiShimmer {...props} />;
}

export function AiShimmerDemo() {
  return (
    <Canvas
      component={AiShimmerCanvas}
      componentDoc={doc.AiShimmer}
      defaultProps={{
        text: 'Officia cillum labore enim eiusmod exercitation ullamco occaecat utminim consequat labore occaecat est.',
        variant: DEFAULT_VARIANT,
        size: DEFAULT_SIZE,
        weight: DEFAULT_WEIGHT,
      }}
      controls={{
        text: { type: 'text' },
        variant: { type: 'select', options: ['display', 'headline', 'title', 'label', 'body'] },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        weight: { type: 'select', options: ['regular', 'thin', 'mono'] },
      }}
      excludeProps={['className']}
    />
  );
}

import { Typography } from '@ds/typography';

import typographyDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function TypographyDemo() {
  return (
    <Canvas
      component={Typography}
      componentDoc={typographyDoc.Typography}
      defaultProps={{
        children: 'The quick brown fox jumps over the lazy dog',
        variant: 'body',
        size: 'm',
        weight: 'regular',
      }}
      controls={{
        children: { type: 'text' },
        variant: { type: 'select', options: ['display', 'headline', 'title', 'label', 'body'] },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        weight: { type: 'select', options: ['regular', 'thin', 'mono'] },
      }}
      excludeProps={['as', 'className']}
    />
  );
}

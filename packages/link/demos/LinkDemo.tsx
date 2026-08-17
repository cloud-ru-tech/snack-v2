import { Link } from '@ds/link';

import { Canvas } from '#docs/components/Canvas';

import linkDoc from '../docs/props.json';

export function LinkDemo() {
  return (
    <Canvas
      component={Link}
      componentName='Link'
      componentDoc={linkDoc.Link}
      defaultProps={{
        label: 'Link text',
        appearance: 'primary',
        roleAppearance: 'regular',
        insideText: false,
        underlined: false,
        href: 'https://example.com',
      }}
      controls={{
        label: { type: 'text' },
        appearance: {
          type: 'select',
          options: [
            'primary',
            'neutral',
            'invertNeutral',
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'violet',
            'pink',
          ],
        },
        roleAppearance: { type: 'select', options: ['regular', 'onAccent'] },
        insideText: { type: 'boolean' },
        underlined: { type: 'boolean' },
      }}
      excludeProps={['as', 'truncateVariant', 'className', 'children']}
    />
  );
}

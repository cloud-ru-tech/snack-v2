import { Accordion } from '@ds/accordion';

import accordionDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function CollapseBlockDemo() {
  return (
    <Canvas
      component={Accordion.CollapseBlockPrimary}
      componentName='CollapseBlockPrimary'
      componentDoc={accordionDoc.CollapseBlockPrimary}
      defaultProps={{
        id: 'demo',
        title: 'Раздел',
        subTitle: 'Короткое описание',
        view: 'simple',
        appearance: 'neutral',
        chevron: 'after',
        keepMounted: false,
        children: 'Контент раздела — любой React-узел.',
      }}
      controls={{
        title: { type: 'text' },
        subTitle: { type: 'text' },
        view: { type: 'select', options: ['simple', 'outline', 'elevated'] },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'red', 'yellow', 'green', 'blue'],
        },
        chevron: { type: 'select', options: ['before', 'after'] },
        keepMounted: { type: 'boolean' },
      }}
      excludeProps={['id', 'afterTitle', 'className', 'children', 'component']}
    />
  );
}

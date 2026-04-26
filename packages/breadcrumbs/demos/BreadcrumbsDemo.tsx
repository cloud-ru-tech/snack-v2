import { Breadcrumbs } from '@ds/breadcrumbs';

import breadcrumbsDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

const items = [
  { id: '1', label: 'Home', href: '#' },
  { id: '2', label: 'Section', href: '#' },
  { id: '3', label: 'Current page' },
];

export function BreadcrumbsDemo() {
  return (
    <Canvas
      component={Breadcrumbs}
      componentName='Breadcrumbs'
      componentDoc={breadcrumbsDoc.Breadcrumbs}
      defaultProps={{
        items,
        size: 's',
        separator: '›',
        firstItemIconOnly: false,
        inactiveLastItem: false,
      }}
      controls={{
        size: { type: 'select', options: ['xs', 's'] },
        separator: { type: 'text' },
        firstItemIconOnly: { type: 'boolean' },
        inactiveLastItem: { type: 'boolean' },
      }}
      excludeProps={['items', 'className']}
    />
  );
}

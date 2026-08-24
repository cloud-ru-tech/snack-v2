import { HeaderLayout } from '@ds/uikit-product-header';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
import { Breadcrumbs, Logo, Menu, ProjectSelect, Toolbar } from '../stories/PlugElement';

export function HeaderLayoutDemo() {
  return (
    <Canvas
      component={HeaderLayout}
      componentDoc={doc.HeaderLayout}
      defaultProps={{
        menu: <Menu />,
        logo: <Logo />,
        select: <ProjectSelect />,
        breadcrumbs: <Breadcrumbs />,
        toolbar: <Toolbar />,
        'data-test-id': 'header-layout-demo',
      }}
    />
  );
}

import { Popover } from '@ds/popover';

import popoverDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function PopoverDemo() {
  return (
    <Canvas
      component={Popover}
      componentName='Popover'
      componentDoc={popoverDoc.Popover}
      defaultProps={{
        placement: 'top',
        trigger: 'click',
        content: 'Popover content',
        children: <button type='button'>Open popover</button>,
      }}
      controls={{
        placement: {
          type: 'select',
          options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
        },
        trigger: { type: 'radio', options: ['click', 'hover'] },
        content: { type: 'text' },
      }}
      excludeProps={['className', 'triggerClassName', 'children']}
    />
  );
}

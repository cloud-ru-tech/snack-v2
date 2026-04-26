import { Button } from '@ds/button';
import { Dropdown, DropdownProps } from '@ds/dropdown';

import dropdownDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type PreviewProps = Pick<DropdownProps, 'trigger' | 'placement' | 'open'>;

function DropdownPreview(props: PreviewProps) {
  return (
    <Dropdown {...props} content={<div style={{ padding: 12, minWidth: 200 }}>Содержимое выпадающего блока</div>}>
      <Button label='Открыть' />
    </Dropdown>
  );
}

export function DropdownDemo() {
  return (
    <Canvas
      component={DropdownPreview}
      componentName='Dropdown'
      componentDoc={dropdownDoc.Dropdown}
      defaultProps={{
        trigger: 'click',
        placement: 'bottom-start',
        open: true,
      }}
      controls={{
        trigger: { type: 'select', options: ['click', 'hover', 'focus'] },
        placement: {
          type: 'select',
          options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'],
        },
        open: { type: 'boolean' },
      }}
      excludeProps={[
        'content',
        'children',
        'state',
        'onOpenChange',
        'triggerRef',
        'className',
        'triggerClassName',
        'hoverDelayOpen',
        'hoverDelayClose',
        'widthStrategy',
        'offset',
        'closeOnEscapeKey',
        'triggerClickByKeys',
        'outsideClick',
        'fallbackPlacements',
        'disableSpanWrapper',
        'closeOnPopstate',
      ]}
    />
  );
}

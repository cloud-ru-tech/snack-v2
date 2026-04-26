import { Button, ButtonGroup } from '@ds/button';
import { Drawer, DrawerProps } from '@ds/drawer';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

import drawerDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type DemoProps = Pick<
  DrawerProps,
  'position' | 'width' | 'heightAuto' | 'title' | 'subtitle' | 'content' | 'showBlackout'
>;

function DrawerPreview(props: DemoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Button label='Открыть Drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Drawer
          {...props}
          open={open}
          onClose={close}
          footer={
            <ButtonGroup
              primaryAction={{ label: 'Подтвердить', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}

export function DrawerDemo() {
  return (
    <Canvas
      component={DrawerPreview}
      componentName='Drawer'
      componentDoc={drawerDoc.Drawer}
      defaultProps={{
        position: 'right',
        width: 's',
        heightAuto: false,
        showBlackout: true,
        title: 'Заголовок',
        subtitle: 'Подзаголовок',
        content: 'Основной контент тела Drawer.',
      }}
      controls={{
        position: { type: 'select', options: ['left', 'right', 'top', 'bottom'] },
        width: { type: 'select', options: ['s', 'm', 'l'] },
        heightAuto: { type: 'boolean' },
        showBlackout: { type: 'boolean' },
        title: { type: 'text' },
        subtitle: { type: 'text' },
        content: { type: 'text' },
      }}
      excludeProps={[
        'open',
        'onClose',
        'footer',
        'media',
        'nestedDrawer',
        'onBackButtonClick',
        'container',
        'closeOnPopstate',
        'rootClassName',
        'className',
        'slotAfterHeadline',
      ]}
    />
  );
}

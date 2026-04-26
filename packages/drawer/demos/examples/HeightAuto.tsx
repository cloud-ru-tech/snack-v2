import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function HeightAuto() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть bottom sheet' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          position='bottom'
          heightAuto
          onClose={close}
          title='Bottom sheet'
          subtitle='Высота рассчитывается по контенту'
          content='Подходит для компактных подтверждений на мобильных устройствах.'
        />
      </div>
    </PortalContextProvider>
  );
}

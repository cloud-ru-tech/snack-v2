import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function HeightAuto() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}

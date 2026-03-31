import { Button } from '@design-system/button';
import { Drawer } from '@design-system/drawer';
import { useState } from 'react';

export function DrawerBasicExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button appearance='primary' label='Открыть Drawer' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        content={<p>Основной контент панели: форма, список или поясняющий текст.</p>}
        open={open}
        position='right'
        subtitle='Краткое описание экрана или действия'
        title='Заголовок'
        onClose={() => setOpen(false)}
      />
    </>
  );
}

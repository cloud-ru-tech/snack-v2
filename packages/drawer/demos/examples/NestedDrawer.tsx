import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function NestedDrawer() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <>
      <Button label='Открыть родительский' appearance='primary' view='filled' onClick={() => setOuterOpen(true)} />
      <Drawer
        open={outerOpen}
        position='right'
        width='m'
        onClose={closeAll}
        title='Родительский Drawer'
        subtitle='При открытии вложенного — родитель сдвигается влево.'
        content={
          <Button label='Открыть вложенный' appearance='primary' view='outline' onClick={() => setInnerOpen(true)} />
        }
        nestedDrawer={
          <Drawer
            open={innerOpen}
            position='right'
            width='s'
            onClose={() => setInnerOpen(false)}
            title='Вложенный Drawer'
            subtitle='Кнопка «назад» возвращает к родителю'
            onBackButtonClick={() => setInnerOpen(false)}
            content='Вложенный Drawer рендерится через проп nestedDrawer родителя.'
          />
        }
      />
    </>
  );
}

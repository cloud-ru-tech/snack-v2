import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function WithMedia() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть онбординг' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          position='right'
          width='m'
          onClose={close}
          media={
            <div
              style={{
                height: 200,
                background: 'linear-gradient(135deg, rgb(102 126 234), rgb(118 75 162))',
              }}
            />
          }
          title='Добро пожаловать'
          subtitle='Кратко о том, что изменилось в этой версии.'
          content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
        />
      </div>
    </PortalContextProvider>
  );
}

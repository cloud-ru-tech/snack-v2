import { Button } from '@ds/button';
import { DrawerCustom } from '@ds/drawer';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function CustomComposition() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть custom drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <DrawerCustom open={open} position='right' width='s' onClose={close}>
          <DrawerCustom.Header title='Ручная композиция' subtitle='Header + Body + Footer собираются вручную.' />
          <DrawerCustom.Body
            content={
              <div style={{ padding: 24 }}>
                <p>Тело Drawer собирается из произвольной разметки.</p>
                <p>Скролл включается автоматически при большом содержимом.</p>
              </div>
            }
          />
          <DrawerCustom.Footer>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button label='Закрыть' appearance='neutral' view='outline' onClick={close} />
              <Button label='Подтвердить' appearance='primary' view='filled' onClick={close} />
            </div>
          </DrawerCustom.Footer>
        </DrawerCustom>
      </div>
    </PortalContextProvider>
  );
}

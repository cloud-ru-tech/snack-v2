import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Loading() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Запустить сохранение' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title='Сохранение изменений'
          subtitle='Пожалуйста, подождите'
          content='Основной контент'
          loading
        />
      </div>
    </PortalContextProvider>
  );
}

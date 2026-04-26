import { Button, ButtonGroup } from '@ds/button';
import { Modal, MODE } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Forced() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Принять условия' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={close}
          mode={MODE.Forced}
          title='Требуется действие'
          subtitle='Без кнопки закрытия и Esc — закрыть можно только через футер.'
          content='Закрытие по клику по overlay и по Escape отключено.'
          footer={
            <ButtonGroup
              primaryAction={{ label: 'Принять', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отклонить', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}

import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function WithFooter() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Удалить…' appearance='critical' view='outline' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={close}
          title='Удалить запись'
          subtitle='Действие необратимо.'
          content='После подтверждения запись и все её ссылки исчезнут из списка.'
          footer={
            <ButtonGroup
              primaryAction={{
                label: 'Удалить',
                appearance: 'critical',
                view: 'filled',
                onClick: close,
              }}
              secondaryAction={{
                label: 'Отмена',
                appearance: 'neutral',
                view: 'outline',
                onClick: close,
              }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}

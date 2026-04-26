import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Basic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          position='right'
          onClose={close}
          title='Заголовок'
          subtitle='Короткое пояснение сценария'
          content='Основной контент тела. Сюда помещается форма, предупреждение или подробный текст.'
          footer={
            <ButtonGroup
              primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}

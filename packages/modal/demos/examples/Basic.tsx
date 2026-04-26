import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function Basic() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={close}
        title='Заголовок'
        subtitle='Короткое пояснение действия'
        content='Основной контент тела модалки. Сюда помещается форма, предупреждение или подробный текст.'
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </>
  );
}

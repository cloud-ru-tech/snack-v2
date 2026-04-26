import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function WithFooter() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}

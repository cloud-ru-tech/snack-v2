import { Button } from '@ds/button';
import { ModalCustom } from '@ds/modal';
import { useState } from 'react';

export function CustomComposition() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <ModalCustom open={open} onClose={close} width='m'>
        <ModalCustom.Header title='Ручная композиция' subtitle='Header, Body и Footer собираются вручную.' />
        <ModalCustom.Body
          content={
            <div style={{ padding: 24 }}>
              <p>В теле может быть любая разметка — скролл включается автоматически.</p>
              <p>Это нужно, когда пресетной структуры Modal недостаточно.</p>
            </div>
          }
        />
        <ModalCustom.Footer>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button label='Закрыть' appearance='neutral' view='outline' onClick={close} />
            <Button label='Подтвердить' appearance='primary' view='filled' onClick={close} />
          </div>
        </ModalCustom.Footer>
      </ModalCustom>
    </>
  );
}

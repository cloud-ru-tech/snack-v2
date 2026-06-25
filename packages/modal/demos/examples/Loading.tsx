import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function Loading() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Запустить сохранение' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='Сохранение изменений'
        subtitle='Пожалуйста, подождите'
        content='Основной контент'
        loading
      />
    </>
  );
}

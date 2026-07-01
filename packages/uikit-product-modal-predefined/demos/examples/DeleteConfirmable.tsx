import { Button } from '@ds/button';
import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open confirmable delete modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        objectType='виртуальную машину'
        confirmable
        confirmText='vm-production-01'
        onDelete={close => close()}
      />
    </>
  );
}

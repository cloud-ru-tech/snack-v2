import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open confirmable delete modal
      </button>
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

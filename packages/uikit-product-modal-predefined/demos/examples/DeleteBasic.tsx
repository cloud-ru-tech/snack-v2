import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open delete modal
      </button>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        objectType='виртуальную машину'
        onDelete={close => close()}
      />
    </>
  );
}

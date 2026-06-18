import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open confirmable recall modal
      </button>
      <RecallModal
        open={open}
        onClose={() => setOpen(false)}
        confirmable
        confirmText='recall-operation-01'
        onRecall={close => close()}
      />
    </>
  );
}

import { Button } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open confirmable recall modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <RecallModal
        open={open}
        onClose={() => setOpen(false)}
        confirmText='recall-operation-01'
        onRecall={close => close()}
      />
    </>
  );
}

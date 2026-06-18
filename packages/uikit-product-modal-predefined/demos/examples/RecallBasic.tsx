import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open recall modal
      </button>
      <RecallModal open={open} onClose={() => setOpen(false)} onRecall={close => close()} />
    </>
  );
}

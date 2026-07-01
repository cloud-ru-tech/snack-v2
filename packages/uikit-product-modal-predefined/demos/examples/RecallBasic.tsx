import { Button } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open recall modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <RecallModal open={open} onClose={() => setOpen(false)} onRecall={close => close()} />
    </>
  );
}

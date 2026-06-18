import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open release notes
      </button>
      <ReleaseNotesModal open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}

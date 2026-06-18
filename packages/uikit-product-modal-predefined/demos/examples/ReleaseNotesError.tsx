import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesError() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open error release notes
      </button>
      <ReleaseNotesModal
        open={open}
        onClose={() => setOpen(false)}
        contentState='error'
        items={releaseNotesItems}
        onDataErrorRetryClick={() => undefined}
      />
    </>
  );
}

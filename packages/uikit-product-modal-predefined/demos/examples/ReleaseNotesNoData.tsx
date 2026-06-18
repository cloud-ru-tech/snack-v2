import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesNoData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open no-data release notes
      </button>
      <ReleaseNotesModal open={open} onClose={() => setOpen(false)} contentState='noData' items={releaseNotesItems} />
    </>
  );
}

import { ReleaseNotesBottomSheet as ReleaseNotesBottomSheetComponent } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open release notes bottom sheet
      </button>
      <ReleaseNotesBottomSheetComponent open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}

import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}

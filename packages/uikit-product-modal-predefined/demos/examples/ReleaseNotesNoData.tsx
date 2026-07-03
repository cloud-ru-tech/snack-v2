import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesNoData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open no-data release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes open={open} onClose={() => setOpen(false)} contentState='noData' items={releaseNotesItems} />
    </>
  );
}

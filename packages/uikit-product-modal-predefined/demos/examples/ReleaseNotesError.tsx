import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesError() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open error release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes
        open={open}
        onClose={() => setOpen(false)}
        contentState='error'
        items={releaseNotesItems}
        onDataErrorRetryClick={() => undefined}
      />
    </>
  );
}

import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open video release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes
        open={open}
        onClose={() => setOpen(false)}
        items={[
          {
            ...releaseNotesItems[0],
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
        ]}
      />
    </>
  );
}

import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open video release notes
      </button>
      <ReleaseNotesModal
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

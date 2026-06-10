import { BottomSheet, MEDIA_KIND } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function WithMedia() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть с media' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Bottom-sheet with media'
        media={{
          src: 'https://placehold.co/360x184?text=Media',
          alt: 'Media',
          kind: MEDIA_KIND.Image,
        }}
        content={<p>Media-блок full-bleed, прижат к шапке. bodyPadding управляет паддингами body отдельно.</p>}
        approveButton={{ label: 'Подтвердить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}

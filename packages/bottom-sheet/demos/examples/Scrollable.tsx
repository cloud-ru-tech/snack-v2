import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function Scrollable() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть scrollable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Scrollable content'
        withDividers
        content={
          <div>
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Body скроллится, header и footer остаются sticky.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}

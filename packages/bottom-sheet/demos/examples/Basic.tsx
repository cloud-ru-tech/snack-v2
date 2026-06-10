import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть BottomSheet' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Bottom-sheet headline'
        content={
          <p>
            Bottom-sheet — мобильный overlay-контейнер, выезжающий снизу. Используйте его как базовый layer для
            диалогов, выпадающих списков, фильтров и любых полу-полно-экранных UI.
          </p>
        }
        approveButton={{ label: 'Подтвердить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}

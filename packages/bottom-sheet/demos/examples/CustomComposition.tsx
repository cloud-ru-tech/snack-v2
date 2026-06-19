import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * BottomSheetCustom — низкоуровневая обёртка. Backdrop, scroll-lock, focus-trap и slide-up-motion
 * даёт сам компонент; анатомию (header / media / body / footer и их порядок) потребитель
 * собирает из namespace-слотов `BottomSheetCustom.Handle / .Header / .Media / .Body / .Footer`.
 */
export function CustomComposition() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть Custom' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} aria-label='Custom composition'>
        <BottomSheetCustom.Header title='Custom composition' slotAfterHeadline={<span>NEW</span>} />
        <BottomSheetCustom.Body>
          <p>Свободный JSX внутри Body. Можно вставить любой контент между Header и Footer.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Готово' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}

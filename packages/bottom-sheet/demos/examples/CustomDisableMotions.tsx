import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * `disableMotions` отключает slide-up / slide-down и анимации перехода между snap-точками:
 * sheet появляется и исчезает мгновенно. Удобно для reduced-motion, тестов и сценариев,
 * где анимация мешает.
 */
export function CustomDisableMotions() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть без анимации' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} disableMotions aria-label='Sheet без анимации'>
        <BottomSheetCustom.Header title='Без анимации' />
        <BottomSheetCustom.Body>
          <p>Открытие и закрытие мгновенные — slide-up / slide-down отключены через disableMotions.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Закрыть' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}

import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Длинный контент в `BottomSheetCustom.Body` скроллится независимо: drag-движок отдаёт жест
 * нативному скроллу, пока тело не упёрлось в край, и только тогда перехватывает swipe-down sheet'а.
 * Header и Footer остаются на месте.
 */
export function CustomScrollable() {
  const [open, setOpen] = useState(false);
  const rows = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <MobilePreview>
      <Button label='Открыть scrollable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} snapPoints={['60dvh']} aria-label='Длинный список'>
        <BottomSheetCustom.Header title='Длинный список' />
        <BottomSheetCustom.Body>
          {rows.map(n => (
            <p key={n}>Строка №{n}</p>
          ))}
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Готово' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}

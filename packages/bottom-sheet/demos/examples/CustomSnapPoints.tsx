import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Custom-слой полностью управляет snap-движком. `snapPoints={[0.5, 1]}` открывает sheet на
 * половину экрана; drag вверх (или контролируемый `snapIndex`) раскрывает до full-viewport.
 * Активный snap отслеживается через `onSnapIndexChange`.
 */
export function CustomSnapPoints() {
  const [open, setOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  return (
    <MobilePreview>
      <Button label='Открыть expandable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={[0.5, 1]}
        snapIndex={snapIndex}
        onSnapIndexChange={setSnapIndex}
        aria-label='Snap points sheet'
      >
        <BottomSheetCustom.Header title={snapIndex === 0 ? 'Половина экрана' : 'Full-screen'} />
        <BottomSheetCustom.Body>
          <p>Текущий snap-индекс: {snapIndex}. Потяните вверх, чтобы раскрыть.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button
            fullWidth
            view='filled'
            appearance='primary'
            label={snapIndex === 0 ? 'Раскрыть' : 'Свернуть'}
            onClick={() => setSnapIndex(snapIndex === 0 ? 1 : 0)}
          />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}

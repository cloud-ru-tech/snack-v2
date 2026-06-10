import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Expandable bottom-sheet: открывается на первом snap'е, drag за handle вверх раскрывает на следующий,
 * drag вниз ниже первого — закрывает.
 *
 * В демо-рамке телефона snap-точки заданы в пикселях под её высоту, чтобы «половина» и «полный»
 * визуально различались. На реальном устройстве для тех же состояний используйте доли вьюпорта —
 * `snapPoints={[0.5, 1]}` (резолвятся относительно высоты вьюпорта, а не контейнера).
 */
export function Expandable() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть Expandable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={['220px', '430px']}
        defaultSnapIndex={0}
        title='Expandable bottom-sheet'
        content={
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Контент для демонстрации snap-points поведения.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}

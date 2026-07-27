import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function FooterActions() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Удалить ресурс' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Удалить ресурс?'
        content={<p>Действие необратимо. Все связанные данные будут удалены без возможности восстановления.</p>}
        // Три действия: не помещаются в ряд на mobile-вьюпорте, поэтому собираются
        // в вертикальный full-width ButtonGroup (primary сверху). Для пары cancel/confirm футер
        // по умолчанию горизонтальный (space-between) — управляется `footerActionsOrientation`.
        approveButton={{ label: 'Удалить', appearance: 'critical', onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
        additionalButton={{ label: 'Подробнее', onClick: () => undefined }}
      />
    </MobilePreview>
  );
}

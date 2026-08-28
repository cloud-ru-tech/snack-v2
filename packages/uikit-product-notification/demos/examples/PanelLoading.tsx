import { Button } from '@ds/button';
import { NotificationPanel } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function PanelLoading() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button label='Уведомления' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <NotificationPanel
        open={open}
        onClose={() => setOpen(false)}
        title='Уведомления'
        loading
        skeletonsAmount={4}
        segments={{
          items: [
            { value: 'all', label: 'Все' },
            { value: 'unread', label: 'Непрочитанные' },
            { value: 'mentions', label: 'Упоминания' },
          ],
          value: 'all',
          onChange: () => {},
        }}
        readAllButton={{ label: 'Прочитать всё', onClick: () => {} }}
      />
    </div>
  );
}

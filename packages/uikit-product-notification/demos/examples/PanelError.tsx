import { Button } from '@ds/button';
import { CrossSVG } from '@ds/icons/interface/system';
import { NotificationPanel } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function PanelError() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button label='Уведомления' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <NotificationPanel
        open={open}
        onClose={() => setOpen(false)}
        title='Уведомления'
        content={
          <NotificationPanel.Blank
            icon={{ icon: CrossSVG, appearance: 'neutral' }}
            title='Сервис временно недоступен'
            content='Восстановление уже идёт. Обновите страницу через минуту.'
          />
        }
      />
    </div>
  );
}

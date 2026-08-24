import { Button } from '@ds/button';
import { WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function CustomLabels() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const billingRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={billingRef}>Биллинг</span>

      <Button label='Запустить тур' appearance='neutral' view='outline' onClick={() => setOpen(true)} />

      <WelcomeTour
        open={open}
        onOpenChange={setOpen}
        // Подписи всего тура: переопределяют дефолты из locale.
        labels={{ next: 'Дальше', back: 'Назад', finish: 'Всё понятно' }}
        steps={[
          { target: menuRef, title: 'Меню разделов', content: 'Навигация по проекту.' },
          {
            target: billingRef,
            title: 'Биллинг',
            content: 'Расходы проекта и настройки оплаты.',
            // Подписи одного шага: переопределяют `labels` компонента.
            labels: { finish: 'Перейти в биллинг' },
          },
        ]}
      />
    </div>
  );
}

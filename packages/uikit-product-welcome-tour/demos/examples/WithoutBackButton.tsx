import { Button } from '@ds/button';
import { TOUR_BUTTON, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function WithoutBackButton() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={searchRef}>Поиск</span>

      <Button label='Запустить тур' appearance='neutral' view='outline' onClick={() => setOpen(true)} />

      <WelcomeTour
        open={open}
        // Набор кнопок подсказки: без `back` тур идёт только вперёд.
        buttons={[TOUR_BUTTON.Primary, TOUR_BUTTON.Skip]}
        onOpenChange={setOpen}
        steps={[
          { target: menuRef, title: 'Меню разделов', content: 'Первый шаг.' },
          { target: searchRef, title: 'Поиск', content: 'Последний шаг — кнопки «Назад» нет.' },
        ]}
      />
    </div>
  );
}

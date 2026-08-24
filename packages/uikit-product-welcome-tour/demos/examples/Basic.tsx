import { Button } from '@ds/button';
import { WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function Basic() {
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
        onOpenChange={setOpen}
        steps={[
          {
            target: menuRef,
            title: 'Меню разделов',
            subtitle: 'Навигация по проекту',
            content: 'Отсюда открываются все разделы: ресурсы, биллинг и настройки.',
          },
          {
            target: searchRef,
            title: 'Поиск',
            content: 'Ищет по ресурсам проекта и открывает найденное в текущем разделе.',
          },
        ]}
      />
    </div>
  );
}

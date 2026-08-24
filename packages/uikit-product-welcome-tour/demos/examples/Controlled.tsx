import { Button } from '@ds/button';
import { TourStep, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function Controlled() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: TourStep[] = [
    { target: menuRef, title: 'Меню разделов', content: 'Первый шаг тура.' },
    { target: searchRef, title: 'Поиск', content: 'Второй шаг тура.' },
  ];

  const start = (index: number) => {
    setStepIndex(index);
    setOpen(true);
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={searchRef}>Поиск</span>

      <Button label='С первого шага' appearance='neutral' view='outline' onClick={() => start(0)} />
      <Button label='Со второго шага' appearance='neutral' view='outline' onClick={() => start(1)} />

      <span>Текущий шаг: {stepIndex + 1}</span>

      <WelcomeTour open={open} stepIndex={stepIndex} steps={steps} onOpenChange={setOpen} onStepChange={setStepIndex} />
    </div>
  );
}

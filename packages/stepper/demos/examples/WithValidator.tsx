import { Button } from '@ds/button';
import { Stepper, StepsValidator } from '@ds/stepper';
import { useRef } from 'react';

export function WithValidator() {
  const attempts = useRef(0);
  const validator: StepsValidator = async () => {
    attempts.current += 1;
    return attempts.current >= 2;
  };

  return (
    <Stepper steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]} validator={validator}>
      {({ stepper, goNext, resetValidation }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stepper}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button label='Сброс' view='outline' appearance='neutral' size='s' onClick={resetValidation} />
            <Button label='Далее' appearance='primary' size='s' onClick={() => goNext()} />
          </div>
        </div>
      )}
    </Stepper>
  );
}

import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';

export function BasicFlow() {
  return (
    <Stepper steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}>
      {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stepper}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              label='Назад'
              view='outline'
              appearance='neutral'
              size='s'
              onClick={() => goPrev()}
              disabled={currentStepIndex === 0}
            />
            <Button
              label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
              appearance='primary'
              size='s'
              onClick={() => goNext()}
              disabled={isCompleted}
            />
          </div>
        </div>
      )}
    </Stepper>
  );
}

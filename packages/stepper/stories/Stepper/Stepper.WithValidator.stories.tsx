import { Button } from '@ds/button';
import { Stepper, StepsValidator } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

function WithValidatorStory() {
  const calls = useRef(0);
  const validator: StepsValidator = async () => {
    calls.current += 1;
    return calls.current !== 1;
  };
  return (
    <div className={styles.containerDesktop}>
      <Stepper
        steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}
        validator={validator}
        data-test-id='stepper'
      >
        {({ stepper, goNext, goPrev, resetValidation, currentStepIndex, isCompleted }) => (
          <div className={styles.stack}>
            {stepper}
            <div className={styles.row}>
              <Button
                label='Назад'
                view='outline'
                appearance='neutral'
                size='s'
                onClick={() => goPrev()}
                disabled={currentStepIndex === 0}
              />
              <Button
                label='Попробовать снова'
                view='outline'
                appearance='neutral'
                size='s'
                onClick={() => resetValidation()}
              />
              <Button
                label='Далее'
                appearance='primary'
                size='s'
                onClick={() => goNext()}
                disabled={isCompleted}
                data-test-id='stepper-next'
              />
            </div>
          </div>
        )}
      </Stepper>
    </div>
  );
}

export const WithValidator: Story = {
  tags: ['dev'],
  render: () => <WithValidatorStory />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Данные')).toBeVisible();
  },
};

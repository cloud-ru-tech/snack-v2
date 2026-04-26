import { Button } from '@ds/button';
import { MobileStepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<typeof MobileStepper> = {
  title: 'Components/Stepper',
  component: MobileStepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof MobileStepper>;

export const Mobile: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.containerMobile}>
      <MobileStepper
        steps={[
          { title: 'Заполните данные', description: 'Укажите имя и фамилию' },
          { title: 'Подтвердите', description: 'Проверьте, что всё корректно' },
          { title: 'Готово' },
        ]}
        data-test-id='mobile-stepper'
      >
        {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
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
                label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
                appearance='primary'
                size='s'
                onClick={() => goNext()}
                disabled={isCompleted}
              />
            </div>
          </div>
        )}
      </MobileStepper>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Заполните данные')).toBeVisible();
  },
};

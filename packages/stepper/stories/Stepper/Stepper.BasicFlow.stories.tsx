import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const BasicFlow: Story = {
  tags: ['dev'],
  args: {
    steps: [{ title: 'Шаг 1' }, { title: 'Шаг 2' }, { title: 'Шаг 3' }],
    defaultCurrentStepIndex: 0,
    'data-test-id': 'stepper',
  },
  render: args => (
    <div className={styles.containerDesktop}>
      <Stepper {...args}>
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
                data-test-id='stepper-prev'
              />
              <Button
                label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
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
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Шаг 1')).toBeVisible();
  },
};

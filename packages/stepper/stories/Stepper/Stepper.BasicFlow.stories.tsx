import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { STEPPER_NEXT_TEST_ID, STEPPER_PREV_TEST_ID, STEPPER_TEST_ID } from './testIds';

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
    'data-test-id': STEPPER_TEST_ID,
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
                data-test-id={STEPPER_PREV_TEST_ID}
              />
              <Button
                label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
                appearance='primary'
                size='s'
                onClick={() => goNext()}
                disabled={isCompleted}
                data-test-id={STEPPER_NEXT_TEST_ID}
              />
            </div>
          </div>
        )}
      </Stepper>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STEPPER_TEST_ID)).toBeVisible();
  },
};

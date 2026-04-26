import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { STEPPER_TEST_ID } from './testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Completed: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.containerDesktop}>
      <Stepper
        steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}
        defaultCurrentStepIndex={2}
        data-test-id={STEPPER_TEST_ID}
      >
        {({ stepper, goPrev }) => (
          <div className={styles.stack}>
            {stepper}
            <Button
              label='Вернуться на прошлый шаг'
              size='s'
              view='outline'
              appearance='neutral'
              onClick={() => goPrev()}
            />
          </div>
        )}
      </Stepper>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STEPPER_TEST_ID)).toBeVisible();
  },
};

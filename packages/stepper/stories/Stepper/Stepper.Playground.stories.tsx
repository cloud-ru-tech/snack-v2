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
  args: {
    steps: [
      { title: 'Настройка', description: 'Укажите основные параметры' },
      { title: 'Проверка', description: 'Убедитесь, что всё корректно' },
      { title: 'Готово', description: 'Подтвердите создание' },
    ],
    defaultCurrentStepIndex: 0,
    className: '',
    'data-test-id': STEPPER_TEST_ID,
  },
  argTypes: {
    steps: { control: 'object', description: 'Массив шагов (title + description)' },
    defaultCurrentStepIndex: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Индекс шага, на котором степпер откроется изначально',
    },
    className: { control: 'text', description: 'CSS-класс на корне степпера' },
    validator: { control: false },
    onChangeCurrentStep: { control: false },
    onCompleteChange: { control: false },
    children: { control: false },
  },
  render: args => (
    <div className={styles.containerPlayground}>
      <Stepper {...args}>
        {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
          <div className={styles.stack}>
            {stepper}
            <div className={styles.row}>
              <Button
                label='Назад'
                appearance='neutral'
                view='outline'
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
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(STEPPER_TEST_ID)).toBeVisible();
  },
};

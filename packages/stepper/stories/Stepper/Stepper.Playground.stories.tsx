import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'fullscreen' },
  args: {
    steps: [
      { title: 'Настройка', description: 'Укажите основные параметры' },
      { title: 'Проверка', description: 'Убедитесь, что всё корректно' },
      { title: 'Готово', description: 'Подтвердите создание' },
    ],
    defaultCurrentStepIndex: 0,
    allowFreeNavigation: false,
    className: '',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    steps: { control: 'object', description: 'Массив шагов (title + description)' },
    defaultCurrentStepIndex: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Индекс шага, на котором степпер откроется изначально',
    },
    allowFreeNavigation: { control: 'boolean' },
    className: { control: 'text', description: 'CSS-класс на корне степпера' },
    validator: { control: false },
    onChangeCurrentStep: { control: false },
    onCompleteChange: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Пошаговый мастер с кнопками навигации.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.containerPlayground} data-test-id={TEST_IDS.example}>
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
                      data-test-id={TEST_IDS.prev}
                    />
                    <Button
                      label={currentStepIndex === stepCount - 1 ? 'Завершить' : 'Далее'}
                      appearance='primary'
                      size='s'
                      onClick={() => goNext()}
                      disabled={isCompleted}
                      data-test-id={TEST_IDS.next}
                    />
                  </div>
                </div>
              )}
            </Stepper>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

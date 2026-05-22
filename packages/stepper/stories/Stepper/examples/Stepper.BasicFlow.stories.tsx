import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Examples/BasicFlow',
  component: Stepper,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const BasicFlow: Story = {
  tags: ['dev', 'test'],
  args: {
    steps: [{ title: 'Шаг 1' }, { title: 'Шаг 2' }, { title: 'Шаг 3' }],
    defaultCurrentStepIndex: 0,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>BasicFlow</DemoTitle>
        <DemoHint>Базовый сценарий пошагового перехода вперёд и назад.</DemoHint>
        <DemoActions block>
          <div className={styles.containerDesktop} data-test-id={TEST_IDS.example}>
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

import { Button } from '@ds/button';
import { MobileStepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof MobileStepper> = {
  title: 'Components/Stepper/Examples/Mobile',
  component: MobileStepper,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof MobileStepper>;

export const Mobile: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Mobile</DemoTitle>
        <DemoHint>Компактный вертикальный stepper для мобильных макетов.</DemoHint>
        <DemoActions block>
          <div className={styles.containerMobile} data-test-id={TEST_IDS.example}>
            <MobileStepper
              steps={[
                { title: 'Заполните данные', description: 'Укажите имя и фамилию' },
                { title: 'Подтвердите', description: 'Проверьте, что всё корректно' },
                { title: 'Готово' },
              ]}
              data-test-id={TEST_IDS.mobile}
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
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.mobile)).toBeVisible();
  },
};

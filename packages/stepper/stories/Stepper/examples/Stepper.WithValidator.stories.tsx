import { Button } from '@ds/button';
import { Stepper, StepsValidator } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Examples/WithValidator',
  component: Stepper,
  parameters: { layout: 'fullscreen' },
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
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithValidator</DemoTitle>
        <DemoHint>Переход к следующему шагу блокируется валидацией.</DemoHint>
        <DemoActions block>
          <div className={styles.containerDesktop}>
            <Stepper
              steps={[{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }]}
              validator={validator}
              data-test-id={TEST_IDS.root}
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
  );
}

export const WithValidator: Story = {
  tags: ['dev', 'test'],
  render: () => <WithValidatorStory />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};

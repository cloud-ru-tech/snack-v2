import { Button } from '@ds/button';
import { AdaptiveStepper, LAYOUT_TYPE, LayoutType } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AdaptiveStepper> = {
  title: 'Components/Stepper/Examples/Adaptive',
  component: AdaptiveStepper,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    layoutType: { control: 'radio', options: Object.values(LAYOUT_TYPE) as LayoutType[] },
  },
};
export default meta;
type Story = StoryObj<typeof AdaptiveStepper>;

export const Adaptive: Story = {
  tags: ['dev', 'test'],
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    steps: [{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }],
    'data-test-id': TEST_IDS.adaptive,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Adaptive</DemoTitle>
        <DemoHint>Stepper переключает раскладку между desktop и mobile.</DemoHint>
        <DemoActions block>
          <div className={args.layoutType === LAYOUT_TYPE.Mobile ? styles.containerMobile : styles.containerDesktop}>
            <AdaptiveStepper {...args}>
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
            </AdaptiveStepper>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.adaptive)).toBeVisible();
  },
};

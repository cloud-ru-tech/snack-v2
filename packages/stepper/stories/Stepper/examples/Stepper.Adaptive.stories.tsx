import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { Stepper, StepperProps } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Examples/Adaptive',
  component: Stepper,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

// Раскладку даёт тулбар-глобал `layoutType` (AdaptiveProvider в preview). Контейнер выбираем
// по той же раскладке через useAdaptiveLayout — поэтому render вынесен в компонент.
function AdaptiveExample(props: Omit<StepperProps, 'children'>) {
  const { layoutType } = useAdaptiveLayout();

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Adaptive</DemoTitle>
        <DemoHint>Stepper переключает раскладку между desktop и mobile.</DemoHint>
        <DemoActions block>
          <div className={isMobileLayout(layoutType) ? styles.containerMobile : styles.containerDesktop}>
            <Stepper {...props}>
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
            </Stepper>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Adaptive: Story = {
  tags: ['dev', 'test'],
  args: {
    steps: [{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }],
    'data-test-id': TEST_IDS.adaptive,
  },
  render: args => <AdaptiveExample {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.adaptive)).toBeVisible();
  },
};

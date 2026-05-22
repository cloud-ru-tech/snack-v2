import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper/Tests/Interaction',
  component: Stepper,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onChangeCurrentStep: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Навигация между шагами через кнопки Prev и Next.</DemoHint>
        <DemoActions block>
          <div className={styles.containerDesktop}>
            <Stepper
              {...args}
              steps={[{ title: 'Шаг 1' }, { title: 'Шаг 2' }, { title: 'Шаг 3' }]}
              data-test-id={TEST_IDS.root}
            >
              {({ stepper, goNext, goPrev, currentStepIndex, stepCount, isCompleted }) => (
                <div className={styles.stack}>
                  {stepper}
                  <div className={styles.row}>
                    <Button
                      label='Prev'
                      size='s'
                      view='outline'
                      appearance='neutral'
                      onClick={() => goPrev()}
                      disabled={currentStepIndex === 0}
                      data-test-id={TEST_IDS.prev}
                    />
                    <Button
                      label='Next'
                      size='s'
                      onClick={() => goNext()}
                      disabled={isCompleted || currentStepIndex === stepCount - 1}
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
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByTestId(TEST_IDS.next);
    const prev = canvas.getByTestId(TEST_IDS.prev);

    await step('initial: Prev is disabled on first step', async () => {
      await expect(prev).toBeDisabled();
    });

    await step('click: Next advances to step 2 and fires onChangeCurrentStep', async () => {
      await userEvent.click(next);
      await expect(args.onChangeCurrentStep).toHaveBeenCalled();
    });

    await step('click: Prev returns to step 1 and Prev becomes disabled', async () => {
      await userEvent.click(prev);
      await expect(prev).toBeDisabled();
    });

    await step('keyboard: Enter on Next advances again', async () => {
      next.focus();
      await userEvent.keyboard('{Enter}');
      await expect(args.onChangeCurrentStep).toHaveBeenCalledTimes(3);
    });
  },
};

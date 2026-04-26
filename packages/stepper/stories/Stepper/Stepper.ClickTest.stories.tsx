import { Button } from '@ds/button';
import { Stepper } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './styles.module.scss';
import { STEPPER_NEXT_TEST_ID, STEPPER_PREV_TEST_ID, STEPPER_TEST_ID } from './testIds';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onChangeCurrentStep: fn(),
  },
  render: args => (
    <div className={styles.containerDesktop}>
      <Stepper
        {...args}
        steps={[{ title: 'Шаг 1' }, { title: 'Шаг 2' }, { title: 'Шаг 3' }]}
        data-test-id={STEPPER_TEST_ID}
      >
        {({ stepper, goNext, goPrev }) => (
          <div className={styles.stack}>
            {stepper}
            <div className={styles.row}>
              <Button
                label='Prev'
                size='s'
                view='outline'
                onClick={() => goPrev()}
                data-test-id={STEPPER_PREV_TEST_ID}
              />
              <Button label='Next' size='s' onClick={() => goNext()} data-test-id={STEPPER_NEXT_TEST_ID} />
            </div>
          </div>
        )}
      </Stepper>
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click Next', async () => {
      await userEvent.click(canvas.getByTestId(STEPPER_NEXT_TEST_ID));
    });
    await step('onChangeCurrentStep fired', async () => {
      await expect(args.onChangeCurrentStep).toHaveBeenCalled();
    });
  },
};

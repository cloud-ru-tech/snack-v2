import { Button } from '@ds/button';
import { AdaptiveStepper, LAYOUT_TYPE, LayoutType } from '@ds/stepper';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<typeof AdaptiveStepper> = {
  title: 'Components/Stepper',
  component: AdaptiveStepper,
  parameters: { layout: 'centered' },
  argTypes: {
    layoutType: { control: 'radio', options: Object.values(LAYOUT_TYPE) as LayoutType[] },
  },
};
export default meta;
type Story = StoryObj<typeof AdaptiveStepper>;

export const Adaptive: Story = {
  tags: ['dev'],
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    steps: [{ title: 'Данные' }, { title: 'Проверка' }, { title: 'Готово' }],
    'data-test-id': 'adaptive-stepper',
  },
  render: args => (
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
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('adaptive-stepper')).toBeVisible();
  },
};

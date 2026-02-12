import type { Meta, StoryObj } from '@storybook/react';

import { QuestionTooltip, type QuestionTooltipProps, TRIGGER } from '../../src';
import styles from '../Tooltip/styles.module.scss';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
};

export default meta;
type Story = StoryObj<QuestionTooltipProps>;

export const WithClickTrigger: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    content: 'Тултип по клику',
    trigger: TRIGGER.Click,
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <QuestionTooltip {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Тултип открывается по клику на иконку. Удобно для мобильных или когда нужен явный показ подсказки.',
      },
    },
  },
};

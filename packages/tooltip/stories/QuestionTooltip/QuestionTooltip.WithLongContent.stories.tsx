import type { Meta, StoryObj } from '@storybook/react';

import { QuestionTooltip, type QuestionTooltipProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
};

export default meta;
type Story = StoryObj<QuestionTooltipProps>;

const longContent =
  'Длинный текст подсказки: компонент ограничивает максимальную ширину и переносит строки. Так тултип остаётся читаемым на любых экранах.';

export const WithLongContent: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    content: longContent,
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <QuestionTooltip {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Тултип с длинным текстом: макс. ширина задаётся стилями, текст переносится.',
      },
    },
  },
};

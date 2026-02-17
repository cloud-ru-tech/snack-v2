import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<TooltipProps>;

const longContent =
  'Длинный текст подсказки: компонент ограничивает максимальную ширину и переносит строки. Так тултип остаётся читаемым на любых экранах.';

export const WithLongContent: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    tip: longContent,
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <Tooltip {...args}>
        <button type='button'>Наведи для длинного текста</button>
      </Tooltip>
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

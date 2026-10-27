import { AiHistoryLineRequest } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const meta: Meta<typeof AiHistoryLineRequest> = {
  title: 'Components/AiHistoryLine/AiHistoryLineRequest',
  component: AiHistoryLineRequest,
  args: {
    children: 'Упрости настройку хранения ссылок: поддержи и существующие репозитории, и первоначальную настройку.',
    timestamp: '2 октября, 12:40',
    duration: '8 мин.',
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineRequest>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.card}>
      <AiHistoryLineRequest {...args} />
    </div>
  ),
};

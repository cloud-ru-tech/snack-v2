import { AiHistoryLineCheckpoint } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const meta: Meta<typeof AiHistoryLineCheckpoint> = {
  title: 'Components/AiHistoryLine/AiHistoryLineCheckpoint',
  component: AiHistoryLineCheckpoint,
  args: {
    hash: 'b12cb69',
    title: 'Добавлена логика включения хранения ссылок.',
    added: 183,
    removed: 43,
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineCheckpoint>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.card}>
      <AiHistoryLineCheckpoint {...args} />
    </div>
  ),
};

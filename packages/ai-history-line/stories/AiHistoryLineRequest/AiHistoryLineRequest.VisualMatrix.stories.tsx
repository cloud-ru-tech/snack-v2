import { AiHistoryLineRequest } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const MESSAGE = 'Упрости настройку хранения ссылок.';

const meta: Meta<typeof AiHistoryLineRequest> = {
  title: 'Components/AiHistoryLine/AiHistoryLineRequest',
  component: AiHistoryLineRequest,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineRequest>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='metadata'
      firstColumnHeader='Поля'
      columnHeaders={['message', 'timestamp', 'duration', 'timestamp · duration']}
      rows={[
        {
          variantLabel: 'запрос',
          cells: [
            <div key='message' className={styles.card}>
              <AiHistoryLineRequest>{MESSAGE}</AiHistoryLineRequest>
            </div>,
            <div key='time' className={styles.card}>
              <AiHistoryLineRequest timestamp='2 октября, 12:40'>{MESSAGE}</AiHistoryLineRequest>
            </div>,
            <div key='duration' className={styles.card}>
              <AiHistoryLineRequest duration='8 мин.'>{MESSAGE}</AiHistoryLineRequest>
            </div>,
            <div key='both' className={styles.card}>
              <AiHistoryLineRequest timestamp='2 октября, 12:40' duration='8 мин.'>
                {MESSAGE}
              </AiHistoryLineRequest>
            </div>,
          ],
        },
      ]}
    />
  ),
};

import { AiHistoryLineCheckpoint } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AiHistoryLineCheckpoint> = {
  title: 'Components/AiHistoryLine/AiHistoryLineCheckpoint',
  component: AiHistoryLineCheckpoint,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineCheckpoint>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Карточка'
      firstColumnHeader='Чекпоинт'
      columnHeaders={['diff']}
      rows={[
        {
          variantLabel: 'коммит',
          cells: [
            <div key='checkpoint' className={styles.card}>
              <AiHistoryLineCheckpoint
                hash='b12cb69'
                title='Добавлена логика включения хранения ссылок.'
                added={183}
                removed={43}
              />
            </div>,
          ],
        },
      ]}
    />
  ),
};

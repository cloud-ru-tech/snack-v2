import { AiHistoryLineAccordion } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AiHistoryLineAccordion> = {
  title: 'Components/AiHistoryLine/AiHistoryLineAccordion',
  component: AiHistoryLineAccordion,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineAccordion>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='defaultOpen'
      firstColumnHeader='Карточка'
      columnHeaders={['closed', 'open']}
      rows={[
        {
          variantLabel: 'группа',
          cells: [
            <div key='closed' className={styles.card}>
              <AiHistoryLineAccordion id='closed' title='2 вызова инструментов'>
                Содержимое группы
              </AiHistoryLineAccordion>
            </div>,
            <div key='open' className={styles.card}>
              <AiHistoryLineAccordion id='open' title='2 вызова инструментов' defaultOpen>
                Содержимое группы
              </AiHistoryLineAccordion>
            </div>,
          ],
        },
      ]}
    />
  ),
};

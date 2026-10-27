import { AiHistoryLine } from '@ds/ai-history-line';
import { Avatar } from '@ds/avatar';
import { BulletListSVG } from '@ds/icons/interface/system';
import { BranchSVG } from '@ds/icons/interface/web';
import { ClaudeSonnetLogo } from '@ds/icons/logos';
import { Markdown } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AiHistoryLine> = {
  title: 'Components/AiHistoryLine/AiHistoryLine',
  component: AiHistoryLine,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLine>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Сборка'
      firstColumnHeader='Состав'
      columnHeaders={['Фрагмент']}
      rows={[
        {
          variantLabel: 'запрос, ответ, чекпоинт',
          cells: [
            <div key='line' className={styles.session}>
              <AiHistoryLine>
                <AiHistoryLine.Item
                  indicator={<Avatar name='W' size='s' shape='rounded' appearance='neutral' />}
                  indicatorBackground={false}
                >
                  <AiHistoryLine.Request timestamp='2 октября, 12:40' duration='8 мин.'>
                    Упрости настройку хранения ссылок.
                  </AiHistoryLine.Request>
                </AiHistoryLine.Item>
                <AiHistoryLine.Item indicator={<ClaudeSonnetLogo size={16} />}>
                  <AiHistoryLine.AgentContent>
                    <Markdown value='Разобрал текущий поток.' />
                  </AiHistoryLine.AgentContent>
                </AiHistoryLine.Item>
                <AiHistoryLine.Item indicator={<BulletListSVG />}>
                  <AiHistoryLine.Accordion id='tools' title='2 вызова инструментов' />
                </AiHistoryLine.Item>
                <AiHistoryLine.Item indicator={<BranchSVG />} lastItem>
                  <AiHistoryLine.Checkpoint
                    hash='b12cb69'
                    title='Добавлена логика включения.'
                    added={183}
                    removed={43}
                  />
                </AiHistoryLine.Item>
              </AiHistoryLine>
            </div>,
          ],
        },
      ]}
    />
  ),
};

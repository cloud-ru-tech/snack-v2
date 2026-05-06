import { PLACEMENT, Tooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const placements = [PLACEMENT.Top, PLACEMENT.Right, PLACEMENT.Bottom, PLACEMENT.Left] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Placement (тултип закрыт — видны только триггеры)'
        firstColumnHeader='Placement'
        columnHeaders={['Trigger']}
        rows={placements.map(p => ({
          variantLabel: p,
          cells: [
            <Tooltip key={p} tip={`Подсказка ${p}`} placement={p}>
              <button type='button' className={styles.triggerButton}>
                trigger
              </button>
            </Tooltip>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Содержимое'
        firstColumnHeader='Content'
        columnHeaders={['Trigger']}
        rows={[
          {
            variantLabel: 'short',
            cells: [
              <Tooltip key='s' tip='Краткая подсказка'>
                <button type='button' className={styles.triggerButton}>
                  short
                </button>
              </Tooltip>,
            ],
          },
          {
            variantLabel: 'long',
            cells: [
              <Tooltip
                key='l'
                tip='Длинная подсказка с пояснением в нескольких предложениях, которая требует переноса строки в контейнере тултипа.'
              >
                <button type='button' className={styles.triggerButton}>
                  long
                </button>
              </Tooltip>,
            ],
          },
        ]}
      />
    </div>
  ),
};

import { NotificationPanel, NotificationPanelContent } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SAMPLE_CARDS } from '../NotificationPanelContent/fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof NotificationPanel> = {
  title: 'Uikit Product/Notification/NotificationPanel',
  component: NotificationPanel,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NotificationPanel>;

// Drawer мы открываем через триггер в Playground; для VM достаточно одного
// "open" пресета — full-viewport overlay перекрывает соседние ячейки
// StoryTable, поэтому несколько open-инстансов рядом не имеют смысла.
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Position (open)'
        firstColumnHeader='Position'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'right (default)',
            cells: [
              <NotificationPanel
                key='r'
                open
                onClose={() => {}}
                position='right'
                width='s'
                content={<NotificationPanelContent title='Уведомления' content={SAMPLE_CARDS} />}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};

import { NotificationPanel, NotificationPanelPopover } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SAMPLE_CARDS } from '../NotificationPanel/fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof NotificationPanelPopover> = {
  title: 'Uikit Product/Notification/NotificationPanelPopover',
  component: NotificationPanelPopover,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NotificationPanelPopover>;

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
              <NotificationPanelPopover
                key='r'
                open
                onClose={() => {}}
                position='right'
                width='s'
                content={<NotificationPanel title='Уведомления' content={SAMPLE_CARDS} />}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};

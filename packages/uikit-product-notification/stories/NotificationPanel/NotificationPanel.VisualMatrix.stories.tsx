import { CrossSVG, SearchSVG } from '@ds/icons';
import { APPEARANCE, NotificationCard, NotificationPanel } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { SAMPLE_CARDS } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof NotificationPanel> = {
  title: 'Uikit Product/Notification/NotificationPanel',
  component: NotificationPanel,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof NotificationPanel>;

const wrap = (children: ReactNode) => <div className={styles.container}>{children}</div>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State'
        firstColumnHeader='State'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'default (with cards)',
            cells: [wrap(<NotificationPanel title='Уведомления' content={SAMPLE_CARDS} />)],
          },
          {
            variantLabel: 'loading',
            cells: [wrap(<NotificationPanel title='Уведомления' loading skeletonsAmount={3} />)],
          },
          {
            variantLabel: 'blank',
            cells: [
              wrap(
                <NotificationPanel
                  title='Уведомления'
                  content={
                    <NotificationPanel.Blank
                      icon={{ icon: SearchSVG, appearance: 'neutral' }}
                      title='Нет уведомлений'
                      description='Здесь будут новые события'
                    />
                  }
                />,
              ),
            ],
          },
          {
            variantLabel: 'error',
            cells: [
              wrap(
                <NotificationPanel
                  title='Уведомления'
                  content={
                    <NotificationPanel.Blank
                      icon={{ icon: CrossSVG, appearance: 'neutral' }}
                      title='Не удалось загрузить'
                      description='Попробуйте позже'
                    />
                  }
                />,
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Slots'
        firstColumnHeader='Slot'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'with readAll + footer',
            cells: [
              wrap(
                <NotificationPanel
                  title='Уведомления'
                  content={SAMPLE_CARDS}
                  readAllButton={{ label: 'Прочитать всё', onClick: fn() }}
                />,
              ),
            ],
          },
          {
            variantLabel: 'with filters (segments + chipToggle + settings)',
            cells: [
              wrap(
                <NotificationPanel
                  title='Уведомления'
                  content={SAMPLE_CARDS}
                  segments={{
                    items: [
                      { value: 'all', label: 'Все' },
                      { value: 'unread', label: 'Непрочитанные' },
                    ],
                    value: 'all',
                    onChange: fn(),
                  }}
                  chipToggle={{ label: 'Только важные', checked: true, onChange: fn() }}
                  settings={{
                    button: { onClick: fn() },
                    actions: [{ content: { option: 'Настройки' }, onClick: fn() }],
                  }}
                />,
              ),
            ],
          },
          {
            variantLabel: 'with group',
            cells: [
              wrap(
                <NotificationPanel
                  title='Уведомления'
                  content={
                    <>
                      <NotificationPanel.Group title='Backup'>
                        <NotificationCard
                          id='g1'
                          title='Бэкап завершён'
                          content='prod-1'
                          date='14:32'
                          appearance={APPEARANCE.Success}
                        />
                      </NotificationPanel.Group>
                    </>
                  }
                />,
              ),
            ],
          },
        ]}
      />
    </div>
  ),
};

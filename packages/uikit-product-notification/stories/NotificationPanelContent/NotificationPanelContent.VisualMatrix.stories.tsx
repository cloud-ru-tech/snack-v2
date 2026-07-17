import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { CrossSVG, SearchSVG } from '@ds/icons/interface/system';
import { APPEARANCE, NotificationCard, NotificationPanelContent } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { SAMPLE_CARDS } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof NotificationPanelContent> = {
  title: 'Uikit Product/Notification/NotificationPanelContent',
  component: NotificationPanelContent,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof NotificationPanelContent>;

const wrap = (children: ReactNode) => <div className={styles.container}>{children}</div>;

// Полный набор слотов, чувствительных к раскладке: на mobile меняется размер кнопок,
// скрывается chipToggle и добавляется divider (см. NotificationPanelContent src).
const adaptiveContent = (
  <NotificationPanelContent
    title='Уведомления'
    content={SAMPLE_CARDS}
    readAllButton={{ label: 'Прочитать всё', onClick: fn() }}
    segments={{
      items: [
        { value: 'all', label: 'Все' },
        { value: 'unread', label: 'Непрочитанные' },
      ],
      value: 'all',
      onChange: fn(),
    }}
    chipToggle={{ label: 'Только важные', checked: true, onChange: fn() }}
    settings={{ button: { onClick: fn() }, actions: [{ content: { option: 'Настройки' }, onClick: fn() }] }}
  />
);

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
            cells: [wrap(<NotificationPanelContent title='Уведомления' content={SAMPLE_CARDS} />)],
          },
          {
            variantLabel: 'loading',
            cells: [wrap(<NotificationPanelContent title='Уведомления' loading skeletonsAmount={3} />)],
          },
          {
            variantLabel: 'blank',
            cells: [
              wrap(
                <NotificationPanelContent
                  title='Уведомления'
                  content={
                    <NotificationPanelContent.Blank
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
                <NotificationPanelContent
                  title='Уведомления'
                  content={
                    <NotificationPanelContent.Blank
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
                <NotificationPanelContent
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
                <NotificationPanelContent
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
                <NotificationPanelContent
                  title='Уведомления'
                  content={
                    <>
                      <NotificationPanelContent.Group title='Backup'>
                        <NotificationCard
                          id='g1'
                          title='Бэкап завершён'
                          content='prod-1'
                          date='14:32'
                          appearance={APPEARANCE.Success}
                        />
                      </NotificationPanelContent.Group>
                    </>
                  }
                />,
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Adaptive layout (desktop × mobile)'
        firstColumnHeader='layoutType'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'desktop',
            cells: [
              <AdaptiveProvider key='content-desktop' layoutType={LAYOUT_TYPE.Desktop}>
                {wrap(adaptiveContent)}
              </AdaptiveProvider>,
            ],
          },
          {
            variantLabel: 'mobile',
            cells: [
              <AdaptiveProvider key='content-mobile' layoutType={LAYOUT_TYPE.Mobile}>
                {wrap(adaptiveContent)}
              </AdaptiveProvider>,
            ],
          },
        ]}
      />
    </div>
  ),
};

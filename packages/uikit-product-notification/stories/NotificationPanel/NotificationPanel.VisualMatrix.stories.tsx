import { CrossSVG, SearchSVG } from '@ds/icons/interface/system';
import { APPEARANCE, NotificationCard, NotificationPanel } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

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

/**
 * Сама поверхность панели — full-viewport overlay: несколько открытых инстансов в StoryTable
 * перекрывают друг друга, поэтому desktop/mobile-поверхности снимаются отдельно
 * (`open.png` / `open-mobile.png` в visual.spec). VisualMatrix покрывает инлайновую часть API —
 * композиции тела панели (`Blank` / `Group` / `Stack`).
 */
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Body state'
        firstColumnHeader='State'
        columnHeaders={['view']}
        rows={[
          { variantLabel: 'cards', cells: [wrap(SAMPLE_CARDS)] },
          {
            variantLabel: 'blank',
            cells: [
              wrap(
                <NotificationPanel.Blank
                  icon={{ icon: SearchSVG, appearance: 'neutral' }}
                  title='Нет уведомлений'
                  content='Здесь будут новые события'
                />,
              ),
            ],
          },
          {
            variantLabel: 'error',
            cells: [
              wrap(
                <NotificationPanel.Blank
                  icon={{ icon: CrossSVG, appearance: 'neutral' }}
                  title='Не удалось загрузить'
                  content='Попробуйте позже'
                />,
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Composition'
        firstColumnHeader='Slot'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'group',
            cells: [
              wrap(
                <NotificationPanel.Group title='Backup'>
                  <NotificationCard
                    id='g1'
                    title='Бэкап завершён'
                    description='prod-1'
                    date='14:32'
                    appearance={APPEARANCE.Success}
                  />
                </NotificationPanel.Group>,
              ),
            ],
          },
          {
            variantLabel: 'stack',
            cells: [
              wrap(
                <NotificationPanel.Stack title='Лимит дисковой квоты · 2 хоста' unread>
                  <NotificationCard
                    id='s1'
                    title='prod-1 · /var/data'
                    description='Использовано 92%'
                    date='01:12'
                    appearance={APPEARANCE.Warning}
                  />
                  <NotificationCard
                    id='s2'
                    title='prod-2 · /var/log'
                    description='Использовано 87%'
                    date='00:48'
                    appearance={APPEARANCE.Warning}
                  />
                </NotificationPanel.Stack>,
              ),
            ],
          },
        ]}
      />
    </div>
  ),
};

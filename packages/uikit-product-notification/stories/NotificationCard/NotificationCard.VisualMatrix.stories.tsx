import { SkeletonContextProvider } from '@ds/skeleton';
import { APPEARANCE, NotificationCard, NotificationCardSkeleton } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { ACTIONS, BASE_PROPS, BUTTONS_PROPS } from '../constants';
import styles from './styles.module.scss';

const meta: Meta<typeof NotificationCard> = {
  title: 'Uikit Product/Notification/NotificationCard',
  component: NotificationCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Unread'
        firstColumnHeader='Appearance'
        columnHeaders={['read', 'unread']}
        rows={Object.values(APPEARANCE).map(appearance => ({
          variantLabel: appearance,
          cells: [false, true].map(unread => (
            <div key={String(unread)} className={styles.container}>
              <NotificationCard
                {...BASE_PROPS}
                {...BUTTONS_PROPS}
                actions={ACTIONS}
                appearance={appearance}
                unread={unread}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Slots (appearance=default)'
        firstColumnHeader='Slot'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'with link',
            cells: [
              <div key='1' className={styles.container}>
                <NotificationCard {...BASE_PROPS} label={undefined} />
              </div>,
            ],
          },
          {
            variantLabel: 'with label',
            cells: [
              <div key='1' className={styles.container}>
                <NotificationCard {...BASE_PROPS} />
              </div>,
            ],
          },
          {
            variantLabel: 'with primary + secondary buttons',
            cells: [
              <div key='2' className={styles.container}>
                <NotificationCard {...BASE_PROPS} {...BUTTONS_PROPS} link={undefined} />
              </div>,
            ],
          },
          {
            variantLabel: 'with kebab actions',
            cells: [
              <div key='3' className={styles.container}>
                <NotificationCard {...BASE_PROPS} actions={ACTIONS} link={undefined} />
              </div>,
            ],
          },
          {
            variantLabel: 'clickable + unread',
            cells: [
              <div key='4' className={styles.container}>
                <NotificationCard {...BASE_PROPS} link={undefined} unread onClick={fn()} />
              </div>,
            ],
          },
          {
            variantLabel: 'with all slots',
            cells: [
              <div key='4' className={styles.container}>
                <NotificationCard {...BASE_PROPS} {...BUTTONS_PROPS} actions={ACTIONS} unread onClick={fn()} />
              </div>,
            ],
          },
          {
            variantLabel: 'skeleton',
            cells: [
              <div key='5' className={styles.container}>
                <SkeletonContextProvider loading={true}>
                  <NotificationCardSkeleton />
                </SkeletonContextProvider>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

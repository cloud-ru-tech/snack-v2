import { APPEARANCE, NotificationCard, NotificationCardStack } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof NotificationCardStack> = {
  title: 'Uikit Product/Notification/NotificationCardStack',
  component: NotificationCardStack,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof NotificationCardStack>;

function makeCards(count: number) {
  return Array.from({ length: count }, (_, i) => (
    <NotificationCard
      key={i}
      id={`s${i}`}
      title={`Событие #${i + 1}`}
      description='Краткое описание события'
      date='сегодня · 14:32'
      appearance={APPEARANCE.Default}
    />
  ));
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Unread'
        firstColumnHeader='State'
        columnHeaders={['read', 'unread']}
        rows={[
          {
            variantLabel: 'collapsed (3 cards)',
            cells: [false, true].map(unread => (
              <div key={String(unread)} className={styles.container}>
                <NotificationCardStack title='backup-cluster-1' unread={unread}>
                  {makeCards(3)}
                </NotificationCardStack>
              </div>
            )),
          },
          {
            variantLabel: 'expanded (3 cards)',
            cells: [false, true].map(unread => (
              <div key={String(unread)} className={styles.container}>
                <NotificationCardStack title='backup-cluster-1' unread={unread} defaultOpen>
                  {makeCards(3)}
                </NotificationCardStack>
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Slots'
        firstColumnHeader='Slot'
        columnHeaders={['view']}
        rows={[
          {
            variantLabel: 'with kebab actions',
            cells: [
              <div key='1' className={styles.container}>
                <NotificationCardStack
                  title='backup-cluster-1'
                  actions={[
                    { content: { label: 'Отметить как прочитанное' }, onClick: fn() },
                    { content: { label: 'Удалить всё' }, onClick: fn() },
                  ]}
                >
                  {makeCards(3)}
                </NotificationCardStack>
              </div>,
            ],
          },
          {
            variantLabel: 'single card (no stack)',
            cells: [
              <div key='2' className={styles.container}>
                <NotificationCardStack title='single'>{makeCards(1)}</NotificationCardStack>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

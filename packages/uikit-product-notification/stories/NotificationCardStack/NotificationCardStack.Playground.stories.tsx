import { APPEARANCE, NotificationCard, NotificationCardStack } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const demoContent = 'Демо-контент. Замените этот блок на свой компонент с исходным содержимым уведомления.';

const cards = [
  <NotificationCard
    key='1'
    id='s1'
    appearance={APPEARANCE.Default}
    label='Category · Subcategory'
    title='Заголовок в две строки с обрезкой длинного текста'
    description={demoContent}
    primaryButton={{ label: 'Основное', onClick: fn() }}
    secondaryButton={{ label: 'Второстепенное', onClick: fn() }}
    link={{ label: 'Подробнее об уведомлении', href: '#' }}
    date='18.06.2026 · 14:32'
    unread
  />,
  <NotificationCard
    key='2'
    id='s2'
    appearance={APPEARANCE.Error}
    label='Category · Subcategory'
    title='Заголовок в две строки с обрезкой длинного текста'
    description={demoContent}
    primaryButton={{ label: 'Основное', onClick: fn() }}
    secondaryButton={{ label: 'Второстепенное', onClick: fn() }}
    link={{ label: 'Подробнее об уведомлении', href: '#' }}
    date='17.06.2026 · 19:04'
    unread
  />,
  <NotificationCard
    key='3'
    id='s3'
    appearance={APPEARANCE.Success}
    label='Category · Subcategory'
    title='Заголовок в две строки с обрезкой длинного текста'
    description={demoContent}
    primaryButton={{ label: 'Основное', onClick: fn() }}
    secondaryButton={{ label: 'Второстепенное', onClick: fn() }}
    link={{ label: 'Подробнее об уведомлении', href: '#' }}
    date='17.06.2026 · 17:11'
  />,
];

const meta: Meta<typeof NotificationCardStack> = {
  title: 'Uikit Product/Notification/NotificationCardStack',
  component: NotificationCardStack,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Стопка карточек — первая видна, остальные схлопываются под неё.</DemoHint>
        <DemoActions block>
          <div className={styles.container}>
            <NotificationCardStack {...args}>{cards}</NotificationCardStack>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    title: 'backup-cluster-1',
    defaultOpen: false,
    unread: false,
    onOpenChanged: fn(),
    'data-test-id': TEST_IDS.panel.cardStack.wrapper,
  },
  argTypes: {
    children: { table: { disable: true } },
    onOpenChanged: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
    actions: {
      control: 'select',
      options: ['preset'],
      mapping: {
        preset: [
          { content: { option: 'Прочитать всё' }, onClick: fn() },
          { content: { option: 'Скрыть' }, onClick: fn() },
        ],
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof NotificationCardStack>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.panel.cardStack.title)).toBeVisible();
  },
};

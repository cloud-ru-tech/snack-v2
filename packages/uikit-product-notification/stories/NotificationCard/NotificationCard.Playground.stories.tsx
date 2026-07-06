import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ACTIONS, BASE_PROPS, BUTTONS_PROPS } from '../constants';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof NotificationCard> = {
  title: 'Uikit Product/Notification/NotificationCard',
  component: NotificationCard,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карточка уведомления с заголовком, контентом, датой и опциональными действиями.</DemoHint>
        <DemoActions block>
          <NotificationCard {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    ...BASE_PROPS,
    ...BUTTONS_PROPS,
    actions: ACTIONS,
    onClick: fn(),
    'data-test-id': TEST_IDS.card.root,
  },
  argTypes: {
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
    onVisible: { table: { disable: true } },
    onClick: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
    primaryButton: {
      control: 'select',
      options: ['preset'],
      mapping: { preset: { label: 'Открыть', onClick: fn() } },
    },
    secondaryButton: {
      control: 'select',
      options: ['preset'],
      mapping: { preset: { label: 'Скрыть', onClick: fn() } },
    },
    actions: {
      control: 'select',
      options: ['preset'],
      mapping: {
        preset: [
          { content: { option: 'Прочитано' }, onClick: fn() },
          { content: { option: 'Удалить' }, onClick: fn() },
        ],
      },
    },
    link: {
      control: 'select',
      options: ['preset'],
      mapping: { preset: { text: 'Подробнее', href: '#' } },
    },
  },
};
export default meta;

type Story = StoryObj<typeof NotificationCard>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.card.root)).toBeVisible();
  },
};

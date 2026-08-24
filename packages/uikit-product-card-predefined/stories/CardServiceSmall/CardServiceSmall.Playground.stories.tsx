import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof CardServiceSmall> = {
  title: 'Uikit Product/CardPredefined/CardServiceSmall',
  component: CardServiceSmall,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Название сервиса',
    emblem: { icon: PlaceholderSVG },
    'data-test-id': 'card-service-small',
  },
  argTypes: {
    emblem: { table: { disable: true } },
    as: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Компактная карточка сервиса с эмблемой и заголовком. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardServiceSmall {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CardServiceSmall>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    checked: false,
    outline: false,
    disabled: false,
    onClick: fn(),
    actionsVisibility: VISIBILITY_STRATEGY.hover,
    favorite: {
      enabled: true,
      onChange: fn(),
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-service-small')).toBeVisible();
  },
};

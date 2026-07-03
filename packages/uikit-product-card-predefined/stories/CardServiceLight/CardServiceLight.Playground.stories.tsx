import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof CardServiceLight> = {
  title: 'Uikit Product/CardPredefined/CardServiceLight',
  component: CardServiceLight,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Мой сервис',
    icon: <PlaceholderSVG size={24} />,
    'data-test-id': 'card-service-light',
  },
  argTypes: {
    as: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    'favorite.visibilityStrategy': {
      options: Object.values(VISIBILITY_STRATEGY),
      control: { type: 'select' },
    },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Лёгкая карточка сервиса с иконкой и избранным. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardServiceLight {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CardServiceLight>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClick: fn(),
    favorite: {
      enabled: true,
      visibilityStrategy: VISIBILITY_STRATEGY.hover,
      onChange: fn(),
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-service-light')).toBeVisible();
  },
};

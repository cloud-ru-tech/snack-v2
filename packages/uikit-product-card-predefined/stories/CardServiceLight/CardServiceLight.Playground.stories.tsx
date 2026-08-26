import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

type StoryProps = CardServiceLightProps & {
  showExpandButton?: boolean;
  showTooltip?: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/CardPredefined/CardServiceLight',
  component: CardServiceLight,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Мой сервис',
    icon: <PlaceholderSVG size={24} />,
    'data-test-id': 'card-service-light',
  },
  argTypes: {
    onClick: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    expandable: { table: { disable: true } },
    tooltip: { table: { disable: true } },
    showExpandButton: {
      name: '[Stories]: show expand button',
      control: 'boolean',
    },
    showTooltip: {
      name: '[Stories]: show tooltip',
      control: 'boolean',
    },
  },
  render: ({ showExpandButton, showTooltip, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Лёгкая карточка сервиса с иконкой и избранным. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardServiceLight
              {...args}
              expandable={showExpandButton ? { value: showExpandButton, onClick: fn() } : undefined}
              tooltip={showTooltip ? { tip: 'Дополнительная информация о сервисе' } : undefined}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClick: fn(),
    actionsVisibility: 'hover',
    favorite: {
      enabled: true,
      onChange: fn(),
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-service-light')).toBeVisible();
  },
};

import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo, CardServiceInfoProps } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

type StoryProps = CardServiceInfoProps & {
  showExpandButton?: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/CardPredefined/CardServiceInfo',
  component: CardServiceInfo,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Мой сервис',
    description: 'Краткое описание сервиса для подробного режима карточки.',
    icon: <PlaceholderSVG size={24} />,
    'data-test-id': 'card-service-info',
    promoTag: {
      variant: 'preview',
    },
  },
  argTypes: {
    onClick: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    expandable: { table: { disable: true } },
    showExpandButton: {
      name: '[Stories]: show expand button',
      control: 'boolean',
    },
  },
  render: ({ showExpandButton, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карточка сервиса с описанием. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardServiceInfo {...args} expandable={showExpandButton ? { value: false, onClick: fn() } : undefined} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CardServiceInfo>;

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
    await expect(within(canvasElement).getByTestId('card-service-info')).toBeVisible();
  },
};

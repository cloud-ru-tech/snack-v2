import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const meta: Meta<typeof CardServiceLight> = {
  title: 'Uikit Product/CardPredefined/CardServiceLight/Tests/Interaction',
  component: CardServiceLight,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'Мой сервис',
    icon: <PlaceholderSVG size={24} />,
    favorite: {
      enabled: true,
      visibilityStrategy: VISIBILITY_STRATEGY.always,
    },
    'data-test-id': 'card-service-light',
  },
};

export default meta;
type Story = StoryObj<typeof CardServiceLight>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>ArrowRight/ArrowLeft переключают фокус между карточкой и кнопкой «Избранное».</DemoHint>
        <DemoActions align='center'>
          <CardServiceLight {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId('card-service-light');
    const favourite = canvas.getByTestId('card-service-light__favorite');

    await step('keyboard: ArrowRight на карточке → фокус переходит на Favourite', async () => {
      card.focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(favourite).toHaveFocus();
    });

    await step('keyboard: ArrowLeft на Favourite → фокус возвращается на карточку', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expect(card).toHaveFocus();
    });
  },
};

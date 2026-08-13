import { CardBanner } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import illustrationSrc from './assets/card-banner-illustration.jpg?url';

const meta: Meta<typeof CardBanner> = {
  title: 'Uikit Product/CardPredefined/CardBanner',
  component: CardBanner,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Промо-баннер с заголовком, описанием, CTA и изображением. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardBanner {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    title: 'Заголовок карточки',
    description: 'Краткое описание сервиса или предложения для пользователя',
    actionLabel: 'Подробнее',
    image: {
      src: illustrationSrc,
      alt: 'Иллюстрация сервиса',
    },
    'data-test-id': 'card-banner',
  },
  argTypes: {
    onClose: { table: { disable: true } },
    as: { table: { disable: true } },
    href: { table: { disable: true } },
    target: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof CardBanner>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClose: fn(),
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-banner')).toBeVisible();
  },
};

import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons';
import { CardService } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof CardService> = {
  title: 'Uikit Product/CardPredefined/CardService',
  component: CardService,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Сервис для разработчиков',
    description: 'Платформа для создания и управления облачными ресурсами вашей организации',
    actionLabel: 'Перейти',
    emblem: <IconPredefined size='l' icon={PlaceholderSVG} appearance='primary' />,
    'data-test-id': 'card-service',
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
        <DemoHint>
          Карточка сервиса с эмблемой, заголовком, описанием и CTA-строкой. Тяните за угол — меняется ширина.
        </DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardService {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CardService>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: { onClick: fn() },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-service')).toBeVisible();
  },
};

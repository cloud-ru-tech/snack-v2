import { CARD_SIZE, CardSize, CardSuggest } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof CardSuggest> = {
  title: 'Uikit Product/CardPredefined/CardSuggest',
  component: CardSuggest,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Подсказка для пользователя',
    description: 'Краткое описание действия или функциональности',
    size: CARD_SIZE.M,
    'data-test-id': 'card-suggest',
  },
  argTypes: {
    size: {
      options: Object.values(CARD_SIZE) as CardSize[],
      control: { type: 'radio' },
    },
    as: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карточка-подсказка с размерами m/s. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardSuggest {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CardSuggest>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: { onClick: fn() },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('card-suggest')).toBeVisible();
  },
};

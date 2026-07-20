import { CardSuggest } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CardSuggest> = {
  title: 'Uikit Product/CardPredefined/CardSuggest/Examples/Polymorphic',
  component: CardSuggest,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CardSuggest>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <CardSuggest
      as='a'
      href='https://cloud.ru'
      title='Подсказка-ссылка'
      content='Это якорный элемент'
      data-test-id={TEST_IDS.cardSuggest}
    />
  ),
};

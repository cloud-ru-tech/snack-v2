import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CardServiceLight> = {
  title: 'Uikit Product/CardPredefined/CardServiceLight/Examples/Polymorphic',
  component: CardServiceLight,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CardServiceLight>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <CardServiceLight
      as='a'
      href='https://cloud.ru'
      title='Ссылка-сервис'
      icon={<PlaceholderSVG size={24} />}
      data-test-id={TEST_IDS.cardServiceLight}
    />
  ),
};

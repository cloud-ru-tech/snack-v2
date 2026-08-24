import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CardServiceInfo> = {
  title: 'Uikit Product/CardPredefined/CardServiceInfo/Examples/Polymorphic',
  component: CardServiceInfo,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CardServiceInfo>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <CardServiceInfo
      as='a'
      href='https://cloud.ru'
      title='Ссылка-сервис'
      description='Карточка рендерится как якорь через as и href.'
      icon={<PlaceholderSVG size={24} />}
      data-test-id={TEST_IDS.cardServiceInfo}
    />
  ),
};

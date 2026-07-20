import { CardBanner } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../../testIds';
import illustrationSrc from '../assets/card-banner-illustration.jpg?url';

const meta: Meta<typeof CardBanner> = {
  title: 'Uikit Product/CardPredefined/CardBanner/Examples/Polymorphic',
  component: CardBanner,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CardBanner>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <CardBanner
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Перейти на сайт'
      content='Откроется в новой вкладке'
      actionLabel='Подробнее'
      image={{ src: illustrationSrc, alt: 'Иллюстрация сервиса' }}
      data-test-id={TEST_IDS.cardBanner}
    />
  ),
};

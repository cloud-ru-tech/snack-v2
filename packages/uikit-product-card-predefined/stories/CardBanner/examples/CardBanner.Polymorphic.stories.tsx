import { CardBanner } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../../testIds';
import illustration from '../assets/card-banner-illustration.jpg';

// Astro globals типизируют `*.jpg` как `ImageMetadata`, но в Storybook (vite) импорт
// возвращает строку с URL. Берём `.src` если рантайм пришёл из Astro, иначе сам импорт.
const illustrationSrc: string = typeof illustration === 'string' ? illustration : illustration.src;

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
      href='https://sbercloud.ru'
      target='_blank'
      title='Перейти на сайт'
      description='Откроется в новой вкладке'
      actionLabel='Подробнее'
      image={{ src: illustrationSrc, alt: 'Иллюстрация сервиса' }}
      data-test-id={TEST_IDS.cardBanner}
    />
  ),
};

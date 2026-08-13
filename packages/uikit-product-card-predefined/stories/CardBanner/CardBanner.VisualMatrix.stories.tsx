import { CardBanner } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import illustrationSrc from './assets/card-banner-illustration.jpg?url';

const meta: Meta<typeof CardBanner> = {
  title: 'Uikit Product/CardPredefined/CardBanner',
  component: CardBanner,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardBanner>;

const bannerProps = {
  title: 'Заголовок карточки',
  content: 'Краткое описание сервиса',
  actionLabel: 'Подробнее',
  image: { src: illustrationSrc, alt: 'Иллюстрация сервиса' },
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='CardBanner'
      firstColumnHeader='Вариант'
      cellAlign='start'
      columnHeaders={['CardBanner']}
      rows={[
        {
          variantLabel: 'default',
          cells: [<CardBanner key='default' {...bannerProps} />],
        },
        {
          variantLabel: '+onClose',
          cells: [<CardBanner key='close' {...bannerProps} onClose={fn()} />],
        },
        {
          variantLabel: 'disabled',
          cells: [<CardBanner key='disabled' {...bannerProps} disabled />],
        },
      ]}
    />
  ),
};

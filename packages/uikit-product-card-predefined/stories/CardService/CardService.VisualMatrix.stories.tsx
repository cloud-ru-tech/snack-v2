import { IconPredefined } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardService } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof CardService> = {
  title: 'Uikit Product/CardPredefined/CardService',
  component: CardService,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardService>;

const emblem = <IconPredefined size='l' icon={PlaceholderSVG} appearance='primary' />;
const serviceProps = {
  title: 'Облачный сервис',
  description: 'Платформа для разработчиков с API доступом',
  actionLabel: 'Перейти',
  emblem,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='CardService'
      firstColumnHeader='Вариант'
      columnHeaders={['Default', 'disabled']}
      rows={[
        {
          variantLabel: 'default',
          cells: [
            <CardService key='default' {...serviceProps} />,
            <CardService key='disabled' {...serviceProps} disabled />,
          ],
        },
      ]}
    />
  ),
};

import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardServiceInfo> = {
  title: 'Uikit Product/CardPredefined/CardServiceInfo',
  component: CardServiceInfo,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardServiceInfo>;

const icon = <PlaceholderSVG size={24} />;

const infoProps = {
  title: 'Мой сервис',
  description: 'Краткое описание сервиса для подробного режима карточки.',
  icon,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='CardServiceInfo — favorite'
        firstColumnHeader='state'
        columnHeaders={['enabled=false', 'always', 'hover']}
        rows={[
          {
            variantLabel: 'unchecked',
            cells: [
              <CardServiceInfo key='no-fav' {...infoProps} />,
              <CardServiceInfo
                key='fav-always'
                {...infoProps}
                actionsVisibility='always'
                favorite={{ enabled: true, onChange: fn() }}
              />,
              <CardServiceInfo
                key='fav-hover'
                {...infoProps}
                actionsVisibility='hover'
                favorite={{ enabled: true, onChange: fn() }}
              />,
            ],
          },
          {
            variantLabel: 'checked',
            cells: [
              <CardServiceInfo key='no-fav-checked' {...infoProps} />,
              <CardServiceInfo
                key='fav-always-checked'
                {...infoProps}
                actionsVisibility='always'
                favorite={{ enabled: true, checked: true, onChange: fn() }}
              />,
              <CardServiceInfo
                key='fav-hover-checked'
                {...infoProps}
                actionsVisibility='hover'
                favorite={{ enabled: true, checked: true, onChange: fn() }}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceInfo — promoTag'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with promoTag']}
        rows={[
          {
            variantLabel: 'promoTag',
            cells: [
              <CardServiceInfo key='no-promo' {...infoProps} />,
              <CardServiceInfo key='with-promo' {...infoProps} promoTag={{ variant: 'preview' }} />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceInfo — expandable'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with expandable']}
        rows={[
          {
            variantLabel: 'expandable',
            cells: [
              <CardServiceInfo key='no-expandable' {...infoProps} />,
              <CardServiceInfo key='with-expandable' {...infoProps} expandable={{ value: false, onClick: fn() }} />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceInfo — disabled'
        firstColumnHeader='Вариант'
        columnHeaders={['enabled', 'disabled']}
        rows={[
          {
            variantLabel: 'disabled',
            cells: [
              <CardServiceInfo key='enabled' {...infoProps} />,
              <CardServiceInfo key='disabled' {...infoProps} disabled />,
            ],
          },
        ]}
      />
    </div>
  ),
};

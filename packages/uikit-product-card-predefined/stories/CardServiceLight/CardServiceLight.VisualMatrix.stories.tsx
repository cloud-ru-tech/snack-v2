import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardServiceLight> = {
  title: 'Uikit Product/CardPredefined/CardServiceLight',
  component: CardServiceLight,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardServiceLight>;

const icon = <PlaceholderSVG size={24} />;

const lightProps = {
  title: 'Мой сервис',
  icon,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='CardServiceLight — favorite'
        firstColumnHeader='state'
        columnHeaders={['enabled=false', 'always', 'hover']}
        rows={[
          {
            variantLabel: 'unchecked',
            cells: [
              <CardServiceLight key='no-fav' {...lightProps} />,
              <CardServiceLight
                key='fav-always'
                {...lightProps}
                actionsVisibility='always'
                favorite={{ enabled: true, onChange: fn() }}
              />,
              <CardServiceLight
                key='fav-hover'
                {...lightProps}
                actionsVisibility='hover'
                favorite={{ enabled: true, onChange: fn() }}
              />,
            ],
          },
          {
            variantLabel: 'checked',
            cells: [
              <CardServiceLight key='no-fav-checked' {...lightProps} />,
              <CardServiceLight
                key='fav-always-checked'
                {...lightProps}
                actionsVisibility='always'
                favorite={{
                  enabled: true,
                  checked: true,
                  onChange: fn(),
                }}
              />,
              <CardServiceLight
                key='fav-hover-checked'
                {...lightProps}
                actionsVisibility='hover'
                favorite={{
                  enabled: true,
                  checked: true,
                  onChange: fn(),
                }}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceLight — promoTag'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with promoTag']}
        rows={[
          {
            variantLabel: 'promoTag',
            cells: [
              <CardServiceLight key='no-promo' {...lightProps} />,
              <CardServiceLight key='with-promo' {...lightProps} promoTag={{ variant: 'preview' }} />,
            ],
          },
        ]}
      />
      <StoryTable
        sectionTitle='CardServiceLight — tooltip'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with tooltip']}
        rows={[
          {
            variantLabel: 'tooltip',
            cells: [
              <CardServiceLight key='no-tooltip' {...lightProps} />,
              <CardServiceLight
                key='with-tooltip'
                {...lightProps}
                tooltip={{ tip: 'Дополнительная информация о сервисе' }}
              />,
            ],
          },
        ]}
      />
      <StoryTable
        sectionTitle='CardServiceLight — expandable'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with expandable']}
        rows={[
          {
            variantLabel: 'expandable',
            cells: [
              <CardServiceLight key='no-expandable' {...lightProps} />,
              <CardServiceLight key='with-expandable' {...lightProps} expandable={{ value: false, onClick: fn() }} />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceLight — disabled'
        firstColumnHeader='Вариант'
        columnHeaders={['enabled', 'disabled']}
        rows={[
          {
            variantLabel: 'disabled',
            cells: [
              <CardServiceLight key='enabled' {...lightProps} />,
              <CardServiceLight key='disabled' {...lightProps} disabled />,
            ],
          },
        ]}
      />
    </div>
  ),
};

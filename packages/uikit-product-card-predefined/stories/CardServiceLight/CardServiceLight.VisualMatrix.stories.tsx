import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
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
        sectionTitle='CardServiceLight — состояния'
        firstColumnHeader='Вариант'
        columnHeaders={['Default', 'disabled']}
        rows={[
          {
            variantLabel: 'default',
            cells: [
              <CardServiceLight key='default' {...lightProps} />,
              <CardServiceLight key='disabled' {...lightProps} disabled />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceLight — favourite'
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
                favorite={{ enabled: true, visibilityStrategy: VISIBILITY_STRATEGY.always, onChange: fn() }}
              />,
              <CardServiceLight
                key='fav-hover'
                {...lightProps}
                favorite={{ enabled: true, visibilityStrategy: VISIBILITY_STRATEGY.hover, onChange: fn() }}
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
                favorite={{
                  enabled: true,
                  visibilityStrategy: VISIBILITY_STRATEGY.always,
                  checked: true,
                  onChange: fn(),
                }}
              />,
              <CardServiceLight
                key='fav-hover-checked'
                {...lightProps}
                favorite={{
                  enabled: true,
                  visibilityStrategy: VISIBILITY_STRATEGY.hover,
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
              <CardServiceLight
                key='with-promo'
                {...lightProps}
                promoTag={{
                  label: 'New',
                  appearance: APPEARANCE.Primary,
                  role: ROLE_APPEARANCE.Accent,
                  size: SIZE.Xs,
                }}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};

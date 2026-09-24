import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardNavigation } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardNavigation> = {
  title: 'Uikit Product/CardPredefined/CardNavigation',
  component: CardNavigation,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardNavigation>;

const baseProps = {
  title: 'Мой сервис',
  icon: <PlaceholderSVG size={24} />,
};

const description = 'Краткое описание сервиса для подробного режима карточки.';

const VIEWS = [
  { label: 'compact', description: undefined },
  { label: 'detailed', description },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='CardNavigation — favorite'
        firstColumnHeader='view'
        columnHeaders={['enabled=false', 'always', 'hover']}
        rows={VIEWS.map(view => ({
          variantLabel: view.label,
          cells: [
            <CardNavigation key='no-fav' {...baseProps} description={view.description} />,
            <CardNavigation
              key='fav-always'
              {...baseProps}
              description={view.description}
              actionsVisibility='always'
              favorite={{ enabled: true, checked: true, onChange: fn() }}
            />,
            <CardNavigation
              key='fav-hover'
              {...baseProps}
              description={view.description}
              actionsVisibility='hover'
              favorite={{ enabled: true, onChange: fn() }}
            />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='CardNavigation — promoTag, expandable, tooltip, disabled'
        firstColumnHeader='view'
        columnHeaders={['promoTag', 'expandable', 'tooltip', 'disabled']}
        rows={VIEWS.map(view => ({
          variantLabel: view.label,
          cells: [
            <CardNavigation
              key='promo'
              {...baseProps}
              description={view.description}
              promoTag={{ variant: 'preview' }}
            />,
            <CardNavigation
              key='expandable'
              {...baseProps}
              description={view.description}
              expandable={{ value: false, onClick: fn() }}
            />,
            <CardNavigation
              key='tooltip'
              {...baseProps}
              description={view.description}
              tooltip={{ tip: 'Подсказка (только в компактном виде)' }}
            />,
            <CardNavigation key='disabled' {...baseProps} description={view.description} disabled />,
          ],
        }))}
      />
    </div>
  ),
};

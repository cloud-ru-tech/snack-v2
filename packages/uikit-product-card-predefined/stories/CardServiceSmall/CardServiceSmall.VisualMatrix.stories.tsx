import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardServiceSmall> = {
  title: 'Uikit Product/CardPredefined/CardServiceSmall',
  component: CardServiceSmall,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardServiceSmall>;

const baseProps = {
  title: 'Название сервиса',
  emblem: { icon: PlaceholderSVG },
};

const CELL = {
  card: 'card',
  promo: 'promo',
  truncate: 'truncate',
} as const;

function matrixCell(key: string, node: ReactNode, variant: (typeof CELL)[keyof typeof CELL] = CELL.card) {
  return (
    <div key={key} className={styles.cell} data-variant={variant}>
      {node}
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='CardServiceSmall — состояния'
        firstColumnHeader='Вариант'
        columnHeaders={['Default', 'checked', 'outline', 'disabled']}
        rows={[
          {
            variantLabel: 'states',
            cells: [
              matrixCell('default', <CardServiceSmall {...baseProps} />),
              matrixCell('checked', <CardServiceSmall {...baseProps} checked />),
              matrixCell('outline', <CardServiceSmall {...baseProps} outline />),
              matrixCell('disabled', <CardServiceSmall {...baseProps} disabled />),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceSmall — favorite'
        firstColumnHeader='state'
        columnHeaders={['enabled=false', 'always', 'hover']}
        rows={[
          {
            variantLabel: 'unchecked',
            cells: [
              matrixCell('no-fav', <CardServiceSmall {...baseProps} />),
              matrixCell(
                'fav-always',
                <CardServiceSmall
                  {...baseProps}
                  actionsVisibility={VISIBILITY_STRATEGY.always}
                  favorite={{ enabled: true, onChange: fn() }}
                />,
              ),
              matrixCell(
                'fav-hover',
                <CardServiceSmall
                  {...baseProps}
                  actionsVisibility={VISIBILITY_STRATEGY.hover}
                  favorite={{ enabled: true, onChange: fn() }}
                />,
              ),
            ],
          },
          {
            variantLabel: 'checked',
            cells: [
              matrixCell('no-fav-checked', <CardServiceSmall {...baseProps} />),
              matrixCell(
                'fav-always-checked',
                <CardServiceSmall
                  {...baseProps}
                  actionsVisibility={VISIBILITY_STRATEGY.always}
                  favorite={{ enabled: true, checked: true, onChange: fn() }}
                />,
              ),
              matrixCell(
                'fav-hover-checked',
                <CardServiceSmall
                  {...baseProps}
                  actionsVisibility={VISIBILITY_STRATEGY.hover}
                  favorite={{ enabled: true, checked: true, onChange: fn() }}
                />,
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceSmall — promoBadge'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with promoBadge']}
        rows={[
          {
            variantLabel: 'promoBadge',
            cells: [
              matrixCell('no-promo', <CardServiceSmall {...baseProps} />),
              matrixCell(
                'with-promo',
                <CardServiceSmall
                  {...baseProps}
                  promoBadge={{
                    label: 'Promo Tag',
                    appearance: APPEARANCE.Primary,
                    role: ROLE_APPEARANCE.Accent,
                    size: SIZE.Xs,
                  }}
                />,
                CELL.promo,
              ),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardServiceSmall — truncate'
        firstColumnHeader='Вариант'
        columnHeaders={['default', 'truncate.title=1']}
        rows={[
          {
            variantLabel: 'long title',
            cells: [
              matrixCell(
                'long-default',
                <CardServiceSmall
                  title='Очень длинное название сервиса, которое не помещается в одну строку'
                  emblem={{ icon: PlaceholderSVG }}
                />,
                CELL.truncate,
              ),
              matrixCell(
                'long-truncate',
                <CardServiceSmall
                  title='Очень длинное название сервиса, которое не помещается в одну строку'
                  emblem={{ icon: PlaceholderSVG }}
                  truncate={{ title: 1 }}
                />,
                CELL.truncate,
              ),
            ],
          },
        ]}
      />
    </div>
  ),
};

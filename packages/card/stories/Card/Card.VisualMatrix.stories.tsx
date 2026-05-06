import { Card, RADIUS, VIEW } from '@ds/card';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Card>;

type CardPropsForMatrix = ComponentProps<typeof Card>;

const keyRadii = [RADIUS.S, RADIUS.M, RADIUS.L] as const;
const keyViews = [VIEW.Simple, VIEW.Outline, VIEW.Shadow] as const;

const states: Array<{ key: string; extra: Partial<CardPropsForMatrix> }> = [
  { key: 'default', extra: {} },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'checked', extra: { checked: true, multiSelect: true } },
];

function renderCard(props: CardPropsForMatrix): ReactElement {
  return <Card {...props}>{props.children ?? 'Content'}</Card>;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='View × radius'
        firstColumnHeader='View'
        columnHeaders={keyRadii.map(r => r.toUpperCase())}
        rows={keyViews.map(view => ({
          variantLabel: view,
          cells: keyRadii.map(radius =>
            renderCard({
              view,
              radius,
              children: `${view} · ${radius}`,
            }),
          ),
        }))}
      />

      <StoryTable
        sectionTitle='States (radius=m, view=simple)'
        firstColumnHeader='State'
        columnHeaders={['Card']}
        rows={states.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            renderCard({
              radius: RADIUS.M,
              view: VIEW.Simple,
              ...extra,
              children: key,
            }),
          ],
        }))}
      />
    </div>
  ),
};

import { Card, RADIUS, VIEW } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Card',
  component: Card,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Card>;

type CardPropsForMatrix = ComponentProps<typeof Card>;

const keyRadii = [RADIUS.S, RADIUS.M, RADIUS.L] as const;
const keyViews = [VIEW.Simple, VIEW.Outline, VIEW.Shadow] as const;

const interactionStates: Array<{ key: string; extra: Partial<CardPropsForMatrix> }> = [
  { key: 'default', extra: {} },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'checked', extra: { checked: true, multiSelect: true } },
  { key: 'checked + disabled', extra: { checked: true, multiSelect: true, disabled: true } },
];

function renderCard(props: CardPropsForMatrix): ReactElement {
  return (
    <Card {...props}>
      <div className={styles.matrixCell}>{props.children ?? 'Content'}</div>
    </Card>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {keyRadii.map(radius => (
        <StoryTable
          key={radius}
          sectionTitle={`radius=${radius}`}
          firstColumnHeader='State'
          columnHeaders={keyViews.map(v => v)}
          rows={interactionStates.map(({ key, extra }) => ({
            variantLabel: key,
            cells: keyViews.map(view =>
              renderCard({
                radius,
                view,
                ...extra,
                children: `${view} · ${radius}`,
              }),
            ),
          }))}
        />
      ))}

      {/* backgroundPredefined (acrylic fills) — не отражено в Figma `card`-мастере, но
          часть публичного API. Снимаем отдельной секцией на radius=m / view=simple. */}
      <StoryTable
        sectionTitle='backgroundPredefined (radius=m, view=simple)'
        firstColumnHeader='Fill'
        columnHeaders={['Card']}
        rows={Object.values(BACKGROUND_PREDEFINED_FILL).map(fill => ({
          variantLabel: fill,
          cells: [renderCard({ backgroundPredefined: fill, radius: RADIUS.M, view: VIEW.Simple, children: fill })],
        }))}
      />

      {/* Не-интерактивная карточка (interactive=false): нет state-layer hover/pressed, нет
          фокус-ринга. Отдельная секция, потому что это не Figma-axis, а DS-overlay поверх Card. */}
      <StoryTable
        sectionTitle='interactive=false (presentational)'
        firstColumnHeader='View'
        columnHeaders={['Card']}
        rows={keyViews.map(view => ({
          variantLabel: view,
          cells: [renderCard({ view, radius: RADIUS.M, interactive: false, children: `${view} · non-interactive` })],
        }))}
      />
    </div>
  ),
};

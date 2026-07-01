import { APPEARANCE, ButtonCombo, Item, SIZE, VIEW } from '@ds/button-combo';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './ButtonCombo.VisualMatrix.module.scss';

const items: Item[] = [
  { id: 'create', label: 'Создать', onClick: () => undefined },
  { id: 'duplicate', label: 'Дублировать', onClick: () => undefined },
  { id: 'archive', label: 'Архивировать', onClick: () => undefined },
];

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Critical] as const;
const keyViews = [VIEW.Filled, VIEW.Outline, VIEW.Tonal, VIEW.Simple, VIEW.Elevated, VIEW.Function] as const;
const keyStates = ['default', 'disabled', 'loading'] as const;
const stateViews = [VIEW.Filled, VIEW.Outline, VIEW.Tonal] as const;

const meta: Meta<typeof ButtonCombo> = {
  title: 'Components/ButtonCombo',
  component: ButtonCombo,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ButtonCombo>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='View × Size'
        firstColumnHeader='View'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyViews.map(view => ({
          variantLabel: view,
          cells: keySizes.map(size => (
            <ButtonCombo key={size} view={view} size={size} items={items} defaultValue='create' />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Appearance × View (size M)'
        firstColumnHeader='Appearance'
        columnHeaders={keyViews.map(v => v.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keyViews.map(view => (
            <ButtonCombo key={view} view={view} appearance={appearance} items={items} defaultValue='create' />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='State × View (appearance Primary, size M)'
        firstColumnHeader='State'
        columnHeaders={stateViews.map(v => v.toUpperCase())}
        rows={keyStates.map(state => ({
          variantLabel: state,
          cells: stateViews.map(view => (
            <ButtonCombo
              key={view}
              view={view}
              items={items}
              defaultValue='create'
              disabled={state === 'disabled'}
              loading={state === 'loading'}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='fullWidth (container 320px)'
        firstColumnHeader='fullWidth'
        columnHeaders={['ButtonCombo']}
        rows={[false, true].map(fullWidth => ({
          variantLabel: String(fullWidth),
          cells: [
            <div key={String(fullWidth)} className={styles.narrow}>
              <ButtonCombo fullWidth={fullWidth} items={items} defaultValue='create' />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

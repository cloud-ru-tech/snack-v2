import { APPEARANCE, type Appearance, PROGRESS_BAR_SIZE } from '@ds/progress-bar';
import {
  LoadStatus,
  LoadStatusProps,
  PROGRESS_LIMIT_CONDITION,
  type ProgressLimitList,
} from '@ds/uikit-product-load-status';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const staticBarAppearance = (appearance: Appearance): ProgressLimitList => [
  { appearance, condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100 },
];

const meta: Meta<typeof LoadStatus> = {
  title: 'Uikit Product/LoadStatus',
  component: LoadStatus,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LoadStatus>;

const sizes = [PROGRESS_BAR_SIZE.S, PROGRESS_BAR_SIZE.XS] as const;

const figmaAppearances = [
  APPEARANCE.Primary,
  APPEARANCE.Neutral,
  APPEARANCE.Orange,
  APPEARANCE.Yellow,
  APPEARANCE.Green,
  APPEARANCE.Blue,
  APPEARANCE.Violet,
  APPEARANCE.Pink,
] as const;

const baseProps: LoadStatusProps = {
  label: 'Label',
  value: 'Value',
  hint: 'Hint',
  progress: 60,
  valueType: 'percent',
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Figma: appearance x size (showError=false)'
        firstColumnHeader='appearance'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={figmaAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: sizes.map(size => (
            <div key={size} className={styles.column}>
              <LoadStatus {...baseProps} size={size} appearanceByProgress={staticBarAppearance(appearance)} />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Figma: showError=true (bar red + icon)'
        firstColumnHeader='showError'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'showError=true',
            cells: sizes.map(size => (
              <div key={size} className={styles.column}>
                <LoadStatus {...baseProps} size={size} showError showErrorIcon />
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Composition'
        firstColumnHeader='Scenario'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'bar only',
            cells: [
              <div key='bar' className={styles.column}>
                <LoadStatus progress={40} appearanceByProgress={staticBarAppearance(APPEARANCE.Primary)} />
              </div>,
            ],
          },
          {
            variantLabel: 'appearanceByProgress',
            cells: [
              <div key='thresholds' className={styles.column}>
                <LoadStatus label='Low' progress={40} valueType='percent' />
                <LoadStatus label='Mid' progress={75} valueType='percent' />
                <LoadStatus label='High' progress={95} valueType='percent' />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

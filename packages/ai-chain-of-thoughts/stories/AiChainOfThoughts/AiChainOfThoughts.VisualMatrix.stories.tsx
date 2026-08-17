import { AiChainOfThoughts } from '@ds/ai-chain-of-thoughts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';
import { CHAIN_DURATION, chainContentPreset } from './presets';

const meta: Meta<typeof AiChainOfThoughts> = {
  title: 'AI/AiChainOfThoughts/AiChainOfThoughts',
  component: AiChainOfThoughts,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiChainOfThoughts>;

const progressCases = [
  { label: 'inProgress', inProgress: true },
  { label: 'done', inProgress: false },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='InProgress × Open'
        firstColumnHeader='Progress'
        columnHeaders={['CLOSED', 'OPEN']}
        rows={progressCases.map(({ label, inProgress }) => ({
          variantLabel: label,
          cells: [false, true].map(open => (
            <div key={String(open)} className={styles.cell}>
              <AiChainOfThoughts inProgress={inProgress} duration={CHAIN_DURATION} defaultOpen={open}>
                {chainContentPreset}
              </AiChainOfThoughts>
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Broken'
        firstColumnHeader='State'
        columnHeaders={['BROKEN']}
        rows={[
          {
            variantLabel: 'broken',
            cells: [
              <div key='broken' className={styles.cell}>
                <AiChainOfThoughts broken>{chainContentPreset}</AiChainOfThoughts>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

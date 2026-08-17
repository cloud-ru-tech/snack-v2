import { AiChainOfThoughtsHeadline } from '@ds/ai-chain-of-thoughts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { CHAIN_DURATION } from '../AiChainOfThoughts/presets';
import styles from '../styles.module.scss';

const meta: Meta<typeof AiChainOfThoughtsHeadline> = {
  title: 'AI/AiChainOfThoughts/AiChainOfThoughtsHeadline',
  component: AiChainOfThoughtsHeadline,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiChainOfThoughtsHeadline>;

const progressCases = [
  { label: 'inProgress', inProgress: true },
  { label: 'done', inProgress: false },
] as const;

const noop = () => {};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='InProgress × Chevron'
        firstColumnHeader='Progress'
        columnHeaders={['NO CHEVRON', 'CHEVRON']}
        rows={progressCases.map(({ label, inProgress }) => ({
          variantLabel: label,
          cells: [false, true].map(collapsible => (
            <div key={String(collapsible)} className={styles.cell}>
              <AiChainOfThoughtsHeadline
                inProgress={inProgress}
                duration={CHAIN_DURATION}
                collapsible={collapsible}
                onOpenChange={noop}
              />
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
                <AiChainOfThoughtsHeadline broken />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};

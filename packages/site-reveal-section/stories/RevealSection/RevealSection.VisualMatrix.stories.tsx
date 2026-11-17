import { RevealSection, RevealSectionProps } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { HIDDEN_ROOT_MARGIN } from '../constants';
import { SampleSection } from '../fixtures';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof RevealSection> = {
  title: 'Site/RevealSection/RevealSection',
  component: RevealSection,
  parameters: { layout: 'padded', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof RevealSection>;

const STATES: { label: string; props: RevealSectionProps }[] = [
  { label: 'hidden', props: { rootMargin: HIDDEN_ROOT_MARGIN, threshold: 1 } },
  { label: 'visible', props: { rootMargin: '0px', duration: 0 } },
  { label: 'disabled', props: { disabled: true } },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Состояния секции'
      firstColumnHeader='state'
      columnHeaders={['Содержимое']}
      rows={STATES.map(({ label, props }) => ({
        variantLabel: label,
        cells: [
          <div key={label} className={styles.matrixCell}>
            <RevealSection {...props} data-test-id={`${TEST_IDS.revealSection.root}-${label}`}>
              <SampleSection />
            </RevealSection>
          </div>,
        ],
      }))}
    />
  ),
};

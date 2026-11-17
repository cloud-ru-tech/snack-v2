import { RevealSections, RevealSectionsProps } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { HIDDEN_ROOT_MARGIN } from '../constants';
import { SampleSection } from '../fixtures';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof RevealSections> = {
  title: 'Site/RevealSection/RevealSections',
  component: RevealSections,
  parameters: { layout: 'padded', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof RevealSections>;

const SCENARIOS: { label: string; props: RevealSectionsProps }[] = [
  { label: 'skipFirst=true', props: {} },
  { label: 'skipFirst=false', props: { skipFirst: false } },
  { label: 'shouldSkip: second', props: { skipFirst: false, shouldSkip: (_child, index) => index === 1 } },
  { label: 'disabled', props: { disabled: true } },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Видимость до входа в область просмотра'
      firstColumnHeader='scenario'
      columnHeaders={['Группа секций']}
      rows={SCENARIOS.map(({ label, props }) => ({
        variantLabel: label,
        cells: [
          <div key={label} className={`${styles.matrixCell} ${styles.stack}`}>
            <RevealSections rootMargin={HIDDEN_ROOT_MARGIN} threshold={1} {...props}>
              <div data-test-id={TEST_IDS.revealSections.first}>
                <SampleSection title='Первая секция' />
              </div>
              <div data-test-id={TEST_IDS.revealSections.second}>
                <SampleSection title='Вторая секция' />
              </div>
              <div data-test-id={TEST_IDS.revealSections.third}>
                <SampleSection title='Третья секция' />
              </div>
            </RevealSections>
          </div>,
        ],
      }))}
    />
  ),
};

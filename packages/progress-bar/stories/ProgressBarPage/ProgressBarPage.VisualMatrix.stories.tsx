import { APPEARANCE, ProgressBarPage } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof ProgressBarPage> = {
  title: 'Components/ProgressBar/ProgressBarPage',
  component: ProgressBarPage,
};

export default meta;
type Story = StoryObj<typeof ProgressBarPage>;

const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Appearance'
        firstColumnHeader='Appearance'
        columnHeaders={['Indicator']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [
            <div key={appearance} className={styles.wrapper}>
              <ProgressBarPage
                inProgress
                appearance={appearance}
                animationDuration={0}
                incrementDuration={0}
                minimum={0.6}
              />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

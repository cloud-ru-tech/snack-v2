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

/** nprogress инкрементит прогресс каждые `incrementDuration`, и при нуле полоса за пару кадров
 * упирается в предел, закрывая подложку. Пауза длиннее любого прогона удерживает её на `minimum`,
 * поэтому в кадре видно и заполнение, и трек. */
const INCREMENT_PAUSE_MS = 60_000;

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
                incrementDuration={INCREMENT_PAUSE_MS}
                minimum={0.6}
              />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

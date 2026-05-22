import { Carousel, CONTROLS_VISIBILITY } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

function renderSlides() {
  return [
    <div key='1' className={`${styles.slide} ${styles.slideIndigo}`}>
      Slide 1
    </div>,
    <div key='2' className={`${styles.slide} ${styles.slideSky}`}>
      Slide 2
    </div>,
    <div key='3' className={`${styles.slide} ${styles.slideEmerald}`}>
      Slide 3
    </div>,
  ];
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='controlsVisibility × arrows'
        firstColumnHeader='Visibility'
        columnHeaders={['with arrows']}
        rows={[CONTROLS_VISIBILITY.hover, CONTROLS_VISIBILITY.always].map(v => ({
          variantLabel: v,
          cells: [
            <div key={v} className={styles.container}>
              <Carousel controlsVisibility={v}>{renderSlides()}</Carousel>
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='showItems — 1 / 2 / 3'
        firstColumnHeader='showItems'
        columnHeaders={['Result']}
        rows={[1, 2, 3].map(n => ({
          variantLabel: String(n),
          cells: [
            <div key={n} className={styles.containerWide}>
              <Carousel showItems={n} gap='12px'>
                <div className={styles.card}>A</div>
                <div className={styles.card}>B</div>
                <div className={styles.card}>C</div>
                <div className={styles.card}>D</div>
                <div className={styles.card}>E</div>
              </Carousel>
            </div>,
          ],
        }))}
      />
    </div>
  ),
};

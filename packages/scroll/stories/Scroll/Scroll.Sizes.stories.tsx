import { Scroll, ScrollProps, SIZE } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const longContent = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className={styles.playgroundLine}>
        Line {i + 1}
      </div>
    ))}
  </div>
);

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll',
  component: Scroll,
};

export default meta;
type Story = StoryObj<ScrollProps>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <div className={styles.sizeCell}>
        <Scroll size={SIZE.S} data-test-id='scroll-s'>
          {longContent}
        </Scroll>
      </div>
      <div className={styles.sizeCell}>
        <Scroll size={SIZE.M} data-test-id='scroll-m'>
          {longContent}
        </Scroll>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('scroll-s')).toBeVisible();
    await expect(within(canvasElement).getByTestId('scroll-m')).toBeVisible();
  },
};

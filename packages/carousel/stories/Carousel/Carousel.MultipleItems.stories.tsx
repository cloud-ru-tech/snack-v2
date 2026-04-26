import { Carousel } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const MultipleItems: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.containerWide}>
      <Carousel showItems={3} gap='16px'>
        <div className={styles.card}>Card 1</div>
        <div className={styles.card}>Card 2</div>
        <div className={styles.card}>Card 3</div>
        <div className={styles.card}>Card 4</div>
        <div className={styles.card}>Card 5</div>
        <div className={styles.card}>Card 6</div>
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Card 1')).toBeVisible();
  },
};

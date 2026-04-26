import { BAR_HIDE_STRATEGY, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const content = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 12 }, (_, i) => (
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

const strategies = [BAR_HIDE_STRATEGY.Never, BAR_HIDE_STRATEGY.Leave, BAR_HIDE_STRATEGY.Scroll, BAR_HIDE_STRATEGY.Move];

export const HideStrategies: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      {strategies.map(strategy => (
        <div key={strategy} className={styles.sizeCell}>
          <Scroll barHideStrategy={strategy} data-test-id={`scroll-${strategy}`}>
            {content}
          </Scroll>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(`scroll-${strategies[0]}`)).toBeVisible();
  },
};

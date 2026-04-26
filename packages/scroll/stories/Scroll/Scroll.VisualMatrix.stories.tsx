import { BAR_HIDE_STRATEGY, Scroll, ScrollProps, SIZE } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const cellContent = (
  <div className={styles.cellContent}>
    {Array.from({ length: 8 }, (_, i) => (
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

const sizes = Object.values(SIZE);
const strategies = [BAR_HIDE_STRATEGY.Never, BAR_HIDE_STRATEGY.Leave, BAR_HIDE_STRATEGY.Scroll, BAR_HIDE_STRATEGY.Move];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div className={styles.decoratorPad24}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <StoryTable
      sectionTitle='Size × Bar hide strategy'
      firstColumnHeader='Size'
      columnHeaders={strategies.map(s => s[0].toUpperCase() + s.substring(1))}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: strategies.map(strategy => (
          <div key={strategy} className={styles.matrixCell}>
            <Scroll size={size} barHideStrategy={strategy}>
              {cellContent}
            </Scroll>
          </div>
        )),
      }))}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByText(/Line 1/).length).toBeGreaterThan(0);
  },
};

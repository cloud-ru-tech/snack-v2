import { PLACEMENT, Tooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const placements = [PLACEMENT.Top, PLACEMENT.Right, PLACEMENT.Bottom, PLACEMENT.Left] as const;

export const Placements: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.grid}>
      {placements.map(p => (
        <Tooltip key={p} tip={`Подсказка сверху: ${p}`} placement={p}>
          <button type='button' className={styles.triggerButton}>
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    expect(buttons.length).toBe(placements.length);
  },
};

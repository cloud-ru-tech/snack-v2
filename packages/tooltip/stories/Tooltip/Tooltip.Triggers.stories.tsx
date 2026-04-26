import { Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Triggers: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Tooltip tip='Открывается по hover' trigger={TRIGGER.Hover}>
        <button type='button'>Hover</button>
      </Tooltip>
      <Tooltip tip='Открывается по клику' trigger={TRIGGER.Click}>
        <button type='button'>Click</button>
      </Tooltip>
      <Tooltip tip='Hover и focus-visible' trigger={TRIGGER.HoverAndFocusVisible}>
        <button type='button'>Hover + Focus</button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getAllByRole('button').length).toBe(3);
  },
};

import { Button, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

const VIEWS = [VIEW.Filled, VIEW.Tonal, VIEW.Outline, VIEW.Simple, VIEW.Elevated, VIEW.Function] as const;

export const Views: Story = {
  tags: ['dev', 'no-a11y'],
  render: () => (
    <div className={styles.rowWrap}>
      {VIEWS.map(view => (
        <Button key={view} view={view} label={view} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    expect(buttons).toHaveLength(VIEWS.length);
    for (let i = 0; i < VIEWS.length; i += 1) {
      await expect(buttons[i]).toHaveAttribute('data-view', VIEWS[i]);
    }
  },
};

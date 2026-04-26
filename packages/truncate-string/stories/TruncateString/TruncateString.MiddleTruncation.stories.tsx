import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

export const MiddleTruncation: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <TruncateString variant={VARIANT.Middle} text='very-long-file-name-with-identifier-abc123.zip' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstElementChild).toBeTruthy();
  },
};

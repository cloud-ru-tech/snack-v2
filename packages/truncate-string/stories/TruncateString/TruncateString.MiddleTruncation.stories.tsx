import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { TRUNCATE_STRING_TEST_ID } from './testIds';

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
      <TruncateString
        variant={VARIANT.Middle}
        text='very-long-file-name-with-identifier-abc123.zip'
        data-test-id={TRUNCATE_STRING_TEST_ID}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TRUNCATE_STRING_TEST_ID)).toBeVisible();
  },
};

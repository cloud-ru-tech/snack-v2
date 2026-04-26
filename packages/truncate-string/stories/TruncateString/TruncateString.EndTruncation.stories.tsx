import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const SAMPLE = 'Название длинного файла или заголовка, которое не помещается в строку';

export const EndTruncation: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <TruncateString variant={VARIANT.End} text={SAMPLE} maxLines={1} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(SAMPLE, { exact: false })).toBeVisible();
  },
};
